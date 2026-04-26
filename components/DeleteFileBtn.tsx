"use client";

import { User } from "@/types";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export const DeleteFileBtn: FC<{
  fileId: number;
  currentUser: User;
  userId: number;
  deleteFile: (fileId: number) => void;
}> = ({ fileId, currentUser, userId, deleteFile }) => {
  const [loading, setLoading] = useState(false);

  if (currentUser.id !== userId) {
    return <></>;
  }

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const response = await fetch(`/api/delete-file/${fileId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          deleteFile(fileId);
        } else {
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      <Trash />
    </Button>
  );
};
