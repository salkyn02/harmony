import Link from "next/link";
import { JoinClassBtn } from "./JoinClassBtn";
import { RelatedClass, Student } from "@/types";
import { DeleteClassBtn } from "./DeleteClassBtn";

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
    return <li key={student.id}>{student.user.name}</li>;
  });

  const isStudentInClass = classRow.students.some((student) => {
    return student.userId === currentUserId;
  });

  const isTeacher = classRow.teacherUserId === currentUserId;

  const canOpenClass = isStudentInClass || isTeacher;

  return (
    <div>
      <h3>  
        Teacher:{" "}
        {canOpenClass ? (
          <Link href={`/class/${classRow.id}`}>{classRow.teacher.name}</Link>
        ) : (
          classRow.teacher.name
        )}
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
      </h3>
      <ol>{studentsItems}</ol>
    </div>
  );
}
