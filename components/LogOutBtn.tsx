"use client";
import { User } from "@/types";
import { FC } from "react";

export const LogOutBtn: FC<{ user?: User }> = ({ user }) => {
  return (
    <button
      onClick={() => {
        document.cookie = "token=;max-age=0;";
      }}
    >
      Log out
    </button>
  );
};
