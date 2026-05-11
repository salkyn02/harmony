import db from "@/db";
import { classesTable } from "@/schema";
import { RelatedClass } from "@/types";
import authenticate from "@/utils/authenticate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await authenticate();

  const body = await request.json();

  const [classRow] = await db
    .insert(classesTable)
    .values({ teacherUserId: user.id, title: body.title })
    .returning();
  const relatedClass: RelatedClass = {
    ...classRow,
    teacher: user,
    students: [],
  };

  return NextResponse.json({ ok: true, class: relatedClass });
}
