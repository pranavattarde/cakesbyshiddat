import { api } from './api';
export interface WebsiteSettings {
  id: string;
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  footerText: string;
  googleMapsUrl: string;
  seoTitle: string;
  seoDescription: string;
  logoUrl: string;
  faviconUrl: string;
  updatedAt: string;
}

export type UpdateWebsiteSettings = Omit<WebsiteSettings, 'id' | 'updatedAt'>;

export const settingsService = {
  get: async (): Promise<WebsiteSettings> => (await api.get<WebsiteSettings>('/settings')).data,
  update: async (settings: UpdateWebsiteSettings): Promise<WebsiteSettings> =>
    (await api.patch<WebsiteSettings>('/settings', settings)).data,
};
