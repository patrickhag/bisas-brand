export type PortfolioProject = {
  id: string;
  name: string;
  images: string[];
  category: string;
  status: "published" | "draft";
  tags: string[];
  description: string;
  cost: string;
  address: string;
  isFeatured: boolean;
};
