"use client";

import { RelatedMessage } from "@/types";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";


export const CreateMessageForm: FC<{
  classId: number;
  addMessage: (newMessage: RelatedMessage) => void;
}> = ({ classId, addMessage }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Create Message</h2>
      <form
        onSubmit={async (event) => {
          setLoading(true);
          event.preventDefault();
          const response = await fetch("/api/create-message/", {
            method: "POST",
            body: JSON.stringify({ content, classId }),
          });
          const data = await response.json();
          data.message.createdAt = new Date(data.message.createdAt);
          if (response.ok) {
            addMessage(data.message);
          } else {
            alert(data.message);
          }

          setLoading(false);
          setContent('')
        }}
      >
        <Input
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />

        <Button disabled={loading}>Submit</Button>
      </form>
    </div>
  );
};
