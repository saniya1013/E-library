export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genre: string[];
  rating: number;
  publishedYear: number;
  pages: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  favorites: string[]; // Array of book IDs
  readingHistory: string[]; // Array of book IDs
  preferences: string[]; // Genres
  searchHistory: string[]; // Search queries
}

export interface Recommendation {
  bookId: string;
  reason: string;
}
