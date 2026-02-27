import { RelatedClass, Student } from "@/types";
import { FC } from "react";
import ClassDetails from "./ClassDetails";

export const ClassList: FC<{
  classes: RelatedClass[];
  userId: number;
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
}> = ({ classes, userId, addStudent, removeStudent }) => {
  const classItems = classes.map((classRow) => {
    return (
      <ClassDetails
        key={classRow.id}
        classRow={classRow}
        userId={userId}
        addStudent={addStudent}
        removeStudent={removeStudent}
      />
    );
  });

  return <div>{classItems}</div>;
};
