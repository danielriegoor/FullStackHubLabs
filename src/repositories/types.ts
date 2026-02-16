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
  List = 'LIST'
}