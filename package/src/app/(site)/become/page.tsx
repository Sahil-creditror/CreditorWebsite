import { redirect } from "next/navigation";

/** Legacy URL — canonical page is /become-private */
export default function BecomeRedirectPage() {
  redirect("/services/course-cataloges/become-private");
}
