/**
 * Utility functions for media URL parsing, validation, and filtering
 * in Jonh Paul Villamora's portfolio.
 */

export interface VideoSourceInfo {
  type: 'direct' | 'youtube' | 'vimeo' | 'external';
  embedUrl: string;
  sourceUrl: string;
  isEmbeddable: boolean;
}

export interface PortfolioItem {
  id: string;
  type: 'video' | 'graphic';
  title: string;
  category: string;
  client?: string;
  year: string;
  tools: string[];
  description: string;
  mediaUrl: string; // Direct file URL, blob URL, or embed link
  thumbnailUrl?: string;
  aspectRatio?: '16:9' | '9:16' | '4:3' | '1:1';
  duration?: string; // For videos e.g. "0:45", "2:15"
  featured?: boolean;
}

/**
 * Resolves various video URL formats into standard embed or direct media objects.
 */
export function parseVideoSource(rawUrl: string): VideoSourceInfo {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      type: 'direct',
      embedUrl: '',
      sourceUrl: '',
      isEmbeddable: false,
    };
  }

  const trimmed = rawUrl.trim();

  // YouTube standard or short links
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const ytMatch = trimmed.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      sourceUrl: trimmed,
      isEmbeddable: true,
    };
  }

  // Vimeo links
  const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/;
  const vimeoMatch = trimmed.match(vimeoRegex);
  if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[1])) {
    const vimeoId = vimeoMatch[3] || vimeoMatch[1];
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
      sourceUrl: trimmed,
      isEmbeddable: true,
    };
  }

  // Google Drive video links
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    const fileId = gdriveMatch[1];
    return {
      type: 'vimeo', // Treated as iframe embed
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      sourceUrl: trimmed,
      isEmbeddable: true,
    };
  }

  // Direct video file (mp4, webm, ogg, mov) or blob/local URL
  const isDirect = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed) || trimmed.startsWith('blob:') || trimmed.startsWith('data:video');
  if (isDirect) {
    return {
      type: 'direct',
      embedUrl: trimmed,
      sourceUrl: trimmed,
      isEmbeddable: true,
    };
  }

  // Fallback to external or standard iframe source
  return {
    type: 'external',
    embedUrl: trimmed,
    sourceUrl: trimmed,
    isEmbeddable: Boolean(trimmed.startsWith('http://') || trimmed.startsWith('https://')),
  };
}

/**
 * Validates a portfolio submission
 */
export function validatePortfolioItem(item: Partial<PortfolioItem>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!item.title || item.title.trim().length === 0) {
    errors.push('Title is required.');
  }
  if (!item.type || !['video', 'graphic'].includes(item.type)) {
    errors.push('Item type must be either "video" or "graphic".');
  }
  if (!item.category || item.category.trim().length === 0) {
    errors.push('Category is required.');
  }
  if (!item.mediaUrl || item.mediaUrl.trim().length === 0) {
    errors.push('Media URL or uploaded file is required.');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Filters and searches portfolio items
 */
export function filterPortfolioItems(
  items: PortfolioItem[],
  filterCategory: string,
  searchQuery: string
): PortfolioItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // Category filter check
    const matchesCategory =
      filterCategory === 'all' ||
      item.category.toLowerCase() === filterCategory.toLowerCase();

    if (!matchesCategory) return false;

    // Search query check
    if (!query) return true;

    const inTitle = item.title.toLowerCase().includes(query);
    const inDesc = item.description.toLowerCase().includes(query);
    const inClient = item.client?.toLowerCase().includes(query) ?? false;
    const inTools = item.tools.some((t) => t.toLowerCase().includes(query));

    return inTitle || inDesc || inClient || inTools;
  });
}
