import { useQuery } from '@tanstack/react-query'; import { contentService } from '../services/content.service';
export function useContent(slug: string) { return useQuery({ queryKey: ['content', slug], queryFn: () => contentService.get(slug), staleTime: 0, refetchOnMount: 'always', refetchOnWindowFocus: true }); }
