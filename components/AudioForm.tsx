"use client";

import { RelatedAudio } from "@/types";
import { FC, useState, useRef } from "react";
import { Button } from "./ui/button";

export const AudioForm: FC<{
  classId: number;
  addAudio: (newAudio: RelatedAudio) => void;
}> = ({ classId, addAudio }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("classId", String(classId));
        setLoading(true);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        data.createdAt = new Date(data.createdAt);
        setLoading(false);
        addAudio(data);
        if (inputRef.current == null) {
          throw new Error("Input missing");
        }
        inputRef.current.value = "";
      }}
    >
      <input type="file" name="file" ref={inputRef} accept="audio/*" />
      <Button disabled={loading}>Submit</Button>
    </form>
  );
};
