import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
