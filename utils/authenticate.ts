import db from "@/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function authenticate() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (!token) {
    throw new Error("Token missing");
  }
  const payload = verify(token.value, process.env.JWT_SECRET);
  if (typeof payload !== "object") {
    throw new Error("Payload is not an object");
  }
  
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, payload.userId),
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
