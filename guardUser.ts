import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import db from "./db";
import { usersTable } from "./schema";
import jwt from "jsonwebtoken";

export async function guardUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (!token) {
    throw new Error("Missing token");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET");
  }

  const payload = jwt.verify(token.value, process.env.JWT_SECRET);
  if (typeof payload !== "object") {
    throw new Error("Payload is not an object");
  }
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, payload.userId),
  });
  if (!user) {
    throw new Error("Missing user");
  }
  return user;
}
