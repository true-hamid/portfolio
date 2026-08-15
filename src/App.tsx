import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { DeviceShowcase } from "@/components/DeviceShowcase";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      {/*
        Everything past the hero shares one background, so the page descends
        through a single space rather than alternating light and dark panels.
      */}
      <div className="im-stage">
        <Metrics />
        <DeviceShowcase />
        <About />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
