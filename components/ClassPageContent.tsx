"use client";

import { RelatedClass, RelatedStudent, Student, User } from "@/types";
import { FC, useState } from "react";
import ClassDetails from "./ClassDetails";

export const ClassPageContent: FC<{
  relatedClass: RelatedClass;
  user: User;
}> = ({ relatedClass, user }) => {
  const [classRow, setClassRow] = useState(relatedClass);

  function addStudent(classId: number, student: Student) {
    const newStudent: RelatedStudent = {
      ...student,
      user,
    };

    const newStudents = [...relatedClass.students, newStudent];
    const newRelatedClass = {
      ...relatedClass,
      students: newStudents,
    };

    setClassRow(newRelatedClass);
  }

  function removeStudent(classId: number, studentId: number) {
    const newStudents = relatedClass.students.filter((student) => {
      return student.id !== studentId;
    });

    const newRelatedClass = {
      ...relatedClass,
      students: newStudents,
    };

    setClassRow(newRelatedClass);
  }

  return (
    <ClassDetails
      classRow={classRow}
      userId={user.id}
      addStudent={addStudent}
      removeStudent={removeStudent}
    />
  );
};
