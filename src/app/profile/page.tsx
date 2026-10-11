import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileView from "./ProfileView";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");

  const { name, email, image } = session.user;

  return <ProfileView user={{ name, email, image }} />;
}