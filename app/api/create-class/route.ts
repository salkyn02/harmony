import db from "@/db";
import { classesTable } from "@/schema";
import { RelatedClass } from "@/types";
import authenticate from "@/utils/authenticate";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await authenticate();

  const existingClass = await db.query.classesTable.findFirst({
    where: eq(classesTable.teacherUserId, user.id),
  });
  if (existingClass) {
    return NextResponse.json(
      { message: "Class already exist" },
      { status: 500 },
    );
  }
  const [classRow] = await db
    .insert(classesTable)
    .values({ teacherUserId: user.id })
    .returning();
  const relatedClass: RelatedClass = {
    ...classRow,
    teacher: user,
    students: [],
  };

  return NextResponse.json({ ok: true, class: relatedClass });
}
