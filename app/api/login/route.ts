import { NextResponse } from "next/server";
import db from "@/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.name, body.name),
  });
  if (!existingUser) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const isPasswordValid = bcrypt.compareSync(
    body.password,
    existingUser.password
  );
  if (!isPasswordValid) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const payload = { userId: existingUser.id };
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  const cookiesStore = await cookies();
  cookiesStore.set("token", token);

  return NextResponse.json({ ok: true });
}
