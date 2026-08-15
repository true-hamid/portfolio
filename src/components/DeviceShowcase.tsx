import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTrackView } from "@/hooks/useTrackView";
import type { ShowcasePanel, ShowcaseScreen } from "@/data/content-en";

/** How far the device turns between the first panel and the last. */
const TURN_START = -14;
const TURN_STEP = 4.5;

function Screen({ panel, active }: { panel: ShowcasePanel; active: boolean }) {
  const { screen } = panel;

  return (
    <div className="dv-app" data-active={active}>
      <div className="dv-app-label">{panel.screenLabel}</div>
      <div className="dv-app-figure">{screen.figure}</div>
      <div className="dv-app-sub">{screen.caption}</div>
      <ScreenBody screen={screen} />
    </div>
  );
}

function ScreenBody({ screen }: { screen: ShowcaseScreen }) {
  switch (screen.kind) {
    case "reach":
      return (
        <>
          {screen.regions.map((region) => (
            <div key={region} className="dv-row">
              <span className="dv-dot" />
              {region}
            </div>
          ))}
        </>
      );

    case "security":
      return (
        <>
          {screen.checks.map((check) => (
            <div key={check} className="dv-row">
              <span className="dv-check" aria-hidden="true">
                ✓
              </span>
              {check}
            </div>
          ))}
        </>
      );

    case "performance":
      // Relative widths only — the public record is the 3x ratio, not a timing.
      return (
        <>
          <div className="dv-bar-label">
            <span>{screen.beforeLabel}</span>
          </div>
          <div className="dv-bar">
            <span style={{ ["--dv-w" as string]: "100%" }} />
          </div>
          <div className="dv-bar-label">
            <span>{screen.afterLabel}</span>
          </div>
          <div className="dv-bar">
            <span style={{ ["--dv-w" as string]: "33%" }} />
          </div>
        </>
      );

    case "ai":
      return (
        <>
          {screen.stages.map((stage) => (
            <div key={stage} className="dv-row">
              <span className="dv-dot" />
              {stage}
            </div>
          ))}
        </>
      );
  }
}

export function DeviceShowcase() {
  const { content, dir } = useLanguage();
  const { showcase } = content;
  // The device sits on the opposite side of the text under RTL, so its turn
  // has to mirror too or it ends up angled away from the copy instead of
  // toward it.
  const turnSign = dir === "rtl" ? -1 : 1;
  const sectionRef = useTrackView("Showcase");
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    /*
     * Collapsing the root to a band across the viewport's middle means a panel
     * counts as current exactly while it crosses the centre line. No scroll
     * position maths, and no wheel hijacking — the page scrolls normally.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [showcase.panels.length]);

  return (
    <section ref={sectionRef} className="dv-showcase im-section">
      <div className="dv-head im-reveal">
        <h2 className="text-4xl md:text-5xl mb-4">{showcase.title}</h2>
        <p>{showcase.subtitle}</p>
      </div>

      <div className="dv-inner">
        <div className="dv-sticky">
          <div className="dv-stage">
            <div className="dv-float">
              <div
                className="dv-phone"
                style={{
                  ["--dv-turn" as string]: `${turnSign * (TURN_START + active * TURN_STEP)}deg`,
                }}
              >
                <div className="dv-screen">
                  <div className="dv-island" aria-hidden="true" />
                  {showcase.panels.map((panel, index) => (
                    <Screen
                      key={index}
                      panel={panel}
                      active={index === active}
                    />
                  ))}
                  <div className="dv-glare" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {showcase.panels.map((panel, index) => (
            <article
              key={index}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              className="dv-panel"
              data-active={index === active}
            >
              <div className="dv-panel-inner">
                <div className="dv-panel-eyebrow">{panel.eyebrow}</div>
                <h3>{panel.title}</h3>
                <p>{panel.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
