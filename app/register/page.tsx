"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/CustomLink";
import { Music2 } from "lucide-react";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
          <div>
            <p className="text-center pt-4">Create your account</p>
          </div>
        </div>

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
          className="flex flex-col gap-2"
        >
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="Choose a unique username"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder=" Must be at least 8 characters long"
              type="password"
            />
          </Field>

          <Button className="m-1" disabled={loading}>
            Register
          </Button>
        </form>
        <CustomLink href="/login">Login </CustomLink>
      </FieldGroup>
    </FieldSet>
  );
};

export default Register;
