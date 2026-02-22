type EventCategory = 'engagement' | 'view' | 'navigation';

interface TrackEventParams {
  action: string;
  category: EventCategory;
  label: string;
  value?: number;
}

export function trackEvent({ action, category, label, value }: TrackEventParams) {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    ...(value !== undefined && { value }),
  });
}
