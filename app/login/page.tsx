"use client";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await fetch("/api/login/", {
          method: "POST",
          body: JSON.stringify({ name, password }),
        });
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
      <button>Submit</button>
    </form>
  );
}
