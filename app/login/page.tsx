"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button disabled={loading}>Submit</button>
      </form>
      <Link href={"/register"}>
        <button>Register</button>
      </Link>
    </div>
  );
}
