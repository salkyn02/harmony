import Link from "next/link";
import { JoinClassBtn } from "./JoinClassBtn";
import { RelatedClass, Student } from "@/types";
import { DeleteClassBtn } from "./DeleteClassBtn";
import { buttonVariants } from "./ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { Badge } from "./ui/badge";
import { CustomLink } from "./CustomLink";

interface ClassDetailsProps {
  classRow: RelatedClass;
  currentUserId: number;
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
  deleteClass: (classId: number) => void;
}

export default function ClassDetails({
  classRow,
  currentUserId,
  addStudent,
  removeStudent,
  deleteClass,
}: ClassDetailsProps) {
  const studentsItems = classRow.students.map((student) => {
    return <Badge key={student.id}>{student.user.name}</Badge>;
  });

  const isStudentInClass = classRow.students.some((student) => {
    return student.userId === currentUserId;
  });

  const isTeacher = classRow.teacherUserId === currentUserId;

  const canOpenClass = isStudentInClass || isTeacher;

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>
          {canOpenClass ? (
            <CustomLink href={`/class/${classRow.id}`}>
              Teacher: {classRow.teacher.name}
            </CustomLink>
          ) : (
            <>Teacher: {classRow.teacher.name}</>
          )}
        </ItemTitle>
        <ItemDescription>Students: {studentsItems}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <JoinClassBtn
          classId={classRow.id}
          students={classRow.students}
          userId={currentUserId}
          addStudent={addStudent}
          removeStudent={removeStudent}
          teacherUserId={classRow.teacherUserId}
        />{" "}
        <DeleteClassBtn
          classId={classRow.id}
          teacherUserId={classRow.teacherUserId}
          currentUserId={currentUserId}
          deleteClass={deleteClass}
        />
      </ItemActions>
    </Item>
  );
}
