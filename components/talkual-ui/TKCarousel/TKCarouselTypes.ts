export interface CarouselSlideObject {
  index: number;
  value?: string;
  description_ca?: string;
  description_es?: string;
  image?: string;
  authorPhoto?: string;
  name?: string;
  title?: string;
  description?: string;
  stars?: number;
  relativeTime?: string;
  rating?: number;
  [key: string]: number | string | undefined;
}
