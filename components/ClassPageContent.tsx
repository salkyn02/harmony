"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import {
  RelatedMessage,
  RelatedClass,
  RelatedStudent,
  Student,
  User,
  File,
  RelatedFile,
} from "@/types";
import { FC, useState } from "react";
import ClassDetails from "./ClassDetails";
import { CreateMessageForm } from "./CreateMessageForm";
import { MessageList } from "./MessageList";
import { FileInput } from "./FileInput";
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
  fileRows: RelatedFile[];
}> = ({ relatedClass, currentUser, messageRows, fileRows }) => {
  const [classRow, setClassRow] = useState(relatedClass);
  const [messages, setMessages] = useState(messageRows);
  const [files, setFiles] = useState(fileRows);
  const [audioRecording, setAudioRecording] = useState(false);

  const router = useRouter();

  function addMessage(newMessage: RelatedMessage) {
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  }

  function addFile(newFile: File) {
    const relatedFile = {
      ...newFile,
      user: currentUser,
    };
    const newFiles = [...files, relatedFile];
    setFiles(newFiles);
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

  function deleteFile(fileId: number) {
    const newFiles = files.filter((file) => {
      return file.id !== fileId;
    });

    setFiles(newFiles);
  }

  function deleteMessage(messageId: number) {
    const newMessage = messages.filter((message) => {
      return message.id !== messageId;
    });

    setMessages(newMessage);
  }

  function startRecording() {
    setAudioRecording(true);
  }

  function stopRecording() {
    setAudioRecording(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <Navbar user={currentUser} />
      <ClassDetails
        classRow={classRow}
        currentUserId={currentUser.id}
        addStudent={addStudent}
        removeStudent={removeStudent}
        deleteClass={deleteClass}
      />
      <MessageList
        messages={messages}
        files={files}
        deleteFile={deleteFile}
        deleteMessage={deleteMessage}
        currentUser={currentUser}
      />

      <div className="flex w-full flex-row-reverse items-center">
        {!audioRecording && (
          <>
            <CreateMessageForm
              classId={relatedClass.id}
              addMessage={addMessage}
            />
            <FileInput classId={relatedClass.id} addFile={addFile} />
          </>
        )}
        <AudioRecorder
          classId={relatedClass.id}
          addFile={addFile}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>
    </div>
  );
};
