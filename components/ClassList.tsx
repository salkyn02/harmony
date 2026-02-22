import { RelatedClass, Student } from "@/types";
import { FC } from "react";
import { JoinClassBtn } from "./JoinClassBtn";
import Link from "next/link";

export const ClassList: FC<{
  classes: RelatedClass[];
  userId: number;
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
}> = ({ classes, userId, addStudent, removeStudent }) => {
  const classItems = classes.map((classRow) => {
    const studentsItems = classRow.students.map((student) => {
      return <li key={student.id}>{student.user.name}</li>;
    });
    return (
      <div key={classRow.id}>
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
  });

  return <div>{classItems}</div>;
};
