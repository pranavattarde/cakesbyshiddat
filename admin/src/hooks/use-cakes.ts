import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cakesService, type CakeCategoryInput, type CakeInput, type CakeQuery, type CategoryQuery } from '../services/cakes.service';

export function useCakeCategories(query: CategoryQuery) { return useQuery({ queryKey: ['cake-categories', query], queryFn: () => cakesService.listCategories(query) }); }
export function useCakeCategoriesPage(query: CategoryQuery) { return useQuery({ queryKey: ['cake-categories', 'page', query], queryFn: () => cakesService.listCategoriesPage(query) }); }
export function useCreateCakeCategory() { const client = useQueryClient(); return useMutation({ mutationFn: (input: CakeCategoryInput) => cakesService.createCategory(input), onSuccess: () => { void client.invalidateQueries({ queryKey: ['cake-categories'] }); } }); }
export function useUpdateCakeCategory() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, input }: { id: string; input: Partial<CakeCategoryInput> }) => cakesService.updateCategory({ id, input }), onSuccess: () => { void client.invalidateQueries({ queryKey: ['cake-categories'] }); void client.invalidateQueries({ queryKey: ['cakes'] }); } }); }
export function useDeleteCakeCategory() { const client = useQueryClient(); return useMutation({ mutationFn: cakesService.removeCategory, onSuccess: () => { void client.invalidateQueries({ queryKey: ['cake-categories'] }); } }); }
export function useCakes(query: CakeQuery) { return useQuery({ queryKey: ['cakes', query], queryFn: () => cakesService.list(query) }); }
export function useCreateCake() { const client = useQueryClient(); return useMutation({ mutationFn: (input: CakeInput) => cakesService.create(input), onSuccess: () => { void client.invalidateQueries({ queryKey: ['cakes'] }); } }); }
export function useUpdateCake() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, input }: { id: string; input: CakeInput }) => cakesService.update({ id, input }), onSuccess: () => { void client.invalidateQueries({ queryKey: ['cakes'] }); } }); }
export function useDeleteCake() { const client = useQueryClient(); return useMutation({ mutationFn: cakesService.remove, onSuccess: () => { void client.invalidateQueries({ queryKey: ['cakes'] }); } }); }
