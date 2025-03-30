
/**
 * Collection of utility functions for image processing
 */

export type FilterType = 'retro' | 'vintage' | 'grainy' | 'none';

export interface ImageEffect {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  grain: number;
  vignette: boolean;
  dateStamp: boolean;
  filmBorder: boolean;
}

// Default effect presets
export const filterPresets: Record<FilterType, ImageEffect> = {
  retro: {
    brightness: 1.1,
    contrast: 1.05,
    saturation: 0.9,
    sepia: 0.15,
    grain: 0.3,
    vignette: true,
    dateStamp: true,
    filmBorder: true
  },
  vintage: {
    brightness: 0.95,
    contrast: 0.9,
    saturation: 0.8,
    sepia: 0.35,
    grain: 0.4,
    vignette: true,
    dateStamp: true,
    filmBorder: true
  },
  grainy: {
    brightness: 1.05,
    contrast: 1.1,
    saturation: 0.95,
    sepia: 0.05,
    grain: 0.5,
    vignette: true,
    dateStamp: true,
    filmBorder: true
  },
  none: {
    brightness: 1,
    contrast: 1,
    saturation: 1,
    sepia: 0,
    grain: 0,
    vignette: false,
    dateStamp: false,
    filmBorder: false
  }
};

// Format date like early 2000s digital cameras (07-14-2004)
export const formatDateStamp = (date: Date = new Date()): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}-${day}-${year}`;
};

// Generate random date between 2000-2010 for nostalgic effect
export const generateRandomEarly2000sDate = (): Date => {
  const start = new Date(2000, 0, 1).getTime();
  const end = new Date(2010, 11, 31).getTime();
  const randomTimestamp = start + Math.random() * (end - start);
  return new Date(randomTimestamp);
};

// Apply filter to image element with CSS filters
export const applyFilterStyles = (effect: ImageEffect): string => {
  return `brightness(${effect.brightness}) contrast(${effect.contrast}) saturate(${effect.saturation}) sepia(${effect.sepia})`;
};
