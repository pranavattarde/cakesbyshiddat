import { api } from './api';

export interface MediaItem { id: string; publicId: string; url: string; secureUrl: string; width: number; height: number; format: string; bytes: number; folder: string; alt: string; createdAt: string; updatedAt: string; }
export interface MediaListResponse { data: MediaItem[]; meta: { page: number; limit: number; total: number; totalPages: number }; }
export interface MediaQuery { page?: number; limit?: number; search?: string; folder?: string; sortBy?: 'createdAt' | 'updatedAt' | 'bytes' | 'width' | 'height'; sortOrder?: 'asc' | 'desc'; }

export const mediaService = {
  list: async (query: MediaQuery): Promise<MediaListResponse> => (await api.get<MediaListResponse>('/media', { params: query })).data,
  upload: async (files: File[], folder: string, onProgress?: (progress: number) => void): Promise<MediaItem[]> => {
    const body = new FormData(); files.forEach((file) => body.append(files.length === 1 ? 'file' : 'files', file)); body.append('folder', folder);
    const path = files.length === 1 ? '/media/upload' : '/media/upload-many';
    const response = await api.post<MediaItem | MediaItem[]>(path, body, { onUploadProgress: (event) => { if (event.total) onProgress?.(Math.round((event.loaded / event.total) * 100)); } });
    return Array.isArray(response.data) ? response.data : [response.data];
  },
  remove: async (id: string): Promise<void> => { await api.delete(`/media/${id}`); },
};
