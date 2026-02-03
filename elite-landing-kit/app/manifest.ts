import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EliteLanding Kit',
    short_name: 'EliteLanding',
    description: 'Enterprise landing registry with AI personalization.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1120',
    theme_color: '#0b1120',
    icons: [
      {
        src: '/svgs/wave.svg',
        sizes: '512x512',
        type: 'image/svg+xml'
      }
    ]
  };
}
