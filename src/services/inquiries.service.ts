import { api } from './api';
export interface PublicInquiry { customer: { name: string; phone: string; whatsapp?: string; email?: string }; eventType: string; eventDate: string; deliveryType: 'PICKUP' | 'HOME_DELIVERY'; deliveryAddress?: string; deliveryTime?: string; guestCount: number; weight: number; budget: number; eggOption?: 'EGG' | 'EGGLESS' | 'BOTH'; flavour?: string; message?: string; }
export const inquiriesService = { create: async (input: PublicInquiry): Promise<void> => { await api.post('/inquiries', input); } };
