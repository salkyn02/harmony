import { ClassPageContent } from "@/components/ClassPageContent";
import db from "@/db";
import { classesTable } from "@/schema";
import authenticateRedirect from "@/utils/authenticateRedirect";
import { eq } from "drizzle-orm";

interface ClassPageProps {
  params: Promise<{ classId: string }>;
}

export default async function ClassPage({ params }: ClassPageProps) {
  const user = await authenticateRedirect();
  const awaited = await params;
  const classIdNumber = Number(awaited.classId);
  const classCondition = eq(classesTable.id, classIdNumber);
  const classRow = await db.query.classesTable.findFirst({
    where: classCondition,
    with: {
      teacher: true,
      students: {
        with: {
          user: true,
        },
      },
    },
  });
  if (!classRow) {
    return <div>Class not found</div>;
  }
  console.log(classRow);
  return <ClassPageContent relatedClass={classRow} user={user} />;
}
