import { useQuery } from '@tanstack/react-query';
import { cakesService, type CakeQuery } from '../services/cakes.service';
export function useCakeCategories() { return useQuery({ queryKey: ['cake-categories'], queryFn: cakesService.categories, staleTime: 60_000 }); }
export function useCakes(query: CakeQuery) { return useQuery({ queryKey: ['cakes', query], queryFn: () => cakesService.list(query) }); }
export function useCakeBySlug(slug: string | undefined) { return useQuery({ queryKey: ['cake', slug], queryFn: () => cakesService.get(slug ?? ''), enabled: Boolean(slug) }); }
