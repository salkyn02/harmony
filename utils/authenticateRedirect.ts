import { redirect } from "next/navigation";
import authenticate from "./authenticate";

export default async function authenticateRedirect() {
  try {
    return await authenticate();
  } catch {
    redirect("/login");
  }
}
