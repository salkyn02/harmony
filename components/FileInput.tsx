"use client";

import { RelatedFile } from "@/types";
import { FC, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Paperclip } from "lucide-react";

export const FileInput: FC<{
  classId: number;
  addFile: (newFile: RelatedFile) => void;
}> = ({ classId, addFile }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        type="file"
        name="file"
        ref={inputRef}
        accept="*"
        className="hidden"
        onChange={async (event) => {
          event.preventDefault();
          const file = event.currentTarget.files?.[0];
          if (!file) {
            throw new Error("File missing");
          }
          const formData = new FormData();
          formData.append("file", file);
          formData.append("classId", String(classId));
          setLoading(true);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          data.createdAt = new Date(data.createdAt);
          setLoading(false);
          addFile(data);
          if (inputRef.current == null) {
            throw new Error("Input missing");
          }
          inputRef.current.value = "";
        }}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        className="hover:bg-transparent hover:text-primary cursor-pointer"
      >
        <Paperclip className="w-8 h-8" />
      </Button>
    </>
  );
};
