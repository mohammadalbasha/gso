export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface FilterState {
  category: string;
  sort: string;
}
