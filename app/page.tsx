import db from "@/db";
import { Profile } from "../components/Profile";
import { HomeController } from "@/components/HomeController";
import authenticateRedirect from "@/utils/authenticateRedirect";

export default async function HomePage() {
  console.log('Load home page')
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
  console.log('Download all classes')
  return (
    <div>
      <Profile user={user} />

      <HomeController user={user} userId={user.id} classes={relatedClasses} />
    </div>
  );
}
