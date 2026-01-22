export type TrackingInput = {
  destination: string;
  utm: Record<string, string>;
  extra: Array<{ key: string; value: string }>;
  linkText?: string;
};

export function buildTrackingLink({
  destination,
  utm,
  extra,
  linkText,
}: TrackingInput) {
  const url = new URL(destination);
  const fragment = url.hash;
  url.hash = "";
  const params = url.searchParams;

  Object.entries(utm).forEach(([key, value]) => {
    if (value) {
      params.set(`utm_${key}`, value);
    }
  });

  extra.forEach(({ key, value }) => {
    if (key && value) {
      params.set(key, value);
    }
  });

  url.search = params.toString();
  const finalUrl = `${url.toString()}${fragment}`;
  const html = linkText ? `<a href="${finalUrl}">${linkText}</a>` : "";

  return { url: finalUrl, html };
}
