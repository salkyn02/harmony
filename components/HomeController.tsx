"use client";

import { RelatedClass, RelatedStudent, Student, User } from "@/types";
import { FC, useState } from "react";
import { ClassList } from "./ClassList";
import { CreateClassForm } from "./CreateClassForm";

export const HomeController: FC<{
  classes: RelatedClass[];
  currentUserId: number;
  user: User;
}> = ({ classes, currentUserId: currentUserId, user }) => {
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

  function deleteClass(classId: number) {
    const newClasses = relatedClasses.filter((relatedClass) => {
      return relatedClass.id !== classId;
    });
    setRelatedClasses(newClasses);
  }

  function addClass(classRow: RelatedClass) {
    const newClasses = [...relatedClasses, classRow];
    setRelatedClasses(newClasses);
  }

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col justify-between p-1 gap-4 md:flex-row-reverse md:items-center">
        <CreateClassForm addClass={addClass} />
        <h3 className="font-semibold pl-1">
          Class List ({relatedClasses.length})
        </h3>
      </div>

      <ClassList
        classes={relatedClasses}
        currentUserId={currentUserId}
        addStudent={addStudent}
        removeStudent={removeStudent}
        deleteClass={deleteClass}
      />
    </div>
  );
};
