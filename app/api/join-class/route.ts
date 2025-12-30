import { guardUser } from "@/guardUser";
import db from "@/db";
import { eq, and } from "drizzle-orm";
import { studentsTable } from "@/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await guardUser();
  const body = await request.json();

  const existingStudent = await db.query.studentsTable.findFirst({
    where: and(
      eq(studentsTable.userId, user.id),
      eq(studentsTable.classId, body.classId)
    ),
  });
  if (existingStudent) {
    throw new Error("Student already exist");
  }
  await db
    .insert(studentsTable)
    .values({ userId: user.id, classId: body.classId });
  return NextResponse.json({ ok: true });
}
