export function getFullImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const baseUrl = import.meta.env.APP_URL || window.location.origin;

  if (path.startsWith('storage/') || path.startsWith('images/')) {
    return `${baseUrl}/${path}`;
  }

  return `${baseUrl}/storage/${path}`;
}
