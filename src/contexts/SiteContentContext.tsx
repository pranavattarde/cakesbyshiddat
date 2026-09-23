import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteContentData, siteContentService, INITIAL_SITE_CONTENT } from '../services/site-content.service';

interface SiteContentContextType {
  content: SiteContentData;
  updateContent: (newContent: SiteContentData) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: INITIAL_SITE_CONTENT,
  updateContent: () => {},
  resetContent: () => {},
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentData>(() => siteContentService.get());

  useEffect(() => {
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<SiteContentData>;
      if (customEvent.detail) {
        setContent(customEvent.detail);
      } else {
        setContent(siteContentService.get());
      }
    };

    window.addEventListener('cbs_site_content_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('cbs_site_content_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateContent = (newContent: SiteContentData) => {
    siteContentService.save(newContent);
    setContent(newContent);
  };

  const resetContent = () => {
    const reset = siteContentService.reset();
    setContent(reset);
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
