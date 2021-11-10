export const GA_TRACKING_ID = "G-DS84DW5BVS";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const outbound = ({ href }: any) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "click", {
      event_category: "outbound",
      event_label: href,
      transport_type: "beacon",
    });
  }
};
