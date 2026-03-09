import db from "@/db";
import { classesTable, messagesTable } from "@/schema";
import { RelatedMessage } from "@/types";
import authenticate from "@/utils/authenticate";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await authenticate();
  const body = await request.json();
  const classId = Number(body.classId);
  const existingClass = await db.query.classesTable.findFirst({
    where: eq(classesTable.id, classId),
    with: {
      students: true,
    },
  });
  if (!existingClass) {
    return NextResponse.json({ message: "Class not found" }, { status: 404 });
  }
  const isTeacher = user.id === existingClass.teacherUserId;
  const isStudent = existingClass.students.some((student) => {
    return student.userId === student.id;
  });
  if (!isTeacher && !isStudent) {
    return NextResponse.json(
      { message: "You are not in this class" },
      { status: 400 },
    );
  }
  const [message] = await db
    .insert(messagesTable)
    .values({
      classId: classId,
      userId: user.id,
      content: body.content,
    })
    .returning();
  const relatedMessage: RelatedMessage = {
    ...message,
    user,
  };
  return NextResponse.json({ ok: true, message: relatedMessage });
}
