import  Link  from "next/link"
import { buttonVariants } from "./ui/button"

import { FC, ReactNode } from "react"

export const CustomLink:  FC<{ href: string, children: ReactNode }> = ({ href, children }) => {
  return (
      <Link href={href} className={buttonVariants({ variant: "link" })}>
        {children}
      </Link>
  )
}