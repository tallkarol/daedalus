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
  const base = new URL(baseUrl);
  const addParams = new URLSearchParams();

  products.forEach((product) => {
    addParams.append("add-to-cart", product.productId);
    addParams.append("quantity", String(product.quantity));
  });

  if (coupon) {
    addParams.append("coupon", coupon);
  }

  if (destination) {
    addParams.append("destination", destination);
  }

  if (utm) {
    Object.entries(utm).forEach(([key, value]) => {
      if (value) {
        addParams.append(key, value);
      }
    });
  }

  const buildLink = () => {
    const url = new URL(base.toString());
    url.search = addParams.toString();
    return url.toString();
  };

  const link = buildLink();

  return {
    cartLink: link,
  };
}
