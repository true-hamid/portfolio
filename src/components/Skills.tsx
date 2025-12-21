import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export function Skills() {
  const { content } = useLanguage();
  const { skills } = content;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">{skills.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {skills.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl mb-6 font-semibold">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="px-3 py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
