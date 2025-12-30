import db from "@/db";
import { Profile } from "../components/Profile";
import CreateClassBtn from "@/components/CreateClassBtn";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { LogOutBtn } from "@/components/LogOutBtn";
import { JoinClassBtn } from "@/components/JoinClassBtn";

export default async function HomePage() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (!token) {
    return <h2>Please login</h2>;
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
  const classes = await db.query.classesTable.findMany({
    with: {
      teacher: true,
      students: {
        with: {
          user: true,
        },
      },
    },
  });
  console.log(classes);
  const classItems = classes.map((classRow) => {
    const studentsItems = classRow.students.map((student) => {
      return <li key={student.id}>{student.user.name}</li>;
    });
    return (
      <div key={classRow.id}>
        <h3>
          Teacher: {classRow.teacher.name}{" "}
          <JoinClassBtn classId={classRow.id} />
        </h3>
        <ol>{studentsItems}</ol>
      </div>
    );
  });

  return (
    <div>
      <Profile user={user} />
      <LogOutBtn />
      <CreateClassBtn />
      Class count: {classes.length}
      {classItems}
    </div>
  );
}
