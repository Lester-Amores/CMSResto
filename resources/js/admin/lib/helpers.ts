export function getFullImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const baseUrl = import.meta.env.APP_URL || window.location.origin;

  if (path.startsWith('storage/') || path.startsWith('images/')) {
    return `${baseUrl}/${path}`;
  }

  return `${baseUrl}/storage/${path}`;
}

export function getOrderTypeLabel(type: number | null | undefined): string {
  if (type === null || type === undefined) return "Unknown";
  const labels: Record<number, string> = {
    0: "Dine-in",
    1: "Takeout",
    2: "Delivery",
    3: "Check-in",
    4: "Check-out",
  };
  return labels[type] ?? "Unknown";
}

export function getDiscountTypeLabel(type: number | null | undefined): string {
  if (type === null || type === undefined) return "None";
  const labels: Record<number, string> = {
    0: "None",
    1: "Senior",
    2: "PWD",
    3: "Promo",
  };
  return labels[type] ?? "Unknown";
}

export function getPaymentMethodLabel(method: number | null | undefined): string {
  if (method === null || method === undefined) return "Unknown";
  const labels: Record<number, string> = {
    0: "Cash",
    1: "Card",
    2: "E-Wallet",
  };
  return labels[method] ?? "Unknown";
}

export function getOrderStatusLabel(status: number | null | undefined): string {
  if (status === null || status === undefined) return "Unknown";
  const labels: Record<number, string> = {
    0: "Preparing",
    1: "Ready",
    2: "Completed",
    3: "Cancelled",
  };
  return labels[status] ?? "Unknown";
}

