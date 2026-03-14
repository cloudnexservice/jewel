import { Product, Category } from '../types';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.warn(
    'VITE_UNSPLASH_ACCESS_KEY is not set in environment variables. Please add it to your .env file.'
  );
}

const MATERIAL_KEYWORDS = {
  diamond: ['diamond'],
  platinum: ['platinum'],
  gold: ['gold'],
  ruby: ['ruby'],
  emerald: ['emerald'],
  sapphire: ['sapphire'],
  pearl: ['pearl'],
  silver: ['silver']
};

const CATEGORIES: Category[] = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Pendant'];

/**
 * Determine price range based on material found in description
 */
const determinePriceByMaterial = (description: string): number => {
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes('diamond') || lowerDesc.includes('platinum')) {
    // diamond/platinum → 150000–500000
    return Math.floor(Math.random() * (500000 - 150000 + 1)) + 150000;
  } else if (
    lowerDesc.includes('gold') ||
    lowerDesc.includes('ruby') ||
    lowerDesc.includes('emerald') ||
    lowerDesc.includes('sapphire')
  ) {
    // gold/ruby/emerald/sapphire → 80000–200000
    return Math.floor(Math.random() * (200000 - 80000 + 1)) + 80000;
  } else if (lowerDesc.includes('silver') || lowerDesc.includes('pearl')) {
    // silver/pearl → 20000–80000
    return Math.floor(Math.random() * (80000 - 20000 + 1)) + 20000;
  } else {
    // default → 50000–150000
    return Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000;
  }
};

/**
 * Extract primary material from description
 */
const extractMaterial = (description: string): string => {
  if (!description) return 'Jewelry';
  
  const lowerDesc = description.toLowerCase();
  for (const material of Object.keys(MATERIAL_KEYWORDS)) {
    if (lowerDesc.includes(material)) {
      return material.charAt(0).toUpperCase() + material.slice(1);
    }
  }
  return 'Jewelry';
};

/**
 * Generate title from photo description or fallback format
 */
const generateTitle = (
  description: string | null | undefined,
  category: Category,
  index: number
): string => {
  if (description && description.trim().length > 0) {
    // Use the alt description from Unsplash, truncated to reasonable length
    return description.substring(0, 80);
  }
  
  // Fallback format
  return category === 'All' ? `Jewelry Piece ${index + 1}` : `${category} Piece ${index + 1}`;
};

/**
 * Build focused search query without diluting keywords
 */
const buildSearchQuery = (searchTerm: string, category: Category): string => {
  if (category === 'All') {
    return `${searchTerm} jewelry`;
  }
  return `${searchTerm} ${category.toLowerCase()} jewelry`;
};

export const fetchJewellery = async (
  query: string,
  category: Category = 'All',
  page: number = 1
): Promise<Product[]> => {
  const searchTerm = query?.trim() || 'jewelry';
  const searchQuery = buildSearchQuery(searchTerm, category);

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=12&page=${page}&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error('Unsplash error:', data);
      return [];
    }

    const products: Product[] = data.results.map((photo: any, index: number) => {
      const photoDescription = photo.alt_description || photo.description || '';
      const material = extractMaterial(photoDescription);
      const title = generateTitle(photoDescription, category, index);
      const price = determinePriceByMaterial(photoDescription);

      return {
        id: photo.id, // Stable ID from Unsplash
        title,
        price,
        category: category === 'All' ? 'Jewelry' : category,
        image: photo.urls.regular,
        description: `Luxury handcrafted ${material.toLowerCase()} jewellery piece.`
      };
    });

    return products;
  } catch (error) {
    console.error('API fetch error:', error);

    // Fallback mock data if API fails
    return Array.from({ length: 12 }).map((_, index) => ({
      id: `fallback-${index}-${Date.now()}`,
      title:
        category === 'All'
          ? `Jewelry Piece ${index + 1}`
          : `${category} Piece ${index + 1}`,
      price: Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000,
      category: category === 'All' ? 'Jewelry' : category,
      image: `https://picsum.photos/seed/jewelry-${index}-${page}/800/1000`,
      description: 'Luxury handcrafted jewellery piece.'
    }));
  }
};