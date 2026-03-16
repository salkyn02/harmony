import db from "@/db";
import { classesTable, messagesTable } from "@/schema";
import { RelatedMessage } from "@/types";
import authenticate from "@/utils/authenticate";
import isClassMember from "@/utils/isClassMember";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await authenticate();

  const body = await request.json();
  const classId = Number(body.classId);
  const existingClass = await db.query.classesTable.findFirst({
    where: eq(classesTable.id, classId),
    with: {
      students: {
        with: {
          user: true,
        },
      },
      teacher: true,
    },
  });
  if (!existingClass) {
    return NextResponse.json({ message: "Class not found" }, { status: 404 });
  }

  const isMember = isClassMember(user, existingClass);

  if (!isMember) {
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
