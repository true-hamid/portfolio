import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTrackView } from "@/hooks/useTrackView";
import type { Metric } from "@/data/content-en";

const COUNT_MS = 1600;

/*
 * Figures are formatted in en-US in both languages on purpose: the strip is
 * read at a glance, and Western digits with compact notation ("1M") stay
 * legible in the Arabic layout. Only the labels are translated.
 */
function formatMetric(value: number, metric: Metric): string {
  const body = metric.compact
    ? new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 0,
      }).format(value)
    : value.toFixed(metric.decimals ?? 0);

  return `${body}${metric.suffix ?? ""}`;
}

function Counter({ metric, run }: { metric: Metric; run: boolean }) {
  const [shown, setShown] = useState(0);
  const final = formatMetric(metric.value, metric);

  useEffect(() => {
    if (!run) return;

    // Landing straight on the final figure is the honest reduced-motion
    // behaviour — the number is the content, the count is the decoration.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(metric.value);
      return;
    }

    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - started) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setShown(metric.value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, metric.value]);

  return (
    <div className="text-center">
      {/*
        The ticking number would be announced on every frame, so it is hidden
        from assistive tech and the settled value is exposed alongside it.
      */}
      <div className="im-metric-value" aria-hidden="true">
        {formatMetric(shown, metric)}
      </div>
      <span className="im-sr-only">{final}</span>
      <p className="im-metric-label">{metric.label}</p>
    </div>
  );
}

export function Metrics() {
  const { content } = useLanguage();
  const { metrics } = content;
  const sectionRef = useTrackView("Metrics");
  const gridRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 im-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center im-eyebrow im-reveal">{metrics.title}</h2>
          <div ref={gridRef} className="im-metrics-grid im-stagger">
            {metrics.items.map((metric, index) => (
              <div key={index} className="im-reveal">
                <Counter metric={metric} run={run} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
