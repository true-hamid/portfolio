import { Code2, Users, Rocket, GitPullRequestArrow } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function About() {
  const { content } = useLanguage();
  const { about } = content;

  const icons = [Code2, Rocket, GitPullRequestArrow, Users];
  const highlights = about.highlights.map((highlight, index) => ({
    ...highlight,
    icon: icons[index],
  }));

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">{about.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {about.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
                    <Icon className="size-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl mb-4">{about.journey.title}</h3>
            {about.journey.paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-slate-700 ${index < about.journey.paragraphs.length - 1 ? 'mb-4' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
