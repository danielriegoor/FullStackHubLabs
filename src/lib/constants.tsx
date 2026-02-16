import React from 'react';
import {
  VideoItem,
  Category,
} from '@/models';
import {
  Gamepad2,
  Cpu,
  Leaf,
  Globe,
  Zap,
  Video,
  MonitorPlay,
} from 'lucide-react';

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Recomendados',
    slug: 'recommended',
    icon: React.createElement(Zap, {
      className: 'w-4 h-4',
    }),
  },
  {
    id: '2',
    name: 'Tecnologia',
    slug: 'tech',
    icon: React.createElement(Cpu, {
      className: 'w-4 h-4',
    }),
  },
  {
    id: '3',
    name: 'Gaming',
    slug: 'gaming',
    icon: React.createElement(
      Gamepad2,
      { className: 'w-4 h-4' },
    ),
  },
  {
    id: '4',
    name: 'Natureza',
    slug: 'nature',
    icon: React.createElement(Leaf, {
      className: 'w-4 h-4',
    }),
  },
  {
    id: '5',
    name: 'Notícias',
    slug: 'news',
    icon: React.createElement(Globe, {
      className: 'w-4 h-4',
    }),
  },
  {
    id: '6',
    name: 'Cinema',
    slug: 'movies',
    icon: React.createElement(Video, {
      className: 'w-4 h-4',
    }),
  },
  {
    id: '7',
    name: 'Tutoriais',
    slug: 'tutorials',
    icon: React.createElement(
      MonitorPlay,
      { className: 'w-4 h-4' },
    ),
  },
];
const getThumb = (
  id: number,
  type: string,
) =>
  `https://picsum.photos/seed/${type}${id}/400/225`;

export const MOCK_VIDEOS: VideoItem[] =
  [
    {
      id: '101',
      title:
        'Review Exclusivo: O Futuro dos Processadores Quânticos',
      thumbnail: getThumb(101, 'tech'),
      width: 400,
      height: 225,
      duration: '12:45',
      views: '1.2M',
      source: 'TechDaily',
      publishedAt: '2 horas atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'review-exclusivo-o-futuro-dos-processadores-quanticos',
    },
    {
      id: '102',
      title:
        'Gameplay: Speedrun de Elden Ring sem danos',
      thumbnail: getThumb(102, 'game'),
      width: 400,
      height: 225,
      duration: '45:20',
      views: '850K',
      source: 'TwitchClips',
      publishedAt: '5 horas atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'gameplay-speedrun-de-elden-ring-sem-danos',
    },
    {
      id: '103',
      title:
        '4K Drone Footage: Floresta Amazônica ao Amanhecer',
      thumbnail: getThumb(
        103,
        'nature',
      ),
      width: 400,
      height: 225,
      duration: '08:12',
      views: '2.4M',
      source: 'NatGeoHub',
      publishedAt: '1 dia atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: '4k-drone-footage-floresta-amazonica-ao-amanhecer',
    },
    {
      id: '104',
      title:
        'Como construir uma API Rest com Node.js',
      thumbnail: getThumb(104, 'code'),
      width: 400,
      height: 225,
      duration: '22:15',
      views: '150K',
      source: 'DevCommunity',
      publishedAt: '3 dias atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'como-construir-uma-api-rest-com-node-js',
    },
    {
      id: '105',
      title:
        'Highlights da Final do Campeonato Mundial',
      thumbnail: getThumb(105, 'sport'),
      width: 400,
      height: 225,
      duration: '10:05',
      views: '5.1M',
      source: 'ESPN Aggr',
      publishedAt: '12 horas atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'highlights-da-final-do-campeonato-mundial',
    },
    {
      id: '106',
      title:
        'Setup Minimalista para Desenvolvedores 2025',
      thumbnail: getThumb(106, 'desk'),
      width: 400,
      height: 225,
      duration: '15:30',
      views: '300K',
      source: 'TechDaily',
      publishedAt: '1 semana atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'setup-minimalista-para-desenvolvedores-2025',
    },
    {
      id: '107',
      title:
        'Os 10 Melhores RPGs Indie do Ano',
      thumbnail: getThumb(107, 'pixel'),
      width: 400,
      height: 225,
      duration: '18:45',
      views: '92K',
      source: 'IndieCorner',
      publishedAt: '2 dias atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'os-10-melhores-rpgs-indie-do-ano',
    },
    {
      id: '108',
      title:
        'Documentário: A Vida no Fundo do Oceano',
      thumbnail: getThumb(108, 'ocean'),
      width: 400,
      height: 225,
      duration: '55:00',
      views: '8.5M',
      source: 'DiscoveryWeb',
      publishedAt: '1 mês atrás',
      categories: [
        {
          categoryId: 'tech',
          category: {
            id: 'tech',
            name: 'Tech',
            slug: 'tech',
          },
        },
      ],
      slug: 'documentario-a-vida-no-fundo-do-oceano',
    },
  ];
