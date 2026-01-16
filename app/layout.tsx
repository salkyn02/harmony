import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Link href={"/"}>
          <h1>Harmony</h1>
        </Link>

        {children}
      </body>
    </html>
  );
}
