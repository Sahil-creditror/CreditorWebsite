import { Herobanner } from "@/app/components/shared/hero-banner";
import EbooksPage from "@/app/components/ebooks";

export const metadata = {
  title: "eBooks | Creditor Academy",
  description: "Explore our collection of financial education eBooks by Paulmichael Rowland.",
};

export default function Page() {
  return (
    <main>
      <Herobanner
        heading="eBook Library"
        desc="Expert financial guides by <span>Paulmichael Rowland</span> — click any book to view and purchase."
        buttonPath="https://ebook.lmsathena.com/"
        buttonText="Browse All Books"
      />
      <EbooksPage />
    </main>
  );
}
