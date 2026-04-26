"use client";


import { User } from "@/types";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";


export const DeleteMessageBtn: FC<{
  messageId: number;
  currentUser: User;
  userId: number;
  deleteMessage: (messageId: number) => void;
}> = ({ messageId, currentUser,userId, deleteMessage }) => {
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
      <Trash />
    </Button>
  );
};
