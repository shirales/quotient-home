import type { Metadata } from 'next'
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_DESCRIPTION,
  SITE_URL,
} from './site'

interface PageMetadataOptions {
  title: string
  description?: string
  ogDescription?: string
  ogImage?: string
  path?: string
  noindex?: boolean
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE_PATH,
  path,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const ogDesc = ogDescription ?? description

  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title,
      description: ogDesc,
      siteName: SITE_NAME,
      type: 'website',
      ...(path ? { url: `${SITE_URL}${path === '/' ? '' : path}` } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} social sharing image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@QuotientHQ',
      title,
      description: ogDesc,
      images: [ogImage],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}
