import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Define the reaction types
type ReactionType = "LIKE" | "DISLIKE" | "VIEW";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string; }> }
) {
  const { id } = await context.params;
  const newsId = Number(id);

  if (isNaN(newsId)) {
    return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
  }

  const body = await req.json();
  const { type: rawType } = body;
  const type = rawType as ReactionType;

  if (!["LIKE", "DISLIKE", "VIEW"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid reaction type" },
      { status: 400 }
    );
  }

  // Get IP of the client
  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  try {
    // --- 1. Separate VIEW Handling (Fire-and-Forget) ---
    if (type === "VIEW") {
      const existingView = await prisma.reaction.findFirst({
        where: {
          newsId,
          type: "VIEW",
          ipAddress,
        },
      });

      if (!existingView) {
        // Use a transaction for atomic create and counter increment
        await prisma.$transaction([
          prisma.reaction.create({
            data: {
              newsId,
              type: "VIEW",
              ipAddress,
            },
          }),
          prisma.news.update({
            where: { id: newsId },
            data: { views: { increment: 1 } },
          }),
        ]);
        return NextResponse.json({ success: true, message: "View recorded." });
      }
      // If already viewed, return success (200 OK) without re-incrementing
      return NextResponse.json({ success: true, message: "Already viewed." });
    }

    // --- 2. LIKE/DISLIKE Handling (Atomic Transaction) ---

    // Fetch the *current* reaction (if any) by this IP, excluding VIEWs
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        newsId,
        ipAddress,
        type: { in: ["LIKE", "DISLIKE"] },
      },
    });

    if (existingReaction && existingReaction.type === type) {
      // SCENARIO A: User is clicking the same button (Toggle OFF)
      // Delete the existing reaction and decrement the counter
      await prisma.$transaction([
        prisma.reaction.delete({ where: { id: existingReaction.id } }),
        prisma.news.update({
          where: { id: newsId },
          data: {
            // Decrement the counter matching the existing reaction type
            [existingReaction.type.toLowerCase() + "s"]: { decrement: 1 },
          },
        }),
      ]);
      return NextResponse.json({
        success: true,
        message: `${type} removed.`,
      });
    }

    if (existingReaction && existingReaction.type !== type) {
      // SCENARIO B: User is changing from LIKE to DISLIKE or vice-versa (Toggle SWAP)
      // 1. Delete the existing reaction (e.g., LIKE)
      // 2. Decrement the old counter (e.g., likes -1)
      // 3. Create the new reaction (e.g., DISLIKE)
      // 4. Increment the new counter (e.g., dislikes +1)
      await prisma.$transaction([
        // 1. Delete old reaction
        prisma.reaction.delete({ where: { id: existingReaction.id } }),
        // 2. Decrement old counter
        prisma.news.update({
          where: { id: newsId },
          data: {
            [existingReaction.type.toLowerCase() + "s"]: { decrement: 1 },
          },
        }),
        // 3. Create new reaction
        prisma.reaction.create({
          data: { newsId, type, ipAddress },
        }),
        // 4. Increment new counter
        prisma.news.update({
          where: { id: newsId },
          data: {
            [type.toLowerCase() + "s"]: { increment: 1 },
          },
        }),
      ]);
      return NextResponse.json({
        success: true,
        message: `Swapped to ${type}.`,
      });
    }

    // SCENARIO C: No existing reaction (First time reaction)
    // Create the new reaction and increment the counter
    await prisma.$transaction([
      prisma.reaction.create({
        data: { newsId, type, ipAddress },
      }),
      prisma.news.update({
        where: { id: newsId },
        data: {
          [type.toLowerCase() + "s"]: { increment: 1 },
        },
      }),
    ]);
    return NextResponse.json({ success: true, message: `${type} recorded.` });
  } catch (err) {
    console.error("Reaction Error:", err);
    return NextResponse.json(
      { error: "Failed to save reaction" },
      { status: 500 }
    );
  }
}
