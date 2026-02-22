import db from "@/db";
import { Profile } from "../components/Profile";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { ClassController } from "@/components/ClassController";

export default async function HomePage() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (!token) {
    return (
      <div>
        <Link href={"/login"}>
          <button>Login</button>
        </Link>
        <Link href={"/register"}>
          <button>Register</button>
        </Link>
      </div>
    );
  }
  const payload = jwt.verify(token.value, process.env.JWT_SECRET);
  if (typeof payload !== "object") {
    throw new Error("Payload is not an object");
  }
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, payload.userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const relatedClasses = await db.query.classesTable.findMany({
    with: {
      teacher: true,
      students: {
        with: {
          user: true,
        },
      },
    },
  });

  return (
    <div>
      <Profile user={user} />

      <ClassController user={user} userId={user.id} classes={relatedClasses} />
    </div>
  );
}
