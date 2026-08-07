import { api } from './api';
import type { EggOption, PageMeta } from './cakes.service';
import type { MediaItem } from './media.service';

export type OrderStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONFIRMED' | 'IN_PROGRESS' | 'READY' | 'COMPLETED' | 'CANCELLED';
export type OrderPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
export type DeliveryType = 'PICKUP' | 'HOME_DELIVERY';
export interface OrderCustomer { id: string; name: string; phone: string; whatsapp: string; email: string | null; createdAt: string; updatedAt: string; }
export interface OrderCake { id: string; name: string; slug: string; coverMedia: MediaItem; }
export interface InspirationImage { id: string; mediaId: string; displayOrder: number; media: MediaItem; }
export interface Order { id: string; customerId: string; customer: OrderCustomer; cakeId: string | null; cake: OrderCake | null; eventType: string; eventDate: string; deliveryType: DeliveryType; deliveryAddress: string; deliveryTime: string; guestCount: number; weight: string | number; budget: string | number; eggOption: EggOption; flavour: string; message: string; status: OrderStatus; priority: OrderPriority; assignedTo: string; quotationAmount: string | number | null; adminNotes: string; inspirationImages: InspirationImage[]; createdAt: string; updatedAt: string; }
export interface OrderQuery { page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string; status?: OrderStatus; priority?: OrderPriority; cakeId?: string; customerId?: string; sortOrder?: 'asc' | 'desc'; }
export interface OrderInput { customer?: { name: string; phone: string; whatsapp?: string; email?: string }; customerId?: string; cakeId?: string; eventType: string; eventDate: string; deliveryType: DeliveryType; deliveryAddress?: string; deliveryTime?: string; guestCount: number; weight: number; budget: number; eggOption?: EggOption; flavour?: string; message?: string; status?: OrderStatus; priority?: OrderPriority; assignedTo?: string; quotationAmount?: number; adminNotes?: string; inspirationImages?: Array<{ mediaId: string; displayOrder?: number }>; }
interface OrderList { data: Order[]; meta: PageMeta; }

export const ordersService = {
  list: async (query: OrderQuery): Promise<OrderList> => (await api.get<OrderList>('/inquiries', { params: query })).data,
  get: async (id: string): Promise<Order> => (await api.get<Order>(`/inquiries/${id}`)).data,
  create: async (input: OrderInput): Promise<Order> => (await api.post<Order>('/inquiries/admin', input)).data,
  update: async ({ id, input }: { id: string; input: Partial<OrderInput> }): Promise<Order> => (await api.patch<Order>(`/inquiries/${id}`, input)).data,
  remove: async (id: string): Promise<void> => { await api.delete(`/inquiries/${id}`); },
  counts: async (): Promise<Record<OrderStatus, number>> => (await api.get<Record<OrderStatus, number>>('/inquiries/dashboard/counts')).data,
};
