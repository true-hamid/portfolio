import { useEffect, useRef, useState } from "react";
import { Home, BarChart3, CreditCard, User, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ShowcasePanel } from "@/data/content-en";

/** How far the device turns between the first panel and the last. */
const TURN_START = -14;
const TURN_STEP = 4.5;

function ScreenBody({ screen }: { screen: ShowcasePanel["screen"] }) {
  switch (screen.kind) {
    case "story":
      return (
        <>
          <div className="dv-app-figure">{screen.figure}</div>
          <div className="dv-app-sub">{screen.caption}</div>
          {screen.rows.map((row) => (
            <div key={row} className="dv-row">
              <span className="dv-dot" />
              {row}
            </div>
          ))}
        </>
      );

    case "stats":
      return (
        <div className="dv-stats">
          {screen.stats.map((stat) => (
            <div key={stat.label} className="dv-stat">
              <div className="dv-stat-value">{stat.value}</div>
              <div className="dv-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      );

    case "badge":
      // Plain translated text — no bidi-isolate guard here, unlike the
      // figures above. That guard exists because "1M+"/"90%"/"×3" end in
      // bidi-neutral characters that reorder under RTL; a whole phrase like
      // "رائد الذكاء الصناعي" has no such character and forcing it to LTR
      // would just misalign it against the rest of the Arabic layout.
      return (
        <>
          <div className="dv-badge-label">{screen.label}</div>
          <div className="dv-badge-description">{screen.description}</div>
          <div className="dv-badge-icon" aria-hidden="true">
            <Sparkles size={22} />
          </div>
          {screen.tags.map((tag) => (
            <div key={tag} className="dv-row">
              <span className="dv-dot" />
              {tag}
            </div>
          ))}
        </>
      );
  }
}

/*
 * Purely decorative chrome, identical across every panel — it exists so the
 * screen reads as a real app surface even on panels whose own content is
 * short, rather than leaving a slab of empty glass beneath a couple of lines
 * of text. Not a claim about any actual app's navigation.
 */
function TabBar() {
  return (
    <div className="dv-tabbar" aria-hidden="true">
      <span className="dv-tab dv-tab-active">
        <Home size={14} />
      </span>
      <span className="dv-tab">
        <BarChart3 size={14} />
      </span>
      <span className="dv-tab">
        <CreditCard size={14} />
      </span>
      <span className="dv-tab">
        <User size={14} />
      </span>
    </div>
  );
}

function Screen({ panel, active }: { panel: ShowcasePanel; active: boolean }) {
  return (
    <div className="dv-app" data-active={active}>
      <div className="dv-app-label">{panel.screenLabel}</div>
      <ScreenBody screen={panel.screen} />
    </div>
  );
}

export function DeviceShowcase() {
  const { content, dir } = useLanguage();
  const { showcase } = content;
  // The device sits on the opposite side of the text under RTL, so its turn
  // has to mirror too or it ends up angled away from the copy instead of
  // toward it.
  const turnSign = dir === "rtl" ? -1 : 1;
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
    <div className="dv-showcase">
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
                  <TabBar />
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
    </div>
  );
}
