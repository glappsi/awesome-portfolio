export function staticImageUrl(url: string) {
  return `https://${process.env.APP_URL}${url}`;
}

export function staticImage<T extends { url: string } | null | undefined>(image: T) : T {
  if (!image) {
    return undefined as T;
  }

  return {
    ...image,
    url: staticImageUrl(image.url),
  };
}

export function staticImages<T extends { url: string } | null | undefined>(images?: T[] | null) {
  if (!images) {
    return undefined;
  }

  return images.map(staticImage);
}