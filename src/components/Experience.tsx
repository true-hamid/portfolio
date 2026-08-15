import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTrackView } from "@/hooks/useTrackView";

export function Experience() {
  const { content } = useLanguage();
  const { experience } = content;
  const sectionRef = useTrackView('Experience');

  return (
    <section ref={sectionRef} id="experience" className="py-24 im-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 im-reveal">
            <h2 className="text-4xl md:text-5xl mb-4">{experience.title}</h2>
            <p className="text-xl im-lead">
              {experience.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            {experience.positions.map((exp, index) => (
              <div key={index} className="im-card rounded-xl p-8 im-reveal">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-2 im-accent">
                      <Briefcase className="size-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 im-lead mt-2 md:mt-0">
                    <Calendar className="size-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3 im-body">
                      <span className="im-accent mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
