export interface ShelfBook {
  title: string;
  author: string;
  dewey: string;
  color: string;
}

export interface ShelfSection {
  id: string;
  name: string;
  category: string;
  capacity: number;
  used: number;
  x: number;
  y: number;
  width: number;
  height: number;
  books: ShelfBook[];
}

export type MapViewMode = "map" | "shelf";
