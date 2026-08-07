import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { mediaService, type MediaQuery } from '../services/media.service';

export function useMedia(query: MediaQuery) { return useQuery({ queryKey: ['media', query], queryFn: () => mediaService.list(query) }); }
export function useUploadMedia() { const client = useQueryClient(); const [progress, setProgress] = useState(0); const mutation = useMutation({ mutationFn: ({ files, folder }: { files: File[]; folder: string }) => mediaService.upload(files, folder, setProgress), onSuccess: () => { void client.invalidateQueries({ queryKey: ['media'] }); }, onSettled: () => setProgress(0) }); return { ...mutation, progress }; }
export function useDeleteMedia() { const client = useQueryClient(); return useMutation({ mutationFn: mediaService.remove, onSuccess: () => { void client.invalidateQueries({ queryKey: ['media'] }); } }); }
