"use client";

import { RelatedClass } from "@/types";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const CreateClassForm: FC<{
  addClass: (classRow: RelatedClass) => void;
}> = ({ addClass }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        setLoading(true);
        event.preventDefault();
        const response = await fetch("/api/create-class", {
          method: "POST",
          body: JSON.stringify({ title }),
        });
        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          const data = await response.json();
          addClass(data.class);
        }
        setLoading(false);
        setTitle("");
      }}
      className="flex gap-2"
    >
      <Input
        placeholder="Type title..."
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <Button disabled={loading}>Create class</Button>
    </form>
  );
};
