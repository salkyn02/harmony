import Link from "next/link";
import { JoinClassBtn } from "./JoinClassBtn";
import { RelatedClass, Student } from "@/types";

interface ClassDetailsProps {
  classRow: RelatedClass;
  userId: number;
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
}

export default function ClassDetails({
  classRow,
  userId,
  addStudent,
  removeStudent,
}: ClassDetailsProps) {
  const studentsItems = classRow.students.map((student) => {
    return <li key={student.id}>{student.user.name}</li>;
  });
  return (
    <div>
      <h3>
        Teacher:{" "}
        <Link href={`/class/${classRow.id}`}>{classRow.teacher.name}</Link>{" "}
        <JoinClassBtn
          classId={classRow.id}
          students={classRow.students}
          userId={userId}
          addStudent={addStudent}
          removeStudent={removeStudent}
        />
      </h3>
      <ol>{studentsItems}</ol>
    </div>
  );
}
