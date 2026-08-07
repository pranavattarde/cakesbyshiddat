import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import SEO from './SEO';
import { useContent } from '../hooks/use-content';
import type { ContentItem, ContentSection } from '../services/content.service';

const isExternal = (url: string) => /^(https?:|mailto:|tel:)/.test(url);

function Action({ url, children, secondary = false }: { url: string; children: React.ReactNode; secondary?: boolean }) {
  const className = secondary
    ? 'rounded-full border border-[#d7a88c] px-8 py-4 text-[#3a2d28] transition hover:bg-[#d7a88c] hover:text-white'
    : 'rounded-full bg-[#d7a88c] px-8 py-4 text-white transition hover:bg-[#c99a7d]';
  return isExternal(url) ? <a href={url} className={className}>{children}</a> : <Link to={url} className={className}>{children}</Link>;
}

function Heading({ section }: { section: ContentSection }) {
  return <div className="mb-16 text-center"><p className="mb-4 uppercase tracking-[5px] text-[#d7a88c]">{section.subtitle}</p><h2 className="text-4xl text-[#3a2d28] md:text-5xl" style={{ fontFamily: 'Playfair Display' }}>{section.title}</h2>{section.description && <p className="mx-auto mt-5 max-w-3xl whitespace-pre-line leading-8 text-[#8a7a72]">{section.description}</p>}</div>;
}

function Cards({ items }: { items: ContentItem[] }) {
  return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-[28px] border border-[#f3e5dc] bg-white shadow-sm">{item.media && <img src={item.media.secureUrl} alt={item.media.alt || item.title} loading="lazy" className="h-72 w-full object-cover" />}<div className="p-7"><p className="text-sm uppercase tracking-widest text-[#d7a88c]">{item.subtitle}</p><h3 className="mt-2 text-2xl text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>{item.description && <p className="mt-3 leading-7 text-[#8a7a72]">{item.description}</p>}{item.link && <div className="mt-5"><Action url={item.link} secondary>Learn more</Action></div>}</div></article>)}</div>;
}

function Section({ section, index }: { section: ContentSection; index: number }) {
  if (section.type === 'hero') return <section className="bg-[#fff8f2] px-6 pb-28 pt-40"><div className="container-custom grid items-center gap-12 lg:grid-cols-2"><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}><p className="mb-5 uppercase tracking-[5px] text-[#d7a88c]">{section.subtitle}</p><h1 className="text-5xl leading-tight text-[#3a2d28] md:text-7xl" style={{ fontFamily: 'Playfair Display' }}>{section.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#8a7a72]">{section.description}</p><div className="mt-10 flex flex-wrap gap-4">{section.buttonText && section.buttonUrl && <Action url={section.buttonUrl}>{section.buttonText}</Action>}{section.items[0]?.link && <Action url={section.items[0].link} secondary>{section.items[0].title}</Action>}</div></motion.div>{section.media && <motion.img initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} src={section.media.secureUrl} alt={section.media.alt || section.title} className="h-[620px] w-full rounded-[48px] object-cover shadow-2xl" />}</div></section>;

  if (section.type === 'cta') return <section className="bg-white px-6 py-28"><div className="container-custom rounded-[48px] bg-[#3a2d28] p-12 text-center lg:p-20"><p className="uppercase tracking-[5px] text-[#d7a88c]">{section.subtitle}</p><h2 className="mt-6 text-4xl text-white md:text-6xl" style={{ fontFamily: 'Playfair Display' }}>{section.title}</h2><p className="mx-auto mt-7 max-w-3xl leading-8 text-gray-300">{section.description}</p><div className="mt-10 flex flex-wrap justify-center gap-4">{section.buttonText && section.buttonUrl && <Action url={section.buttonUrl}>{section.buttonText}</Action>}{section.items[0]?.link && <Action url={section.items[0].link} secondary>{section.items[0].title}</Action>}</div></div></section>;

  if (section.type === 'gallery') return <section className="bg-[#fff8f2] px-6 py-28"><div className="container-custom"><Heading section={section} /><div className="grid gap-6 md:grid-cols-3">{section.items.filter((item) => item.media).map((item) => <img key={item.id} src={item.media!.secureUrl} alt={item.media!.alt || item.title || section.title} loading="lazy" className="h-[350px] w-full rounded-[28px] object-cover transition duration-700 hover:scale-[1.02]" />)}</div></div></section>;

  if (section.type === 'timeline') return <section className="bg-[#fffaf6] px-6 py-28"><div className="container-custom"><Heading section={section} /><div className="grid gap-8 rounded-[40px] bg-white p-10 shadow-xl sm:grid-cols-2 lg:grid-cols-4">{section.items.map((item) => <div key={item.id} className="text-center"><h3 className="text-5xl text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>{item.subtitle || item.title}</h3><p className="mt-3 text-[#8a7a72]">{item.subtitle ? item.title : item.description}</p></div>)}</div></div></section>;

  if (section.type === 'text') return <section className="bg-white px-6 py-28"><div className="container-custom grid items-center gap-16 lg:grid-cols-2"><div>{section.media && <img src={section.media.secureUrl} alt={section.media.alt || section.title} className="max-h-[650px] w-full rounded-[40px] object-cover" />}</div><div><p className="mb-4 uppercase tracking-[5px] text-[#d7a88c]">{section.subtitle}</p><h2 className="text-4xl text-[#3a2d28] md:text-5xl" style={{ fontFamily: 'Playfair Display' }}>{section.title}</h2><p className="mt-7 whitespace-pre-line leading-8 text-[#8a7a72]">{section.description}</p>{section.items.length > 0 && <div className="mt-9 space-y-4">{section.items.map((item) => <div key={item.id} className="flex gap-5"><strong className="text-[#d7a88c]">{item.subtitle}</strong><span className="text-[#3a2d28]">{item.title}</span></div>)}</div>}{section.buttonText && section.buttonUrl && <div className="mt-9"><Action url={section.buttonUrl}>{section.buttonText}</Action></div>}</div></div></section>;

  return <section className={index % 2 ? 'bg-white px-6 py-28' : 'bg-[#fff8f2] px-6 py-28'}><motion.div className="container-custom" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><Heading section={section} /><Cards items={section.items} />{section.buttonText && section.buttonUrl && <div className="mt-14 text-center"><Action url={section.buttonUrl}>{section.buttonText}</Action></div>}</motion.div></section>;
}

export function ContentPage({ slug, children, insertChildrenAfter }: { slug: string; children?: React.ReactNode; insertChildrenAfter?: number }): React.JSX.Element {
  const { data, isLoading, isError, refetch } = useContent(slug);
  if (isLoading) return <div className="grid min-h-screen place-items-center bg-[#fff8f2]">Loading…</div>;
  if (isError || !data) return <div className="grid min-h-screen place-items-center bg-[#fff8f2]"><button onClick={() => void refetch()} className="rounded-full bg-[#d7a88c] px-6 py-3 text-white">Retry loading page</button></div>;
  return <><SEO title={data.seoTitle || data.title} description={data.seoDescription || data.subtitle} path={slug === 'home' ? '/' : `/${slug}`} /><Navbar /><main>{data.sections.map((section, index) => <div key={section.id}><Section section={section} index={index} />{insertChildrenAfter === index && children}</div>)}{insertChildrenAfter === undefined && children}</main><Footer /></>;
}
