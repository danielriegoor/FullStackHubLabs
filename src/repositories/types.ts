import React from 'react';

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  source: string; // The website this was aggregated from
  publishedAt: string;
  category: string;
  isAiGenerated?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  slug: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ViewMode {
  Grid = 'GRID',
  List = 'LIST',
}
export interface ScraperSelectors {
  container: string;
  title: string;
  link: string;
  thumbnail: string;
  duration: string;
}

export interface ScraperSettings {
  baseUrl: string;
  categoryPath: string;
  linkIncludes: string[];
  linkExcludes: string[]; // Mantendo sua lógica de filtro
  // Seletores individuais para a lógica do Puppeteer evaluate
  selectors: ScraperSelectors;
  // Seletores em array para lógica de fallback/múltiplas tentativas
  titleSelectors: string[];
  thumbSelectors: string[];
  durationSelectors: string[];
}
export type ScraperDictionary = Record<
  string,
  ScraperSettings
>;
