export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  image: string;
  inventory: number;
  expectedDate?: string; // Added for pre-order expected date
}

export type Category = "Ruhi Book (EN)" | "Ruhi Book (BM)";

export interface Order {
  id: string;
  items: Array<Book & { quantity: number; isPreOrder?: boolean }>;
  total: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  attachedImages?: string[];
}
