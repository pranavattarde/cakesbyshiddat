import { useState } from 'react';
import { DataTable } from '../components/data-table';

export function ResourcePage({ title, description }: { title: string; description: string }): React.JSX.Element { const [search, setSearch] = useState(''); return <><div className="mb-7"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-1 text-[#806c75]">{description}</p></div><DataTable title={title} description="Search, sort, and paginate your records." search={search} onSearchChange={setSearch}/></>; }
