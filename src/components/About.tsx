import { useLanguage } from "@/contexts/LanguageContext";
import { useTrackView } from "@/hooks/useTrackView";
import { DeviceShowcase } from "@/components/DeviceShowcase";

export function About() {
  const { content } = useLanguage();
  const { about } = content;
  const sectionRef = useTrackView('About');

  return (
    <section ref={sectionRef} id="about" className="py-24 im-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 im-reveal">
            <h2 className="text-4xl md:text-5xl mb-4">{about.title}</h2>
            <p className="text-xl im-lead max-w-3xl mx-auto">
              {about.subtitle}
            </p>
          </div>
        </div>

        {/*
          Renders outside .max-w-6xl on purpose — .dv-inner already sets its
          own max-width and padding-inline. Nesting it inside another
          max-w-6xl wrapper wouldn't break the width (both resolve to the
          same 72rem), but it would stack the two paddings and inset the
          phone further than the header/journey blocks above and below it.
        */}
        <DeviceShowcase />

        <div className="max-w-6xl mx-auto">
          <div className="im-panel rounded-2xl p-8 md:p-12 im-reveal">
            <h3 className="text-2xl mb-4">{about.journey.title}</h3>
            {about.journey.paragraphs.map((paragraph, index) => (
              <p key={index} className={`im-body ${index < about.journey.paragraphs.length - 1 ? 'mb-4' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
