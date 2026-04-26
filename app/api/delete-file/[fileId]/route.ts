import db from "@/db";
import { eq } from "drizzle-orm";
import { filesTable } from "@/schema";
import { NextResponse } from "next/server";
import authenticate from "@/utils/authenticate";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ fileId: string }> },
) {
  const user = await authenticate();

  const params = await context.params;
  const fileId = Number(params.fileId);
  const fileCondition = eq(filesTable.id, fileId);
  const result = await db.query.filesTable.findFirst({
    where: fileCondition,
  });
  if (!result) {
    return NextResponse.json(
      { ok: false, message: "File not found" },
      { status: 404 },
    );
  }

  if (result.userId !== user.id) {
    return NextResponse.json(
      { ok: false, message: "Unathorized" },
      { status: 403 },
    );
  }

  await db.delete(filesTable).where(fileCondition);

  return NextResponse.json({ ok: true });
}
