"use client";

import { RelatedStudent } from "@/types";
import { FC, useState } from "react";

export const JoinClassBtn: FC<{
  classId: number;
  userId: number;
  students: RelatedStudent[];
}> = ({ classId, userId, students }) => {
  const [loading, setLoading] = useState(false);
  const alreadyStudent = students.some((student) => {
    return student.userId === userId;
  });

  if (alreadyStudent) {
    return (
      <button
        onClick={async () => {
          setLoading(true);
          const data = { classId };
          const body = JSON.stringify(data);
          const response = await fetch("/api/leave-class", {
            method: "POST",
            body,
          });
          if (!response.ok) {
            const data = await response.json();
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
        const data = { classId };
        const body = JSON.stringify(data);
        const response = await fetch("/api/join-class", {
          method: "POST",
          body,
        });
        if (!response.ok) {
          const data = await response.json();
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
