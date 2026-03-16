import db from "@/db";
import { eq, and } from "drizzle-orm";
import { classesTable, studentsTable } from "@/schema";
import { NextResponse } from "next/server";
import authenticate from "@/utils/authenticate";

export async function POST(request: Request) {
  const user = await authenticate();
  const body = await request.json();
  const classCondition = eq(classesTable.id, body.classId);
  const classRow = await db.query.classesTable.findFirst({
    where: classCondition,
  });
  if (!classRow) {
    return NextResponse.json({ message: "Class not found" }, { status: 500 });
  }
  if (classRow.teacherUserId === user.id) {
    return NextResponse.json(
      { message: "You are the teacher" },
      { status: 500 },
    );
  }
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
