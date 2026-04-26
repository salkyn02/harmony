"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomLink } from "@/components/CustomLink";
import { Music2 } from "lucide-react";

export default function LoginPage() {
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
          </div>
        </div>

        <h2 className="text-xl text-center font-semibold">Welcome back!</h2>
        <p className="text-center">Log in to continue your journey</p>
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
    </div>
  );
}
