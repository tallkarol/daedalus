export type WooProductRow = {
  productId: string;
  quantity: number;
};

export type WooInput = {
  baseUrl: string;
  products: WooProductRow[];
  coupon?: string;
  destination?: string;
  utm?: Record<string, string>;
};

export function buildWooLinks({
  baseUrl,
  products,
  coupon,
  destination,
  utm,
}: WooInput) {
  const buildParams = (options?: {
    includeCoupon?: boolean;
    includeDestination?: boolean;
  }) => {
    const addParams = new URLSearchParams();

    products.forEach((product) => {
      addParams.append("add-to-cart", product.productId);
      addParams.append("quantity", String(product.quantity));
    });

    if (options?.includeCoupon && coupon) {
      addParams.append("coupon", coupon);
    }

    if (options?.includeDestination && destination) {
      addParams.append("destination", destination);
    }

    if (utm) {
      Object.entries(utm).forEach(([key, value]) => {
        if (value) {
          addParams.append(key, value);
        }
      });
    }

    const url = new URL(baseUrl);
    url.search = addParams.toString();
    return url.toString();
  };

  return {
    cartLink: buildParams(),
    couponLink: coupon ? buildParams({ includeCoupon: true }) : undefined,
    destinationLink: destination
      ? buildParams({ includeDestination: true })
      : undefined,
  };
}
