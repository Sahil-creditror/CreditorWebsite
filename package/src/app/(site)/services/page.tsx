import { redirect } from "next/navigation";

/** Legacy /services URL → services listing */
export default function ServicesRedirectPage() {
  redirect("/services_page");
}
