import { User } from "@/types";
import { FC } from "react";
import { Profile } from "./Profile";
import { CustomLink } from "./CustomLink";

export const Navbar: FC<{ user?: User }> = ({ user }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomLink href="/">Harmony</CustomLink>
      <Profile user={user}/>
    </div>
  );
};
