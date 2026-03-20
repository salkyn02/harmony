"use client";

import { RelatedClass, RelatedStudent, Student, User } from "@/types";
import { FC, useState } from "react";
import { ClassList } from "./ClassList";
import { CreateClassBtn } from "./CreateClassBtn";


export const HomeController: FC<{
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
    <>
   
    <audio src="https://res.cloudinary.com/dozrfojo0/video/upload/v1773699757/test.mp3" controls/>
      <h3>
        Class count: {relatedClasses.length}{" "}
        <CreateClassBtn
          userId={userId}
          classes={relatedClasses}
          addClass={addClass}
        />
      </h3>
      <ClassList
        classes={relatedClasses}
        userId={userId}
        addStudent={addStudent}
        removeStudent={removeStudent}
        deleteClass={deleteClass}
      />

    </>
  );
};
