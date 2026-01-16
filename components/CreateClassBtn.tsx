"use client";

import { RelatedClass } from "@/types";
import { FC, useState } from "react";

export const CreateClassBtn: FC<{
  userId: number;
  classes: RelatedClass[];
}> = ({ userId, classes }) => {
  const [loading, setLoading] = useState(false);
  const alreadyTeacher = classes.some((classRow) => {
    return classRow.teacherUserId === userId;
  });
  if (alreadyTeacher) {
    return undefined;
  }
  
  return (
    <button
      onClick={async () => {
        setLoading(true);
        const response = await fetch("/api/create-class", { method: "POST" });
        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Create class
    </button>
  );
};
