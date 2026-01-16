"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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
        <button disabled={loading}>Register</button>
      </form>
      <Link href={"/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Register;
