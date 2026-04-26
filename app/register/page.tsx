"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/CustomLink";
import { Music2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-2 w-80">
        <div className="p-4 flex flex-col items-center justify-center gap-3">
          <Music2 className="w-20 h-20 text-primary" />
          <div>
            <h1 className="text-primary text-4xl font-bold text-center">
              Harmony
            </h1>
            <p className="text-center">Learn. Connect. Harmonize.</p>
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
    </div>
  );
};

export default Register;
