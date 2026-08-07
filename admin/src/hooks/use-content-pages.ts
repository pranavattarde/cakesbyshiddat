import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contentPagesService, type ContentPageInput } from '../services/content-pages.service';
export function useContentPages() { return useQuery({ queryKey: ['content-pages'], queryFn: contentPagesService.list }); }
export function useSaveContentPage() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, input }: { id?: string; input: ContentPageInput }) => id ? contentPagesService.update({ id, input }) : contentPagesService.create(input), onSuccess: () => void client.invalidateQueries({ queryKey: ['content-pages'] }) }); }
export function useDeleteContentPage() { const client = useQueryClient(); return useMutation({ mutationFn: contentPagesService.remove, onSuccess: () => void client.invalidateQueries({ queryKey: ['content-pages'] }) }); }
