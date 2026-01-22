"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import { WooTool } from "@/components/relay/woo-tool";
import { Button } from "@/components/ui/button";

export default function WooToolPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Button variant="ghost" asChild className="mb-2">
          <Link href="/tools/relay" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Relay Dashboard
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950/20">
            <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">WooCommerce Link Builder</h1>
            <p className="text-lg text-muted-foreground">
              Create add-to-cart links with products, coupons, and UTM tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl">
        <WooTool
          onSave={() => {}}
          initialData={null}
        />
      </div>
    </div>
  );
}
