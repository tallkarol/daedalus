"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Package,
  Tag,
  Link as LinkIcon,
  Plus,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { buildWooLinks } from "@/core/relay/wooLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { OutputField } from "@/components/relay/output-field";
import { WooHistoryPayload, WooProductRow } from "@/components/relay/relay-types";

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
  const [output, setOutput] = useState<{
    cartLink: string;
    couponLink?: string;
    destinationLink?: string;
  } | null>(null);

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
    setOutput(link);
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

  function removeRow(index: number) {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((_, idx) => idx !== index));
    }
  }

  return (
    <div className="space-y-6">
      {/* Store Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950/20">
              <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Store Configuration</CardTitle>
              <CardDescription>Your WooCommerce store details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              Base Store URL <span className="text-destructive">*</span>
            </label>
            <Input
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.target.value)}
              placeholder="https://yourstore.com"
              className="h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950/20">
              <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Add products to the cart</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {products.map((row, index) => (
              <div
                key={`${row.productId}-${index}`}
                className="flex gap-3 rounded-lg border p-4"
              >
                <div className="flex-1 grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Product ID
                    </label>
                    <Input
                      placeholder="e.g., 123"
                      value={row.productId}
                      onChange={(event) =>
                        handleChange(index, "productId", event.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="1"
                      value={row.quantity}
                      onChange={(event) =>
                        handleChange(index, "quantity", event.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                </div>
                {products.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={addRow} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </CardContent>
      </Card>

      {/* Options Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-950/20">
              <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Additional Options</CardTitle>
              <CardDescription>Coupon, destination, and tracking</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4 text-muted-foreground" />
                Coupon Code
              </label>
              <Input
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="SAVE20"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                Destination Path
              </label>
              <Input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="/checkout"
                className="h-10"
              />
            </div>
          </div>
          <Separator />
          <div>
            <label className="mb-3 block text-sm font-medium">UTM Parameters</label>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">UTM Source</label>
                <Input
                  placeholder="newsletter"
                  value={utmSource}
                  onChange={(event) => setUtmSource(event.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">UTM Medium</label>
                <Input
                  placeholder="email"
                  value={utmMedium}
                  onChange={(event) => setUtmMedium(event.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">UTM Campaign</label>
                <Input
                  placeholder="summer-sale"
                  value={utmCampaign}
                  onChange={(event) => setUtmCampaign(event.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Coupon application requires theme/plugin support. Destination path is best-effort.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex items-center justify-end gap-3">
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          size="lg"
          className="min-w-[140px]"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Links
        </Button>
      </div>

      {/* Outputs Section */}
      {output && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-semibold">Generated Links</h2>
          </div>
          <div className="space-y-3">
            <OutputField label="Add to Cart" value={output.cartLink} />
            {output.couponLink && (
              <OutputField label="Add to Cart + Coupon" value={output.couponLink} />
            )}
            {output.destinationLink && (
              <OutputField
                label="Add to Cart + Destination"
                value={output.destinationLink}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
