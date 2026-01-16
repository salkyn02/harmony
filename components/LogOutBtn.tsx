"use client";
import { User } from "@/types";
import { FC } from "react";
import { useRouter } from "next/navigation";

export const LogOutBtn: FC<{ user?: User }> = ({ user }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        document.cookie = "token=;max-age=0;";
        router.push("/login");
      }}
    >
      Log out
    </button>
  );
};
