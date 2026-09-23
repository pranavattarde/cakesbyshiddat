import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settingsService, type WebsiteSettings } from '../services/settings.service';
import { SettingsContext } from './settings-context-value';

export const DEFAULT_SETTINGS: WebsiteSettings = {
  businessName: 'Cakes By Shiddat',
  tagline: 'Luxury Cakes & Celebrations',
  description: 'Custom handcrafted cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.',
  phone: '+91 9999999999',
  whatsapp: '+91 9999999999',
  email: 'hello@cakesbyshiddat.com',
  address: 'Kurukshetra, Haryana',
  instagram: 'https://www.instagram.com',
  facebook: '',
  youtube: '',
  heroTitle: 'Luxury Cakes & Celebrations',
  heroSubtitle: 'Custom handcrafted cakes and beautifully planned celebrations by Cakes By Shiddat in Haryana.',
  heroButtonText: 'Book Consultation',
  footerText: '© 2026 Cakes By Shiddat. All rights reserved.',
  googleMapsUrl: '',
  seoTitle: 'Luxury Cakes & Celebrations',
  seoDescription: 'Handcrafted luxury cakes and event celebrations in Haryana.',
  logoUrl: '',
  faviconUrl: '',
};

export function SettingsProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const query = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.get,
    staleTime: 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const activeSettings = query.data || DEFAULT_SETTINGS;

  return (
    <SettingsContext.Provider
      value={{
        settings: activeSettings,
        isLoading: false,
        error: null,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
