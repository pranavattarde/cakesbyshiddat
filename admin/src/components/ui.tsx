import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren, TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>): React.JSX.Element {
  return <section className={cn('rounded-3xl border border-rose-100 bg-white p-6 shadow-[0_12px_40px_rgba(116,67,87,0.07)]', className)}>{children}</section>;
}
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): React.JSX.Element {
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl bg-rose px-4 py-2.5 font-semibold text-white transition hover:bg-[#9d4567] disabled:cursor-not-allowed disabled:opacity-60', className)} {...props} />;
}
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>): React.JSX.Element {
  return <input className={cn('w-full rounded-xl border border-[#eadde1] bg-white px-3 py-2.5 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose-light', className)} {...props} />;
}
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>): React.JSX.Element {
  return <textarea className={cn('w-full rounded-xl border border-[#eadde1] bg-white px-3 py-2.5 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose-light', className)} {...props} />;
}
