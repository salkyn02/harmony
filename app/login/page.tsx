"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomLink } from "@/components/CustomLink";
import { Eye, EyeOff, Music2 } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>();

  return (
    <FieldSet className="flex items-center justify-center min-h-screen">
      <FieldGroup className="flex flex-col gap-2 w-80">
        <div className="p-4 flex flex-col items-center justify-center gap-3">
          <Music2 className="w-20 h-20 text-primary" />
          <div>
            <h1 className="text-primary text-4xl font-bold text-center">
              Harmony
            </h1>
          </div>
        </div>
        <p className="text-center m-3">Log in to continue your journey</p>
        <form
          onSubmit={async (event) => {
            // This code runs after the form is submitted
            setLoading(true);
            event.preventDefault();
            const response = await fetch("/api/login/", {
              method: "POST",
              body: JSON.stringify({ name, password }),
            });
            if (response.ok) {
              // This code runs after a successful submission
              router.push("/");
            } else {
              setMessage("Failed to log in");
              setLoading(false);
            }
          }}
          className="flex flex-col gap-2"
        >
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMessage(undefined);
              }}
              placeholder="Enter your username"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setMessage(undefined);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                type="button"
                className="absolute right-2 inset-y-0"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </Field>
          <Button className="m-1" disabled={loading}>
            Submit
          </Button>
          {message && <p>{message}</p>}
        </form>
        <CustomLink href="/register">Register</CustomLink>
      </FieldGroup>
    </FieldSet>
  );
}
