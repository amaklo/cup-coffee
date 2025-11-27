import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recentNews = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        views: true,
        createdAt: true,
      },
    });

    return NextResponse.json(recentNews);
  } catch (err) {
    console.error("Recent news error:", err);
    return NextResponse.json({ error: "Failed to fetch recent news" }, { status: 500 });
  }
}
