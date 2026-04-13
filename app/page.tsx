import db from "@/db";
import { HomeController } from "@/components/HomeController";
import authenticateRedirect from "@/utils/authenticateRedirect";
import { Navbar } from "@/components/Navbar";

export default async function HomePage() {
  const currentUser = await authenticateRedirect();

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
      <Navbar user={currentUser} />

      <HomeController
        user={currentUser}
        currentUserId={currentUser.id}
        classes={relatedClasses}
      />
    </div>
  );
}
