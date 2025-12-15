"use client";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await fetch("/api/register/", {
          method: "POST",
          body: JSON.stringify({ name: name, password: password }),
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
      <button>Register</button>
    </form>
  );
};

export default Register;
