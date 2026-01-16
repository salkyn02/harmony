import db from "@/db";
import { classesTable } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { guardUser } from "@/guardUser";

export async function POST(request: Request) {
  const user = await guardUser();

  const existingClass = await db.query.classesTable.findFirst({
    where: eq(classesTable.teacherUserId, user.id),
  });
  if (existingClass) {
    return NextResponse.json(
      { message: "Class already exist" },
      { status: 500 }
    );
  }
  await db.insert(classesTable).values({ teacherUserId: user.id });

  return NextResponse.json({ ok: true });
}
