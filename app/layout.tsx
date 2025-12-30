export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>Harmony</h1>
        {children}
      </body>
    </html>
  );
}
