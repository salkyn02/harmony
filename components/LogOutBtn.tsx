"use client";
import { User } from "@/types";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export const LogOutBtn: FC<{ user?: User }> = ({ user }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        document.cookie = "token=;max-age=0;";
        router.push("/login");
      }}
      className="w-fit"
    >
      Log out
    </Button>
  );
};
