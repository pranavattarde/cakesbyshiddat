import { api } from './api';
import type { MediaItem } from './media.service';

export type EggOption = 'EGG' | 'EGGLESS' | 'BOTH';
export type CakeStatus = 'ACTIVE' | 'INACTIVE' | 'SEASONAL' | 'MADE_TO_ORDER';
export interface PageMeta { page: number; limit: number; total: number; totalPages: number; }
export interface CakeCategory { id: string; name: string; slug: string; description: string; displayOrder: number; active: boolean; coverMediaId: string | null; coverMedia: MediaItem | null; createdAt: string; updatedAt: string; _count: { cakes: number }; }
export interface CakeCategoryInput { name: string; slug: string; description?: string; displayOrder?: number; active?: boolean; coverMediaId?: string; }
export interface CakePrice { id?: string; weight: string; price: number | string; displayOrder: number; }
export interface CakeFlavor { id?: string; name: string; displayOrder: number; }
export interface CakeGalleryItem { cakeId?: string; mediaId: string; displayOrder: number; media: MediaItem; }
export interface Cake { id: string; categoryId: string; category: CakeCategory; name: string; slug: string; shortDescription: string; description: string; featured: boolean; bestSeller: boolean; newArrival: boolean; trending: boolean; eggOption: EggOption; status: CakeStatus; displayOrder: number; seoTitle: string; seoDescription: string; coverMediaId: string; coverMedia: MediaItem; prices: CakePrice[]; flavors: CakeFlavor[]; gallery: CakeGalleryItem[]; createdAt: string; updatedAt: string; }
export interface CakeInput { categoryId: string; name: string; slug: string; shortDescription?: string; description: string; featured?: boolean; bestSeller?: boolean; newArrival?: boolean; trending?: boolean; eggOption?: EggOption; status?: CakeStatus; displayOrder?: number; seoTitle?: string; seoDescription?: string; coverMediaId: string; prices?: Array<Omit<CakePrice, 'id'>>; flavors?: Array<Omit<CakeFlavor, 'id'>>; gallery?: Array<Omit<CakeGalleryItem, 'cakeId' | 'media'>>; }
export interface CategoryQuery { page?: number; limit?: number; search?: string; active?: boolean; sortBy?: 'displayOrder' | 'createdAt' | 'name'; sortOrder?: 'asc' | 'desc'; }
export interface CakeQuery { page?: number; limit?: number; search?: string; categoryId?: string; featured?: boolean; status?: CakeStatus; newest?: boolean; sort?: 'displayOrder' | 'createdAt' | 'name'; sortOrder?: 'asc' | 'desc'; }
export interface Paginated<T> { items: T[]; pagination: PageMeta; total: number; }

export const cakesService = {
  listCategories: async (query: CategoryQuery): Promise<CakeCategory[]> => (await api.get<{ data: CakeCategory[]; meta: PageMeta }>('/admin/cakes/categories', { params: { limit: 100, ...query } })).data.data,
  listCategoriesPage: async (query: CategoryQuery): Promise<Paginated<CakeCategory>> => { const response = await api.get<{ data: CakeCategory[]; meta: PageMeta }>('/admin/cakes/categories', { params: query }); return { items: response.data.data, pagination: response.data.meta, total: response.data.meta.total }; },
  createCategory: async (input: CakeCategoryInput): Promise<CakeCategory> => (await api.post<CakeCategory>('/admin/cakes/categories', input)).data,
  updateCategory: async ({ id, input }: { id: string; input: Partial<CakeCategoryInput> }): Promise<CakeCategory> => (await api.patch<CakeCategory>(`/admin/cakes/categories/${id}`, input)).data,
  removeCategory: async (id: string): Promise<void> => { await api.delete(`/admin/cakes/categories/${id}`); },
  list: async ({ sort, ...query }: CakeQuery): Promise<Paginated<Cake>> => { const response = await api.get<{ data: Cake[]; meta: PageMeta }>('/admin/cakes', { params: { ...query, sortBy: sort } }); return { items: response.data.data, pagination: response.data.meta, total: response.data.meta.total }; },
  get: async (id: string): Promise<Cake> => (await api.get<Cake>(`/admin/cakes/${id}`)).data,
  create: async (input: CakeInput): Promise<Cake> => (await api.post<Cake>('/admin/cakes', input)).data,
  update: async ({ id, input }: { id: string; input: CakeInput }): Promise<Cake> => (await api.patch<Cake>(`/admin/cakes/${id}`, input)).data,
  remove: async (id: string): Promise<void> => { await api.delete(`/admin/cakes/${id}`); },
};
