import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateCakeCategory, useUpdateCakeCategory } from '../hooks/use-cakes';
import type { CakeCategory, CakeCategoryInput } from '../services/cakes.service';
import type { MediaItem } from '../services/media.service';
import { MediaPicker } from './media-picker';
import { Button, Input, Textarea } from './ui';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(100),
  slug: z.string().trim().min(1, 'Slug is required.').max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.'),
  description: z.string().max(2000),
  displayOrder: z.coerce.number().int().min(0),
  active: z.boolean(),
  coverMediaId: z.string(),
});
type FormValues = z.infer<typeof schema>;

export function CakeCategoryFormModal({ category, onClose, onComplete }: { category: CakeCategory | null; onClose: () => void; onComplete: (message: string, error?: boolean) => void }): React.JSX.Element {
  const create = useCreateCakeCategory();
  const update = useUpdateCakeCategory();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [cover, setCover] = useState<MediaItem | null>(category?.coverMedia ?? null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema) as import('react-hook-form').Resolver<FormValues>,
    defaultValues: { name: category?.name ?? '', slug: category?.slug ?? '', description: category?.description ?? '', displayOrder: category?.displayOrder ?? 0, active: category?.active ?? true, coverMediaId: category?.coverMediaId ?? '' },
  });
  const saving = create.isPending || update.isPending;
  const submit = (values: FormValues) => {
    const input: CakeCategoryInput = { ...values, coverMediaId: values.coverMediaId || undefined };
    const options = { onSuccess: () => onComplete(category ? 'Category updated.' : 'Category created.'), onError: () => onComplete(`Could not ${category ? 'update' : 'create'} category.`, true) };
    if (category) update.mutate({ id: category.id, input }, options); else create.mutate(input, options);
  };
  return <motion.div className="fixed inset-0 z-50 grid place-items-center bg-[#342630]/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onMouseDown={onClose}><motion.form onSubmit={handleSubmit(submit)} onMouseDown={(event) => event.stopPropagation()} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" initial={{ y: 24 }} animate={{ y: 0 }}><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">{category ? 'Edit category' : 'Create category'}</h2><p className="text-sm text-[#806c75]">Manage catalogue grouping and cover media.</p></div><button type="button" aria-label="Close category form" onClick={onClose} className="rounded-xl p-2 hover:bg-rose-light"><X /></button></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="Name" error={errors.name?.message}><Input {...register('name')} /></Field><Field label="Slug" error={errors.slug?.message}><Input {...register('slug')} /></Field><Field label="Display order" error={errors.displayOrder?.message}><Input type="number" min="0" {...register('displayOrder')} /></Field><label className="flex items-center gap-3 self-end rounded-xl border border-rose-100 p-3 text-sm font-semibold"><input type="checkbox" className="accent-[#b75c7d]" {...register('active')} />Active</label><Field label="Description" error={errors.description?.message} className="sm:col-span-2"><Textarea rows={4} {...register('description')} /></Field><section className="rounded-2xl border border-rose-100 p-4 sm:col-span-2"><div className="flex items-center justify-between gap-4"><div><h3 className="font-bold">Cover image</h3><p className="text-sm text-[#806c75]">Select from Media Library.</p></div><Button type="button" onClick={() => setPickerOpen(true)}>{cover ? 'Change image' : 'Choose image'}</Button></div>{cover && <img src={cover.secureUrl} alt={cover.alt || 'Category cover'} className="mt-4 h-28 w-28 rounded-xl object-cover" />}</section></div><div className="mt-7 flex justify-end gap-3"><Button type="button" className="bg-white text-[#342630] hover:bg-rose-light" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving && <LoaderCircle className="h-4 w-4 animate-spin" />}{category ? 'Save changes' : 'Create category'}</Button></div></motion.form><MediaPicker open={pickerOpen} title="Choose category cover" onClose={() => setPickerOpen(false)} onSelect={(media) => { setCover(media); setValue('coverMediaId', media.id, { shouldDirty: true }); }} /></motion.div>;
}

function Field({ label, error, className = '', children }: { label: string; error?: string; className?: string; children: React.ReactNode }): React.JSX.Element { return <label className={`text-sm font-semibold ${className}`}>{label}<div className="mt-2">{children}</div>{error && <span className="mt-1 block text-xs text-red-700">{error}</span>}</label>; }
