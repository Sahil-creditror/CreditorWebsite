import { redirect } from "next/navigation";

/** Legacy URL — canonical page is /operate-private */
export default function OperateRedirectPage() {
  redirect("/services/course-cataloges/operate-private");
}
