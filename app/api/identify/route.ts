import db from "@/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = request.headers.get("authorization");
  if (!token) {
    throw new Error("Token is missing");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (typeof payload !== "object") {
    throw new Error("Payload is not an object");
  }
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, payload.userId),
  });
  return NextResponse.json({ user });
}
