import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/92846-copy.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import resumePDF from "@/assets/HamidAbdalrahman.pdf";
import { trackEvent } from "@/utils/analytics";
import { useTrackView } from "@/hooks/useTrackView";

export function Hero() {
  const { content } = useLanguage();
  const { hero, personal } = content;
  const sectionRef = useTrackView('Hero');

  const scrollToProjects = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    trackEvent({ action: 'cv_download', category: 'engagement', label: 'Resume Download' });
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Hamid_Abdalrahman_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="hm-aurora" aria-hidden="true">
        <span className="hm-b1" />
        <span className="hm-b2" />
        <span className="hm-b3" />
      </div>
      <div className="hm-vignette" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center hm-run">
          <div className="mb-8 flex justify-center hm-item hm-avatar">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-40 h-40 rounded-full object-cover border-4 border-white/10 shadow-2xl"
              />
            </div>
          </div>
          <div className="mb-6 hm-item hm-badge">
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 mb-4">
              {hero.badge}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 text-white hm-item hm-title">
            {hero.heading}
            <span className="block hm-gradient">
              {hero.subheading}
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto hm-item hm-desc">
            {hero.description}
          </p>
          <div className="flex gap-4 justify-center mb-12 hm-item hm-cta">
            <Button size="lg" onClick={scrollToProjects}>
              {hero.cta.primary}
              <ArrowDown className="ml-2 size-4 hm-bob" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-800" onClick={handleDownloadCV}>
              {hero.cta.secondary}
            </Button>
          </div>
          <div className="flex gap-6 justify-center hm-item hm-social">
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="size-6" />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="size-6" />
            </a>
            <a href={`mailto:${personal.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
