export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  material?: string;
  specifications?: {
    metal?: string;
    purity?: string;
    weight?: string;
    stone?: string;
  };
}

export type Category = 'Ring' | 'Necklace' | 'Bracelet' | 'Earrings' | 'Pendant' | 'All';

export type SortOption = 'newest' | 'price-low' | 'price-high';
