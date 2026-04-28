"use client";

import { User } from "@/types";
import { FC } from "react";
import { LogOutBtn } from "./LogOutBtn";
import { CircleUser } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Profile: FC<{ user?: User }> = ({ user }) => {
  if (!user) {
    return <h2>Invalid token</h2>;
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CircleUser
          className="text-primary cursor-pointer w-8 h-8"
          type="button"
        />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        {user?.name} <LogOutBtn />
      </PopoverContent>
    </Popover>
  );
};
