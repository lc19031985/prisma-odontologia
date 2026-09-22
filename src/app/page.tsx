import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import Team from "@/components/Team";
import GoogleReview from "@/components/GoogleReview";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";
import CookieNotice from "@/components/CookieNotice";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <NewsTicker />
        <About />
        <Specialties />
        <Team />
        <GoogleReview />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
      <CookieNotice />
    </>
  );
}
