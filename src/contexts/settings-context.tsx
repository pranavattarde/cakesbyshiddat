import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settingsService } from '../services/settings.service';
import { SettingsContext } from './settings-context-value';

export function SettingsProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const query = useQuery({ queryKey: ['settings'], queryFn: settingsService.get, staleTime: 60_000, retry: 2, refetchOnWindowFocus: true });
  return <SettingsContext.Provider value={{ settings: query.data ?? null, isLoading: query.isLoading, error: query.error instanceof Error ? query.error : null }}>{children}</SettingsContext.Provider>;
}
