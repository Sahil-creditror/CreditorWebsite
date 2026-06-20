import { redirect } from "next/navigation";

/** Legacy URL — canonical page is /financial-freedom */
export default function PrivateRedirectPage() {
  redirect("/services/course-cataloges/financial-freedom");
}
