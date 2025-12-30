import { User } from "@/types";
import { FC } from "react";

export const Profile: FC<{ user?: User }> = async ({ user }) => {
  if (!user) {
    return <h2>Invalid token</h2>;
  }
  return <h2>{user?.name}</h2>;
};
