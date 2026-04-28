import { User } from "@/types";
import { FC } from "react";
import { Profile } from "./Profile";
import { CustomLink } from "./CustomLink";

export const Navbar: FC<{ user?: User }> = ({ user }) => {
  return (
    <div className="w-full border-b bg-background">
      <div className="flex justify-between items-center max-w-6xl mx-auto h-16 pr-2.5">
        <CustomLink href="/" className="text-2xl font-bold"> Harmony</CustomLink>
        <Profile user={user} />
      </div>
    </div>
  );
};
