"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomLink } from "@/components/CustomLink";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={async (event) => {
          setLoading(true);
          event.preventDefault();
          await fetch("/api/login/", {
            method: "POST",
            body: JSON.stringify({ name, password }),
          });
          router.push("/");
        }}
      >
        <Input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button disabled={loading}>Submit</Button>
      </form>
      <CustomLink href="/register">Register</CustomLink>
    </div>
  );
}
