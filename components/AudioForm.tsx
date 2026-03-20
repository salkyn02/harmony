"use client";

import { FC, useState } from "react";

export const AudioForm: FC<{
  classId: number;
}> = ({ classId }) => {
  const [loading, setLoading] = useState(false);
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
        setLoading(false);
        console.log(data);
      }}
    >
      <input type="file" name="file" />
      <button disabled={loading}>Submit</button>
    </form>
  );
};
