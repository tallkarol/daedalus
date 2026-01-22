export type EndMode = "default" | "specific" | "duration";

export type EventHistoryPayload = {
  title: string;
  description: string;
  location: string;
  start: string;
  timezone: string;
  allDay: boolean;
  endMode: EndMode;
  end: string;
  durationMinutes: number;
  url: string;
  organizerName: string;
  organizerEmail: string;
};

export type WooProductRow = {
  productId: string;
  quantity: number;
};

export type WooHistoryPayload = {
  baseUrl: string;
  products: WooProductRow[];
  coupon: string;
  destination: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export type TrackingHistoryPayload = {
  destination: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  extra: Array<{ key: string; value: string }>;
  linkText: string;
};
