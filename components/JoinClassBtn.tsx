"use client";

import { RelatedStudent, Student } from "@/types";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";


export const JoinClassBtn: FC<{
  classId: number;
  userId: number;
  students: RelatedStudent[];
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
  teacherUserId: number;
}> = ({
  classId,
  userId,
  students,
  addStudent,
  removeStudent,
  teacherUserId,
}) => {
  const [loading, setLoading] = useState(false);
  const student = students.find((student) => {
    return student.userId === userId;
  });

  if (userId === teacherUserId) {
    return <></>;
  }
  
  if (student) {
    return (
      <Button
        onClick={async () => {
          setLoading(true);
          const body = JSON.stringify({ classId });
          const response = await fetch("/api/leave-class", {
            method: "POST",
            body,
          });
          const data = await response.json();
          if (response.ok) {
            removeStudent(classId, student.id);
          } else {
            alert(data.message);
          }
          setLoading(false);
        }}
        disabled={loading}
      >
        Leave class
      </Button>
    );
  }
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const body = JSON.stringify({ classId });
        const response = await fetch("/api/join-class", {
          method: "POST",
          body,
        });
        const data = await response.json();
        if (response.ok) {
          addStudent(classId, data.student);
        } else {
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Join class
    </Button>
  );
};
