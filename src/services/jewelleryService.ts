import { Product, Category } from '../types';

const ACCESS_KEY = "L6TUqD2rqlKaEXYVVwh9ku4yNJFvT6UkE7R21lYK0pc";

const JEWELLERY_KEYWORDS = [
  'diamond',
  'gold',
  'ruby',
  'emerald',
  'sapphire',
  'platinum',
  'pearl',
  'luxury'
];

const CATEGORIES: Category[] = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Pendant'];

export const fetchJewellery = async (
  query: string,
  category: Category = 'All'
): Promise<Product[]> => {

  const searchTerm = query ? query.toLowerCase() : 'jewelry';

  // Better search query for Unsplash
  const searchQuery =
    category === "All"
      ? `${searchTerm} jewelry product ring necklace bracelet earrings pendant gemstone`
      : `${searchTerm} ${category.toLowerCase()} jewelry product`;

  try {

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=12&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`
        }
      }
    );

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error("Unsplash error:", data);
      return [];
    }

    const products: Product[] = data.results.map((photo: any, index: number) => {

      // If "All" is selected we keep generic category
      const finalCategory = category === "All" ? "Jewelry" : category;

      const material =
        JEWELLERY_KEYWORDS[Math.floor(Math.random() * JEWELLERY_KEYWORDS.length)];

      const title =
        category === "All"
          ? `${material} Jewelry`
          : `${material} ${finalCategory}`;

      return {
        id: `prod-${index}-${Date.now()}`,
        title: title.charAt(0).toUpperCase() + title.slice(1),
        price: Math.floor(Math.random() * 200000) + 50000,
        category: finalCategory,
        image: photo.urls.regular,
        description: `Luxury handcrafted ${material} jewellery piece.`
      };
    });

    return products;

  } catch (error) {

    console.error("API fetch error:", error);

    // fallback mock data if API fails
    return Array.from({ length: 12 }).map((_, index) => ({
      id: `fallback-${index}`,
      title: "Luxury Jewelry",
      price: Math.floor(Math.random() * 200000) + 50000,
      category: "Jewelry",
      image: `https://picsum.photos/seed/jewelry-${index}/800/1000`,
      description: "Luxury handcrafted jewellery piece."
    }));

  }
};