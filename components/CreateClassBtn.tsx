"use client";

import { RelatedClass } from "@/types";
import { FC, useState } from "react";
import { Button } from "./ui/button";

export const CreateClassBtn: FC<{
  userId: number;
  classes: RelatedClass[];
  addClass: (classRow: RelatedClass) => void;
}> = ({ userId, classes, addClass }) => {
  const [loading, setLoading] = useState(false);
  const alreadyTeacher = classes.some((classRow) => {
    return classRow.teacherUserId === userId;
  });
  if (alreadyTeacher) {
    return undefined;
  }

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const response = await fetch("/api/create-class", { method: "POST" });
        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          const data = await response.json();
          addClass(data.class);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Create class
    </Button>
  );
};
