import "./globals.css"
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Link href={"/"}>
          <h1>Harmony</h1>
        </Link>

        {children}
      </body>
    </html>
  );
}
