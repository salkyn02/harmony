import db from "@/db";
import { eq } from "drizzle-orm";
import { audiosTable, classesTable } from "@/schema";
import { NextResponse } from "next/server";
import authenticate from "@/utils/authenticate";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ audioId: string }> },
) {
  const user = await authenticate();

  const params = await context.params;
  const audioId = Number(params.audioId);
  const audioCondition = eq(audiosTable.id, audioId);
  const result = await db.query.audiosTable.findFirst({
    where: audioCondition,
  });
  if (!result) {
    return NextResponse.json(
      { ok: false, message: "Audio not found" },
      { status: 404 },
    );
  }

  if (result.userId !== user.id) {
    return NextResponse.json(
      { ok: false, message: "Unathorized" },
      { status: 403 },
    );
  }

  await db.delete(audiosTable).where(audioCondition);

  return NextResponse.json({ ok: true });
}
