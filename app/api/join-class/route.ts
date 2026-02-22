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
      eq(studentsTable.classId, body.classId),
    ),
  });
  if (existingStudent) {
    return NextResponse.json(
      { message: "You have already joined this class" },
      { status: 500 },
    );
  }
  const [student] = await db
    .insert(studentsTable)
    .values({ userId: user.id, classId: body.classId })
    .returning();

  return NextResponse.json({ ok: true, student });
}
