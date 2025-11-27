import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

//-----------------------
// Helper
//-----------------------
async function saveFiles(files: File[] | undefined): Promise<string[]> {
  if (!files) return [];

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const urls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);
    urls.push(`/uploads/${fileName}`);
  }

  return urls;
}

//-----------------------
// GET all news
//-----------------------
export async function GET() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(news);
}

//-----------------------
// POST create news
//-----------------------
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const imagesRaw = formData.getAll("images") as File[];
  const imageUrls = await saveFiles(imagesRaw);
  // serialize images array to store in DB
  const imageUrlsSerialized = JSON.stringify(imageUrls);

  const newNews = await prisma.news.create({
    data: { title, slug, content, images: imageUrlsSerialized },
  });

  return NextResponse.json(newNews);
}
