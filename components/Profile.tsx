"use client";

import { User } from "@/types";
import { FC, useState } from "react";
import { LogOutBtn } from "./LogOutBtn";
import { CircleUser } from "lucide-react";

export const Profile: FC<{ user?: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);

  if (!user) {
    return <h2>Invalid token</h2>;
  }
  return (
    <div className="relative inline-block">
      <CircleUser
        className="text-primary cursor-pointer w-8 h-8"
        type="button"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 mt-2 flex flex-col gap-1 items-center bg-background p-3">
          {user?.name} <LogOutBtn />
        </div>
      )}
    </div>
  );
};
