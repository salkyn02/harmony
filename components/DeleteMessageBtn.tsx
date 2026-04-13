"use client";


import { User } from "@/types";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";


export const DeleteMessageBtn: FC<{
  messageId: number;
  currentUser: User;
  userId: number;
  deleteMessage: (audioId: number) => void;
}> = ({ messageId: messageId, currentUser,userId, deleteMessage: deleteMessage }) => {
  const [loading, setLoading] = useState(false);
 
  if (currentUser.id !== userId) {
    return <></>;
  }

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const response = await fetch(`/api/delete-message/${messageId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          deleteMessage(messageId);
         
        } else {
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Delete message
    </Button>
  );
};
