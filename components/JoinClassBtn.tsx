"use client";

import { RelatedStudent, Student } from "@/types";
import { FC, useState } from "react";

export const JoinClassBtn: FC<{
  classId: number;
  userId: number;
  students: RelatedStudent[];
  addStudent: (classId: number, student: Student) => void;
  removeStudent: (classId: number, studentId: number) => void;
}> = ({ classId, userId, students, addStudent, removeStudent }) => {
  const [loading, setLoading] = useState(false);
  const student = students.find((student) => {
    return student.userId === userId;
  });

  if (student) {
    return (
      <button
        onClick={async () => {
          setLoading(true);
          const body = JSON.stringify({ classId });
          const response = await fetch("/api/leave-class", {
            method: "POST",
            body,
          });
          const data = await response.json();
          console.log(data);
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
      </button>
    );
  }
  return (
    <button
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
    </button>
  );
};
