import { ArrowDownUp, ChevronLeft, ChevronRight, LoaderCircle, Search, SlidersHorizontal } from 'lucide-react';
import { Card, Input } from './ui';

interface DataTableProps { title: string; description: string; search: string; onSearchChange: (value: string) => void; loading?: boolean; }
export function DataTable({ title, description, search, onSearchChange, loading = false }: DataTableProps): React.JSX.Element {
  return <Card className="p-0 overflow-hidden">
    <div className="flex flex-col gap-4 border-b border-rose-100 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-bold">{title}</h2><p className="text-sm text-[#806c75]">{description}</p></div><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-[#9b838d]"/><Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search records" className="pl-9" /></div></div>
    <div className="flex items-center justify-end px-6 pt-4"><button className="flex items-center gap-2 rounded-lg border border-rose-100 px-3 py-2 text-sm text-[#806c75]"><ArrowDownUp className="h-4 w-4"/>Sort</button></div>
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center">{loading ? <><LoaderCircle className="h-7 w-7 animate-spin text-rose"/><p className="text-sm text-[#806c75]">Loading records…</p></> : <><div className="rounded-full bg-lavender p-4"><SlidersHorizontal className="h-6 w-6 text-[#7669a6]" /></div><h3 className="font-semibold">No records to display</h3><p className="max-w-sm text-sm text-[#806c75]">This area is connected and ready for its API endpoint. Records will appear here when available.</p></>}</div>
    <div className="flex items-center justify-between border-t border-rose-100 px-6 py-4 text-sm text-[#806c75]"><span>Showing 0 of 0</span><div className="flex gap-2"><button className="rounded-lg border p-2 disabled:opacity-40" disabled><ChevronLeft className="h-4 w-4"/></button><button className="rounded-lg border p-2 disabled:opacity-40" disabled><ChevronRight className="h-4 w-4"/></button></div></div>
  </Card>;
}
