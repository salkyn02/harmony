import { ClassPageContent } from "@/components/ClassPageContent";
import db from "@/db";
import { classesTable, messagesTable } from "@/schema";
import authenticateRedirect from "@/utils/authenticateRedirect";
import isClassMember from "@/utils/isClassMember";
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
  const isMember = isClassMember(user, classRow);
  console.log("Is Member", isMember);
  if (!isMember) {
    return <div>You are not in this class</div>;
  }

  const messageCondition = eq(messagesTable.classId, classRow.id);
  const messages = await db.query.messagesTable.findMany({
    where: messageCondition,
    with: {
      user: true,
    },
  });
  return (
    <ClassPageContent
      relatedClass={classRow}
      user={user}
      messageRows={messages}
    />
  );
}
