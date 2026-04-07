import db from "@/db";
import { eq } from "drizzle-orm";
import { messagesTable } from "@/schema";
import { NextResponse } from "next/server";
import authenticate from "@/utils/authenticate";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ messageId: string }> },
) {
  const user = await authenticate();

  const params = await context.params;
  const messageId = Number(params.messageId);
  const messageCondition = eq(messagesTable.id, messageId);
  const result = await db.query.messagesTable.findFirst({
    where: messageCondition,
  });
  if (!result) {
    return NextResponse.json(
      { ok: false, message: "Message not found" },
      { status: 404 },
    );
  }

  if (result.userId !== user.id) {
    return NextResponse.json(
      { ok: false, message: "Unathorized" },
      { status: 403 },
    );
  }

  await db.delete(messagesTable).where(messageCondition);

  return NextResponse.json({ ok: true });
}
