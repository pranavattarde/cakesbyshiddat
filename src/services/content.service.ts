import { api } from './api';
export interface ContentMedia { id: string; secureUrl: string; alt: string; }
export interface ContentItem { id: string; title: string; subtitle: string; description: string; link: string | null; displayOrder: number; media: ContentMedia | null; }
export interface ContentSection { id: string; type: string; title: string; subtitle: string; description: string; buttonText: string | null; buttonUrl: string | null; displayOrder: number; media: ContentMedia | null; items: ContentItem[]; }
export interface ContentPage { id: string; slug: string; title: string; subtitle: string; seoTitle: string; seoDescription: string; heroMedia: ContentMedia | null; sections: ContentSection[]; }
export const contentService = { get: async (slug: string): Promise<ContentPage> => (await api.get<ContentPage>(`/content/${slug}`)).data };
