import Link from "next/link";
import { buttonVariants } from "./ui/button";

import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CustomLink: FC<{
  href: string;
  children: ReactNode;
  className?: string;
}> = ({ href, children, className }) => {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "link" }), className)}>
      {children}
    </Link>
  );
};
