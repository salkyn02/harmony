"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import {
  RelatedMessage,
  RelatedClass,
  RelatedStudent,
  Student,
  User,
  Audio,
  RelatedAudio,
} from "@/types";
import { FC, useState } from "react";
import ClassDetails from "./ClassDetails";
import { CreateMessageForm } from "./CreateMessageForm";
import { MessageList } from "./MessageList";
import { AudioForm } from "./AudioForm";
import { Navbar } from "./Navbar";

const AudioRecorder = dynamic(
  () => {
    return import("./AudioRecorder");
  },
  { ssr: false },
);

export const ClassPageContent: FC<{
  relatedClass: RelatedClass;
  currentUser: User;
  messageRows: RelatedMessage[];
  audioRows: RelatedAudio[];
}> = ({ relatedClass, currentUser, messageRows, audioRows }) => {
  const [classRow, setClassRow] = useState(relatedClass);
  const [messages, setMessages] = useState(messageRows);
  const [audios, setAudios] = useState(audioRows);

  const router = useRouter();

  function addMessage(newMessage: RelatedMessage) {
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  }

  function addAudio(newAudio: Audio) {
    const relatedAudio = {
      ...newAudio,
      user: currentUser,
    };
    const newAudios = [...audios, relatedAudio];
    setAudios(newAudios);
  }

  function addStudent(classId: number, student: Student) {
    const newStudent: RelatedStudent = {
      ...student,
      user: currentUser,
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

  function deleteClass() {
    router.push("/");
  }

  function deleteAudio (audioId: number) {
    const newAudios = audios.filter((audio) => {
      return audio.id !== audioId;
    });

    setAudios(newAudios)
  }

  function deleteMessage (messageId: number) {
    const newMessage = messages.filter((message) => {
      return message.id !== messageId;
    });

    setMessages(newMessage)
  }

  return (
    <>
    <Navbar user={currentUser}/>
      <ClassDetails
        classRow={classRow}
        currentUserId={currentUser.id}
        addStudent={addStudent}
        removeStudent={removeStudent}
        deleteClass={deleteClass}
      />
      <AudioForm classId={relatedClass.id} addAudio={addAudio} />

      <CreateMessageForm classId={relatedClass.id} addMessage={addMessage} />
      <AudioRecorder classId={relatedClass.id} addAudio={addAudio} />
      <MessageList messages={messages} audios={audios} deleteAudio={deleteAudio} deleteMessage={deleteMessage} currentUser={currentUser}/>
    </>
  );
};
