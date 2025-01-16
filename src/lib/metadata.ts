import { site } from '@/config/site';
import type { Metadata } from 'next/types';

export const baseUrl =
    process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_SITE_URL
        ? new URL('http://localhost:3001')
        : new URL(process.env.NEXT_PUBLIC_SITE_URL);

export function createMetadata(override: Metadata): Metadata {
    return {
        ...override,
        metadataBase: baseUrl,
        title: override.title ?? site.name,
        description: override.description ?? site.description,
        openGraph: {
            title: override.title ?? site.name,
            description: override.description ?? site.description,
            url: baseUrl,
            images: '/banner.png',
            siteName: 'Pry',
            ...override.openGraph,
        },
        twitter: {
            card: 'summary_large_image',
            creator: '@fiqryx',
            title: override.title ?? site.name,
            description: override.description ?? site.description,
            images: '/banner.png',
            ...override.twitter,
        },
    };
}
