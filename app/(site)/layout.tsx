import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { AIWidget } from "@/components/AIWidget/AIOrb";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AIWidget />
    </>
  );
}
