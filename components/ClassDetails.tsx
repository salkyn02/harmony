import { JoinClassBtn } from "./JoinClassBtn";
import { RelatedClass, Student } from "@/types";
import { DeleteClassBtn } from "./DeleteClassBtn";
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

  // const studentsItems = classRow.students.map((student) => {
  //   return <Badge key={student.id}>{student.user.name}</Badge>;
  // });

  const studentsCount = classRow.students.length;

  const isStudentInClass = classRow.students.some((student) => {
    return student.userId === currentUserId;
  });

  const isTeacher = classRow.teacherUserId === currentUserId;

  const canOpenClass = isStudentInClass || isTeacher;

  return (
    <Item variant="outline" className="flex items-start justify-between gap-4">
      <ItemContent className="flex flex-col items-start gap-2">
        <ItemTitle className="w-full">
          {canOpenClass ? (
            <CustomLink
              href={`/class/${classRow.id}`}
              className="block text-left px-0 h-auto"
            >
              Teacher: {classRow.teacher.name}
            </CustomLink>
          ) : (
            <span className="block text-left">
              Teacher: {classRow.teacher.name}
            </span>
          )}
        </ItemTitle>
        <ItemDescription className="w-full flex flex-wrap gap-2">
          {/* <span className="text-muted-foreground">Students:</span>
          {studentsItems} */}
          Students: <Badge>{studentsCount}</Badge>
        </ItemDescription>
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
