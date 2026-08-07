import { api } from './api';
import type { MediaItem } from './media.service';
export interface ContentItem {
    id?: string;

    title: string;
    subtitle: string;
    description: string;

    mediaId?: string;

    link?: string;

    displayOrder: number;

    active: boolean;

    createdAt?: string;
    updatedAt?: string;
}
export interface ContentSection {
    id?: string;

    type:
        | 'hero'
        | 'text'
        | 'cards'
        | 'gallery'
        | 'founders'
        | 'timeline'
        | 'cta'
        | 'faq';

    title: string;
    subtitle: string;
    description: string;

    mediaId?: string;

    buttonText?: string;
    buttonUrl?: string;

    displayOrder: number;

    active: boolean;

    items: ContentItem[];

    createdAt?: string;
    updatedAt?: string;
}
export interface ContentPage {
    id: string;

    slug: string;

    title: string;

    subtitle: string;

    heroMediaId: string | null;

    heroMedia: MediaItem | null;

    seoTitle: string;

    seoDescription: string;

    published: boolean;

    displayOrder: number;

    sections: ContentSection[];

    createdAt?: string;
    updatedAt?: string;
}
export type ContentPageInput = Omit<
  ContentPage,
  'id' | 'createdAt' | 'updatedAt'
>;

type ContentPageRequest = {
  slug: string;
  title: string;
  subtitle: string;
  heroMediaId?: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  displayOrder: number;
  sections: Array<{ type: ContentSection['type']; title: string; subtitle: string; description: string; mediaId?: string; buttonText?: string; buttonUrl?: string; displayOrder: number; active: boolean; items: Array<{ title: string; subtitle: string; description: string; mediaId?: string; link?: string; displayOrder: number; active: boolean }> }>;
};

const mediaId = (id?: string | null): string | undefined => id || undefined;

const toContentPageRequest = (input: ContentPageInput): ContentPageRequest => ({
  slug: input.slug,
  title: input.title,
  subtitle: input.subtitle,
  heroMediaId: mediaId(input.heroMediaId),
  seoTitle: input.seoTitle,
  seoDescription: input.seoDescription,
  published: input.published,
  displayOrder: input.displayOrder,
  sections: input.sections.map((section) => ({
    type: section.type, title: section.title, subtitle: section.subtitle, description: section.description,
    mediaId: mediaId(section.mediaId), buttonText: section.buttonText, buttonUrl: section.buttonUrl,
    displayOrder: section.displayOrder, active: section.active,
    items: section.items.map((item) => ({ title: item.title, subtitle: item.subtitle, description: item.description, mediaId: mediaId(item.mediaId), link: item.link, displayOrder: item.displayOrder, active: item.active })),
  })),
});

export const contentPagesService = {
  list: async (): Promise<ContentPage[]> => (await api.get<ContentPage[]>('/content')).data,
  create: async (input: ContentPageInput): Promise<ContentPage> => (await api.post<ContentPage>('/content', toContentPageRequest(input))).data,
  update: async ({ id, input }: { id: string; input: ContentPageInput }): Promise<ContentPage> => (await api.patch<ContentPage>(`/content/${id}`, toContentPageRequest(input))).data,
  remove: async (id: string): Promise<void> => { await api.delete(`/content/${id}`); },
};
