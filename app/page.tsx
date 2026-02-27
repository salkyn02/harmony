import db from "@/db";
import { Profile } from "../components/Profile";
import { ClassController } from "@/components/ClassController";
import authenticateRedirect from "@/utils/authenticateRedirect";

export default async function HomePage() {
  const user = await authenticateRedirect();

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
