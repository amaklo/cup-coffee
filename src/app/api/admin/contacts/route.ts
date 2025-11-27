import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// For admin: GET all messages
export async function GET() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(messages);
}

// For frontend: POST new contact message
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  const newMsg = await prisma.contactMessage.create({ data: { name, email, message } });
  return NextResponse.json(newMsg);
}
