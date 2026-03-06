"use client";

import { FC, useState } from "react";

export const CreateMessageForm: FC<{
  classId: number;
}> = ({ classId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Create Message</h2>
      <form
        onSubmit={async (event) => {
          setLoading(true);
          event.preventDefault();
          await fetch("/api/create-message/", {
            method: "POST",
            body: JSON.stringify({ content, classId }),
          });
          setLoading(false);
        }}
      >
        <input
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />

        <button disabled={loading}>Submit</button>
      </form>
    </div>
  );
};
