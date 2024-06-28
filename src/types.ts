export interface Item {
  id: number;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  likes: number;
  user: { name: string };
  image?: string | null;
}
