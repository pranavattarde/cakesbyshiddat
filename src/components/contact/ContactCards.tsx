import { motion } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';

const ContactCards = () => {
  const { settings } = useSettings();
  if (!settings) return null;
  const cards = [{ icon: '📞', title: 'Call Us', value: settings.phone }, { icon: '📧', title: 'Email Us', value: settings.email }, { icon: '📍', title: 'Location', value: settings.address }];
  return <section className="bg-white py-20"><div className="container-custom"><div className="grid gap-8 md:grid-cols-3">{cards.map((card, index) => <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="rounded-[32px] border border-[#f3e5dc] bg-[#fffaf6] p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"><div className="mb-5 text-5xl">{card.icon}</div><h3 className="mb-3 text-2xl text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>{card.title}</h3><p className="text-gray-500">{card.value}</p></motion.div>)}</div></div></section>;
};

export default ContactCards;
