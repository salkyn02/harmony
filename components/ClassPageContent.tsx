"use client";

import { Message, RelatedClass, RelatedStudent, Student, User } from "@/types";
import { FC, useState } from "react";
import ClassDetails from "./ClassDetails";
import { CreateMessageForm } from "./CreateMessageForm";
import { MessageList } from "./MessageList";

export const ClassPageContent: FC<{
  relatedClass: RelatedClass;
  user: User;
  messageRows: Message[];
}> = ({ relatedClass, user, messageRows }) => {
  const [classRow, setClassRow] = useState(relatedClass);
  const [messages, setMessages] = useState(messageRows);

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
    <>
      <ClassDetails
        classRow={classRow}
        userId={user.id}
        addStudent={addStudent}
        removeStudent={removeStudent}
      />
      <CreateMessageForm classId={relatedClass.id} />
      <MessageList messages={messages} />
    </>
  );
};
