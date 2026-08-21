import { Herobanner } from "@/app/components/shared/hero-banner";
import EbooksPage from "@/app/components/ebooks";

export const metadata = {
  title: "eBook Library | By PaulMichael Rowland | Creditor Academy",
  description: "Download Creditor Academy eBooks on credit repair, business trusts, asset protection and private wealth-building strategies.",
  keywords: "financial ebooks, credit repair guide, business trust ebook, asset protection, creditor academy",
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
