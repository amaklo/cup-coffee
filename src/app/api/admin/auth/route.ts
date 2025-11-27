import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { log } from "node:console";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "super-secret", {
      expiresIn: "1d",
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({
        success: true,
        user: { id: user.id , email: user.email, role: "admin" },
    });

  } catch (err) {
    log("Error in admin auth route:", err);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}

