"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { CustomLink } from "@/components/CustomLink";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div>
      <h2>Register</h2>
      <form
        onSubmit={async (event) => {
          setLoading(true);
          event.preventDefault();
          await fetch("/api/register/", {
            method: "POST",
            body: JSON.stringify({ name, password }),
          });
          router.push("/login");
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
        <Button disabled={loading}>Register</Button>
      </form>
      <CustomLink href="/login">Login </CustomLink>
    </div>
  );
};

export default Register;
