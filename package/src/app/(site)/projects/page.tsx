import { redirect } from "next/navigation";

/** Legacy URL — canonical page is /masterclass-membership */
export default function ProjectsRedirectPage() {
  redirect("/masterclass-membership");
}
