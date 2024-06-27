export interface Articles {
  id: string;
  slug: string;
  alternative_slugs?: string[];
  created_at: Date;
  updated_at: Date;
}
export interface Item {
  id: number;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  likes: number;
  user: { name: string };
}
