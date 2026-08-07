import { api } from './api';

export interface MediaAsset { id: string; secureUrl: string; alt: string; }
export interface CakeCategory { id: string; name: string; slug: string; description: string; coverMedia: MediaAsset | null; }
export interface Cake { id: string; name: string; slug: string; shortDescription: string; description: string; featured: boolean; bestSeller: boolean; newArrival: boolean; trending: boolean; seoTitle: string; seoDescription: string; coverMedia: MediaAsset; category: CakeCategory; prices: Array<{ id: string; weight: string; price: string | number; displayOrder: number }>; flavors: Array<{ id: string; name: string; displayOrder: number }>; gallery: Array<{ mediaId: string; media: MediaAsset; displayOrder: number }>; }
export interface PageMeta { page: number; limit: number; total: number; totalPages: number; }
export interface CakeQuery { page?: number; limit?: number; search?: string; category?: string; featured?: boolean; bestSeller?: boolean; trending?: boolean; newArrival?: boolean; sort?: 'displayOrder' | 'createdAt' | 'name'; sortOrder?: 'asc' | 'desc'; }
export interface Paginated<T> {
    items: T[];
    pagination: PageMeta;
    total: number;
}
export const cakesService = { categories: async (): Promise<CakeCategory[]> => (await api.get<CakeCategory[]>('/cakes/categories')).data, list: async (query: CakeQuery): Promise<Paginated<Cake>> => (await api.get<Paginated<Cake>>('/cakes', { params: query })).data, get: async (slug: string): Promise<Cake> => (await api.get<Cake>(`/cakes/${slug}`)).data };
