import db from "@/db";
import { eq } from "drizzle-orm";
import { classesTable } from "@/schema";
import { NextResponse } from "next/server";
import authenticate from "@/utils/authenticate";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ classId: string }> },
) {
  const user = await authenticate();

  const params = await context.params;
  const classId = Number(params.classId);

  const result = await db.query.classesTable.findFirst({
    where: eq(classesTable.id, classId),
  });
  if (!result) {
    return NextResponse.json(
      { ok: false, message: "Class not found" },
      { status: 404 },
    );
  }

  if (result.teacherUserId !== user.id) {
    return NextResponse.json(
      { ok: false, message: "Unathorized" },
      { status: 403 },
    );
  }

  await db.delete(classesTable).where(eq(classesTable.id, classId));

  return NextResponse.json({ ok: true });
}
