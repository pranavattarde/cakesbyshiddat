import { createContext } from 'react';
import type { WebsiteSettings } from '../services/settings.service';

export interface SettingsContextValue { settings: WebsiteSettings | null; isLoading: boolean; error: Error | null; }
export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
