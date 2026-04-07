import { RelatedClass, Student } from "@/types";
import { FC } from "react";
import ClassDetails from "./ClassDetails";

export const ClassList: FC<{
  classes: RelatedClass[];
  currentUserId: number;
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
  deleteClass: (classId: number) => void;
}> = ({ classes, currentUserId, addStudent, removeStudent, deleteClass }) => {
  const classItems = classes.map((classRow) => {
    return (
      <ClassDetails
        key={classRow.id}
        classRow={classRow}
        currentUserId={currentUserId}
        addStudent={addStudent}
        removeStudent={removeStudent}
        deleteClass={deleteClass}
      />
    );
  });

  return <div>{classItems}</div>;
};
