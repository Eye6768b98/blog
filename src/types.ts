export type PageRoute =
  | 'homepage'
  | 'blog'
  | 'about'
  | 'bio'
  | 'find-us'
  | 'shop'
  | 'ai-songs'
  | 'fan-photos'
  | 'art-gallery'
  | 'new-release'
  | 'now-playing';

export type BlogCategory =
  | 'All'
  | 'Songwriting'
  | 'Behind the EP'
  | 'Studio Gear'
  | 'Tour Diary';

export type IllustrationMotif =
  | 'music-box'
  | 'upright-piano'
  | 'candle-tour'
  | 'palette-zine'
  | 'cassette-mix'
  | 'lavender-vinyl'
  | 'witch-hat'
  | 'potion-tea'
  | 'crescent-moon';

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  body: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: Exclude<BlogCategory, 'All'>;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  motif: IllustrationMotif;
  featured?: boolean;
  linkedTrackId?: string;
  pullQuote: string;
  paragraphs: string[];
  comments: BlogComment[];
}

export interface Track {
  id: string;
  title: string;
  collection: 'Spooky Lullaby EP' | 'Spooky Melodies Mix';
  duration: string;
  durationSec: number;
  bpm: number;
  notes: number[];
  story: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'Vinyl' | 'Merch' | 'Potions';
  price: number;
  description: string;
  detail: string;
  motif: IllustrationMotif;
}

export interface EventItem {
  id: string;
  date: string;
  city: string;
  venue: string;
  notes: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  kind: 'fan' | 'art';
  date: string;
  credit: string;
  caption: string;
  specs: string;
  motif: IllustrationMotif;
  accentBg: string;
}

export interface ImageHotspot {
  id: string;
  number: number;
  title: string;
  areaLabel: string;
  summary: string;
  designDetail: string;
  relatedPostId: string;
  targetRoute: PageRoute;
  bounds: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  shapeClass: string;
}

