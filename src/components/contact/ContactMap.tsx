import { useSettings } from '../../hooks/useSettings';

const ContactMap = () => {
  const { settings } = useSettings();
  if (!settings?.googleMapsUrl) return null;
  return <section className="bg-[#fffaf6] py-28"><div className="container-custom"><div className="mb-14 text-center"><p className="section-subtitle">FIND US</p><h2 className="section-title">Visit {settings.businessName}</h2><p className="mx-auto mt-4 max-w-2xl text-gray-500">We'd love to welcome you and discuss your celebration plans.</p></div><div className="overflow-hidden rounded-[40px] border border-[#f3e5dc] shadow-xl"><iframe title={`${settings.businessName} location`} src={settings.googleMapsUrl} width="100%" height="500" style={{ border: 0 }} loading="lazy" /></div></div></section>;
};

export default ContactMap;
