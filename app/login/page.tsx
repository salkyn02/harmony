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
            setLoading(true);
            event.preventDefault();
            await fetch("/api/login/", {
              method: "POST",
              body: JSON.stringify({ name, password }),
            });
            router.push("/");
          }}
          className="flex flex-col gap-2"
        >
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
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
                {showPassword ?  <EyeOff /> : <Eye />}
              </button>
            </div>
          </Field>
          <Button className="m-1" disabled={loading}>Submit</Button>
        </form>
        <CustomLink href="/register">Register</CustomLink>
      </FieldGroup>
    </FieldSet>
  );
}
