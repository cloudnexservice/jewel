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

/**
 * Extract requested material from search term
 */
const extractMaterialFromSearch = (searchTerm: string): string | null => {
  const term = searchTerm.toLowerCase();
  for (const [material, keywords] of Object.entries(MATERIAL_KEYWORDS)) {
    if (keywords.some(kw => term.includes(kw))) {
      return material;
    }
  }
  return null;
};

const CATEGORIES: Category[] = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Pendant'];

const CATEGORY_KEYWORDS = {
  'Ring': ['ring', 'rings'],
  'Necklace': ['necklace', 'necklaces', 'chain', 'chains'],
  'Bracelet': ['bracelet', 'bracelets', 'bangle', 'bangles'],
  'Earrings': ['earring', 'earrings', 'studs', 'hoops'],
  'Pendant': ['pendant', 'pendants', 'locket', 'lockets']
};

/**
 * Negative keywords to exclude - if these appear, exclude the item
 */
const NEGATIVE_KEYWORDS: Record<string, string[]> = {
  'Earrings': ['hand', 'woman wearing', 'holding', 'ring finger', 'finger', 'necklace', 'bracelet', 'ring on', 'hand with'],
  'Ring': ['earring', 'necklace', 'bracelet', 'pendant', 'chain', 'neck'],
  'Necklace': ['earring', 'ring', 'finger', 'hand with', 'on hand', 'bracelet on'],
  'Bracelet': ['earring', 'ring', 'finger', 'necklace', 'choker', 'neck'],
  'Pendant': ['earring', 'ring finger', 'bracelet on', 'hand wearing']
};

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
    let title = description.substring(0, 60).trim();
    // Capitalize first letter
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return title || `${category} Piece ${index + 1}`;
  }
  
  // Fallback format with proper naming
  return category === 'All' ? `Fine Jewelry Piece ${index + 1}` : `${category} Piece ${index + 1}`;
};

/**
 * Extract category from search term if mentioned
 */
const extractCategoryFromSearch = (searchTerm: string): Category | null => {
  const term = searchTerm.toLowerCase();
  // Check more specific/complete words first to avoid substring matches
  // For example, check "earring" before "ring" since "earring" contains "ring"
  if (term.includes('earring')) return 'Earrings';
  if (term.includes('pendant')) return 'Pendant';
  if (term.includes('necklace')) return 'Necklace';
  if (term.includes('bracelet')) return 'Bracelet';
  if (term.includes('ring')) return 'Ring';
  return null;
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
  
  // If user mentions a specific jewelry type in search, use it
  const impliedCategory = extractCategoryFromSearch(searchTerm);
  const effectiveCategory = impliedCategory || category;
  
  // Extract material if mentioned in search
  const requestedMaterial = extractMaterialFromSearch(searchTerm);
  
  const searchQuery = buildSearchQuery(searchTerm, effectiveCategory);

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=30&page=${page}&orientation=squarish`,
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

    const products: Product[] = data.results
      .map((photo: any, index: number) => {
        const photoDescription = photo.alt_description || photo.description || '';
        const material = extractMaterial(photoDescription);
        const title = generateTitle(photoDescription, effectiveCategory, index);
        const price = determinePriceByMaterial(photoDescription);

        return {
          id: photo.id,
          title,
          price,
          category: effectiveCategory === 'All' ? 'Jewelry' : effectiveCategory,
          image: photo.urls.regular,
          description: `Luxury handcrafted ${material.toLowerCase()} jewellery piece.`,
          _originalDesc: photoDescription,
          _categoryMatch: 0
        } as any;
      })
      .map(product => {
        // Calculate category match score
        if (effectiveCategory !== 'All') {
          const originalDesc = product._originalDesc.toLowerCase();
          const titleLower = product.title.toLowerCase();
          const categoryKeywords = CATEGORY_KEYWORDS[effectiveCategory] || [];
          
          // Count how many category keywords match
          const matchCount = categoryKeywords.filter(
            kw => originalDesc.includes(kw) || titleLower.includes(kw)
          ).length;
          
          // Check for conflicting categories (keywords from other categories)
          let conflictScore = 0;
          for (const [otherCat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
            if (otherCat !== effectiveCategory) {
              const conflictMatches = keywords.filter(
                kw => originalDesc.includes(kw)
              ).length;
              conflictScore += conflictMatches;
            }
          }
          
          product._categoryMatch = matchCount - (conflictScore * 0.5);
        }
        
        return product;
      })
      .filter(product => {
        // For specific categories, require strong match
        if (effectiveCategory !== 'All') {
          const originalDesc = product._originalDesc.toLowerCase();
          const categoryKeywords = CATEGORY_KEYWORDS[effectiveCategory] || [];
          const negativeKeywords = NEGATIVE_KEYWORDS[effectiveCategory] || [];
          
          // Must have at least one matching category keyword
          const hasMatch = categoryKeywords.some(kw => originalDesc.includes(kw));
          
          if (!hasMatch) {
            return false; // No matching keywords, exclude
          }
          
          // Exclude if negative keywords found (conflicting types)
          const hasNegative = negativeKeywords.some(kw => originalDesc.includes(kw));
          if (hasNegative) {
            return false;
          }
          
          // If a specific material was requested, filter by material
          if (requestedMaterial) {
            const materialKeywords = MATERIAL_KEYWORDS[requestedMaterial] || [];
            const hasMaterial = materialKeywords.some(kw => originalDesc.includes(kw));
            if (!hasMaterial) {
              return false; // Material not found, exclude
            }
          }
          
          return true;
        }
        
        // For 'All' category, still filter by material if requested
        if (requestedMaterial) {
          const originalDesc = product._originalDesc.toLowerCase();
          const materialKeywords = MATERIAL_KEYWORDS[requestedMaterial] || [];
          const hasMaterial = materialKeywords.some(kw => originalDesc.includes(kw));
          if (!hasMaterial) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => (b._categoryMatch || 0) - (a._categoryMatch || 0))
      .slice(0, 12)
      .map(({ _originalDesc, _categoryMatch, ...product }) => product);

    return products;
  } catch (error) {
    console.error('API fetch error:', error);

    // Fallback mock data if API fails
    return Array.from({ length: 12 }).map((_, index) => ({
      id: `fallback-${index}-${Date.now()}`,
      title:
        effectiveCategory === 'All'
          ? `Fine Jewelry Piece ${index + 1}`
          : `${effectiveCategory} Piece ${index + 1}`,
      price: Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000,
      category: effectiveCategory === 'All' ? 'Jewelry' : effectiveCategory,
      image: `https://picsum.photos/seed/jewelry-${index}-${page}/800/1000`,
      description: 'Luxury handcrafted jewellery piece.'
    }));
  }
};