"use client";


import { User } from "@/types";
import { FC, useState } from "react";
import { Button } from "./ui/button";

export const DeleteAudioBtn: FC<{
  audioId: number;
  currentUser: User;
  userId: number;
  deleteAudio: (audioId: number) => void;
}> = ({ audioId, currentUser,userId, deleteAudio }) => {
  const [loading, setLoading] = useState(false);
 
  if (currentUser.id !== userId) {
    return <></>;
  }

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const response = await fetch(`/api/delete-audio/${audioId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          deleteAudio(audioId);
         
        } else {
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Delete audio
    </Button>
  );
};
