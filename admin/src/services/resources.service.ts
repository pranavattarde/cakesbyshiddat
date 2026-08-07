import type { PaginatedResponse, ResourceItem } from '../types';
import { api } from './api';

export type ResourceName = 'cakes' | 'events' | 'gallery' | 'testimonials' | 'faqs' | 'settings' | 'contact-messages';

export const resourceService = {
  list: async (resource: ResourceName, params?: Record<string, string | number>): Promise<PaginatedResponse<ResourceItem>> =>
    (await api.get<PaginatedResponse<ResourceItem>>(`/${resource}`, { params })).data,
};
