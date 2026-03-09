"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

export const DeleteClassBtn: FC<{
  classId: number;
}> = ({ classId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        setLoading(true);
        const response = await fetch(`/api/delete-class/${classId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          router.push("/");
        } else {
          alert(data.message);
        }
        setLoading(false);
      }}
      disabled={loading}
    >
      Delete class
    </button>
  );
};
