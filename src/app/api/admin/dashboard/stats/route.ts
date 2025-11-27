import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalNews, totalContacts, newsList] = await Promise.all([
      prisma.news.count(),
      prisma.contactMessage.count(),
      prisma.news.findMany({ select: { views: true } }),
    ]);

    const totalViews = newsList.reduce((acc: number, n: { views: number }) => {
      return acc + n.views;
    }, 0);

    return NextResponse.json({
      totalNews,
      totalContacts,
      totalViews,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
