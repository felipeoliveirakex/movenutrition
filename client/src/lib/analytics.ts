type UmamiConfig = {
  endpoint: string;
  websiteId: string;
};

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function getUmamiConfig(): UmamiConfig | null {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID as string | undefined;

  if (!endpoint || !websiteId) return null;
  return { endpoint: normalizeBaseUrl(endpoint), websiteId };
}

export function initAnalytics() {
  const config = getUmamiConfig();
  if (!config) return;

  // Avoid duplicate injection (HMR / client-side navigations)
  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-analytics="umami"]'
  );
  if (existing) return;

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.analytics = "umami";
  script.setAttribute("data-website-id", config.websiteId);

  // Preserve existing project convention: /umami
  script.src = `${config.endpoint}/umami`;

  document.head.appendChild(script);
}
