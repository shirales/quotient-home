import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quotient',
    short_name: 'Quotient',
    description:
      'AI superforecasting platform for prediction market traders.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161514',
    theme_color: '#161514',
    icons: [
      {
        src: '/favicons/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
