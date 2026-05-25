import { redirect } from "next/navigation";

/** Legacy URL — canonical page is /become-private */
export default function BecomeRedirectPage() {
  redirect("/become-private");
}
