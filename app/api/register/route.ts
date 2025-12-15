import { NextResponse } from "next/server";
import db from "@/db";
import bcrypt from "bcryptjs";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export async function POST (request: Request){
  const body = await request.json()
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.name, body.name)
  })
  if (existingUser){
    return NextResponse.json({ok: false}, {status: 400})
  }
  console.log(body)
  const password = bcrypt.hashSync(body.password, 10)
  await db.insert(usersTable).values({password, name: body.name})
  return NextResponse.json({ok: true})
}

