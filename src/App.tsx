import { useEffect } from "react";
import { useRoute } from "./admin/router";
import { useApp } from "./store";
import Login from "./admin/Login";
import Admin from "./admin/Admin";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services, { Marquee } from "./components/Services";
import Showcase from "./components/Showcase";
import CvLab from "./components/CvLab";
import Quote from "./components/Quote";
import { Process, NitaqStrip, Testimonials, Faq, Contact, Footer, Floaters } from "./components/More";

function Site() {
  return (
    <div className="min-h-screen bg-paper font-body" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Showcase />
        <CvLab />
        <Quote />
        <Process />
        <NitaqStrip />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Floaters />
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const { isAdmin } = useApp();

  useEffect(() => {
    if (route === "/admin") window.scrollTo({ top: 0 });
  }, [route]);

  if (route === "/admin") {
    if (isAdmin === null) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink-950">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
        </div>
      );
    }
    return isAdmin ? <Admin /> : <Login />;
  }

  return <Site />;
}
