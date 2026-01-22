"use client";

import { useState } from "react";

import { buildWooLinks, WooProductRow } from "@/core/relay/wooLinks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OutputField } from "@/components/relay/output-field";

export type WooHistoryPayload = {
  baseUrl: string;
  products: WooProductRow[];
  coupon: string;
  destination: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export function WooTool({
  onSave,
  initialData,
}: {
  onSave: (label: string, payload: WooHistoryPayload) => void;
  initialData?: WooHistoryPayload | null;
}) {
  const [baseUrl, setBaseUrl] = useState(initialData?.baseUrl ?? "");
  const [products, setProducts] = useState<WooProductRow[]>(
    initialData?.products ?? [{ productId: "", quantity: 1 }]
  );
  const [coupon, setCoupon] = useState(initialData?.coupon ?? "");
  const [destination, setDestination] = useState(
    initialData?.destination ?? ""
  );
  const [utmSource, setUtmSource] = useState(initialData?.utmSource ?? "");
  const [utmMedium, setUtmMedium] = useState(initialData?.utmMedium ?? "");
  const [utmCampaign, setUtmCampaign] = useState(
    initialData?.utmCampaign ?? ""
  );
  const [output, setOutput] = useState<string | null>(null);

  const canGenerate = baseUrl.trim().length > 0 && products[0].productId !== "";

  function handleChange(index: number, key: keyof WooProductRow, value: string) {
    setProducts((prev) =>
      prev.map((row, idx) =>
        idx === index
          ? { ...row, [key]: key === "quantity" ? Number(value) : value }
          : row
      )
    );
  }

  function addRow() {
    setProducts((prev) => [...prev, { productId: "", quantity: 1 }]);
  }

  function handleGenerate() {
    const link = buildWooLinks({
      baseUrl,
      products,
      coupon: coupon || undefined,
      destination: destination || undefined,
      utm: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });
    setOutput(link.cartLink);
    onSave(baseUrl, {
      baseUrl,
      products,
      coupon,
      destination,
      utmSource,
      utmMedium,
      utmCampaign,
    });
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Base store URL *</label>
          <Input
            value={baseUrl}
            onChange={(event) => setBaseUrl(event.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-medium">Products</div>
          {products.map((row, index) => (
            <div key={`${row.productId}-${index}`} className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Product ID"
                value={row.productId}
                onChange={(event) => handleChange(index, "productId", event.target.value)}
              />
              <Input
                type="number"
                min={1}
                placeholder="Quantity"
                value={row.quantity}
                onChange={(event) => handleChange(index, "quantity", event.target.value)}
              />
            </div>
          ))}
          <Button variant="outline" onClick={addRow}>
            Add product
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Coupon</label>
            <Input value={coupon} onChange={(event) => setCoupon(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination path</label>
            <Input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="/checkout"
            />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="UTM Source"
            value={utmSource}
            onChange={(event) => setUtmSource(event.target.value)}
          />
          <Input
            placeholder="UTM Medium"
            value={utmMedium}
            onChange={(event) => setUtmMedium(event.target.value)}
          />
          <Input
            placeholder="UTM Campaign"
            value={utmCampaign}
            onChange={(event) => setUtmCampaign(event.target.value)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Coupon application requires theme/plugin support. Destination path is best-effort.
        </p>
        <Button onClick={handleGenerate} disabled={!canGenerate}>
          Generate
        </Button>
      </Card>
      {output && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Outputs</h2>
          <OutputField label="Add to cart" value={output} />
        </div>
      )}
    </div>
  );
}
