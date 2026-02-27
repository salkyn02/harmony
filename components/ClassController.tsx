"use client";

import { RelatedClass, RelatedStudent, Student, User } from "@/types";
import { FC, useState } from "react";
import { ClassList } from "./ClassList";
import { CreateClassBtn } from "./CreateClassBtn";

export const ClassController: FC<{
  classes: RelatedClass[];
  userId: number;
  user: User;
}> = ({ classes, userId, user }) => {
  const [relatedClasses, setRelatedClasses] = useState(classes);

  function addStudent(classId: number, student: Student) {
    const newStudent: RelatedStudent = {
      ...student,
      user,
    };

    const newClasses: RelatedClass[] = relatedClasses.map((relatedClass) => {
      if (relatedClass.id !== classId) {
        return relatedClass;
      }
      const newStudents = [...relatedClass.students, newStudent];
      const newRelatedClass = {
        ...relatedClass,
        students: newStudents,
      };
      return newRelatedClass;
    });
    setRelatedClasses(newClasses);
  }

  function removeStudent(classId: number, studentId: number) {
    const newClasses = relatedClasses.map((relatedClass) => {
      if (relatedClass.id !== classId) {
        return relatedClass;
      }
      const newStudents = relatedClass.students.filter((student) => {
        return student.id !== studentId;
      });
      
      const newRelatedClass = {
        ...relatedClass,
        students: newStudents,
      };
      return newRelatedClass;
    });
    setRelatedClasses(newClasses);
  }

  return (
    <>
      <h3>
        Class count: {relatedClasses.length}{" "}
        <CreateClassBtn userId={userId} classes={relatedClasses} />
      </h3>
      <ClassList
        classes={relatedClasses}
        userId={userId}
        addStudent={addStudent}
        removeStudent={removeStudent}
      />
    </>
  );
};
