import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//-----------------------
// PUT update news
//-----------------------
export async function PUT(req: NextRequest) {
  const idStr = req.nextUrl.pathname.split("/").pop();

  if (!idStr) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const newsId = Number(idStr);
  if (isNaN(newsId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const updatedNews = await prisma.news.update({
    where: { id: newsId },
    data: { title, slug, content},
  });

  return NextResponse.json(updatedNews);
}
//-----------------------
// GET single news
//-----------------------
export async function GET(req: NextRequest) {
  const idStr = req.nextUrl.pathname.split("/").pop();

  if (!idStr) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const newsId = Number(idStr);
  if (isNaN(newsId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const newsItem = await prisma.news.findUnique({
    where: { id: newsId },
  });

  if (!newsItem) return NextResponse.json({ error: "News not found" }, { status: 404 });

  return NextResponse.json(newsItem);
}