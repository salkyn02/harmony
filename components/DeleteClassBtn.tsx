"use client";


import { FC, useState } from "react";

export const DeleteClassBtn: FC<{
  classId: number;
  currentUserId: number;
  teacherUserId: number;
  deleteClass: (classId: number) => void;
}> = ({ classId, currentUserId, teacherUserId, deleteClass }) => {
  const [loading, setLoading] = useState(false);
 
  if (currentUserId !== teacherUserId) {
    return <></>;
  }
  return (
    <button
      onClick={async () => {
        setLoading(true);
        const response = await fetch(`/api/delete-class/${classId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          deleteClass(classId);
         
        } else {
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Delete class
    </button>
  );
};
