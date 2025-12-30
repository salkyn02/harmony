"use client";

import { FC } from "react";

export const JoinClassBtn: FC<{ classId: number }> = ({ classId }) => {
  return (
    <button
      onClick={async () => {
        const data = { classId };
        const body = JSON.stringify(data);
        await fetch("/api/join-class", { method: "POST", body });
      }}
    >
      Join class
    </button>
  );
};
