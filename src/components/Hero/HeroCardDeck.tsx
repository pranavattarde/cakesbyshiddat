import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { SmartMedia } from '../common/SmartMedia';
import { FaArrowRight, FaLayerGroup, FaThLarge } from 'react-icons/fa';
import type { MediaItem } from '../../services/site-content.service';

interface ServiceDeckCard {
  id: 'cakes' | 'events' | 'mascots';
  title: string;
  tagline: string;
  icon: string;
  badge: string;
  link: string;
  mediaList: MediaItem[];
}

export const HeroCardDeck: React.FC = () => {
  const navigate = useNavigate();
  const { content } = useSiteContent();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0); // for stacked view rotation

  // Media indices for each card
  const [cakesMediaIndex, setCakesMediaIndex] = useState(0);
  const [eventsMediaIndex, setEventsMediaIndex] = useState(0);
  const [mascotsMediaIndex, setMascotsMediaIndex] = useState(0);

  const cardsData: ServiceDeckCard[] = [
    {
      id: 'cakes',
      title: content.hero.cakes.title || 'Luxury Cakes',
      tagline: content.hero.cakes.subtitle || 'Artisanal Handcrafted Perfection',
      icon: '🎂',
      badge: 'Bespoke Bakery',
      link: '/cakes',
      mediaList: content.hero.cakes.media.filter((m) => m.active),
    },
    {
      id: 'events',
      title: content.hero.events.title || 'Grand Celebrations',
      tagline: content.hero.events.subtitle || 'Unforgettable Event Planning',
      icon: '🎉',
      badge: 'Event Planning',
      link: '/events',
      mediaList: content.hero.events.media.filter((m) => m.active),
    },
    {
      id: 'mascots',
      title: content.hero.mascots.title || 'Kids & Mascots',
      tagline: content.hero.mascots.subtitle || 'Joyful Mascot Entertainment',
      icon: '🧸',
      badge: 'Live Entertainment',
      link: '/mascots',
      mediaList: content.hero.mascots.media.filter((m) => m.active),
    },
  ];

  // Rotate stacked top card every 6 seconds when not expanded
  useEffect(() => {
    if (isExpanded) return;
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cardsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isExpanded, cardsData.length]);

  // Playlist timer logic for Cakes media
  useEffect(() => {
    const list = cardsData[0].mediaList;
    if (!list.length) return;
    const currentMedia = list[cakesMediaIndex % list.length];
    const durationMs = currentMedia.type === 'image' ? (currentMedia.duration || 4) * 1000 : (currentMedia.duration || 10) * 1000;

    const timer = setTimeout(() => {
      setCakesMediaIndex((prev) => (prev + 1) % list.length);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [cakesMediaIndex, cardsData]);

  // Playlist timer logic for Events media
  useEffect(() => {
    const list = cardsData[1].mediaList;
    if (!list.length) return;
    const currentMedia = list[eventsMediaIndex % list.length];
    const durationMs = currentMedia.type === 'image' ? (currentMedia.duration || 4) * 1000 : (currentMedia.duration || 10) * 1000;

    const timer = setTimeout(() => {
      setEventsMediaIndex((prev) => (prev + 1) % list.length);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [eventsMediaIndex, cardsData]);

  // Playlist timer logic for Mascots media
  useEffect(() => {
    const list = cardsData[2].mediaList;
    if (!list.length) return;
    const currentMedia = list[mascotsMediaIndex % list.length];
    const durationMs = currentMedia.type === 'image' ? (currentMedia.duration || 4) * 1000 : (currentMedia.duration || 10) * 1000;

    const timer = setTimeout(() => {
      setMascotsMediaIndex((prev) => (prev + 1) % list.length);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [mascotsMediaIndex, cardsData]);

  const handleCardClick = (card: ServiceDeckCard, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded) {
      // If stacked, first click expands or selects
      setIsExpanded(true);
      setActiveCardIndex(index);
    } else {
      // When already expanded, navigate to the service page
      navigate(card.link);
    }
  };

  const getMediaForCard = (cardId: string) => {
    if (cardId === 'cakes') {
      const list = cardsData[0].mediaList;
      return list[cakesMediaIndex % (list.length || 1)] || null;
    }
    if (cardId === 'events') {
      const list = cardsData[1].mediaList;
      return list[eventsMediaIndex % (list.length || 1)] || null;
    }
    const list = cardsData[2].mediaList;
    return list[mascotsMediaIndex % (list.length || 1)] || null;
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Interaction Mode Toggle Button */}
      <div className="mb-4 flex items-center justify-between px-2">
        <span className="text-xs uppercase tracking-[3px] text-[#b89a89] font-medium flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d7a88c] animate-pulse" />
          Interactive Service Deck
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-[#fff0e6] border border-[#ecd7cb] text-xs font-semibold text-[#3a2d28] shadow-sm transition hover:scale-105"
        >
          {isExpanded ? (
            <>
              <FaLayerGroup className="text-[#d7a88c]" /> Stack Cards
            </>
          ) : (
            <>
              <FaThLarge className="text-[#d7a88c]" /> Fan Out (All 3)
            </>
          )}
        </button>
      </div>

      {/* Main Deck Container */}
      <div
        className={`relative transition-all duration-700 select-none ${
          isExpanded
            ? 'grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-4'
            : 'h-[580px] sm:h-[640px] flex items-center justify-center cursor-pointer'
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {cardsData.map((card, idx) => {
          const media = getMediaForCard(card.id);
          // When stacked, calculate 3D rotation and layering
          const offset = (idx - activeCardIndex + cardsData.length) % cardsData.length;
          const isTop = offset === 0;

          // Stacked transforms
          const stackedRotation = offset === 0 ? 0 : offset === 1 ? 5 : -5;
          const stackedX = offset === 0 ? 0 : offset === 1 ? 22 : -22;
          const stackedY = offset === 0 ? 0 : offset === 1 ? 16 : 8;
          const stackedScale = offset === 0 ? 1 : offset === 1 ? 0.94 : 0.90;
          const stackedZ = offset === 0 ? 30 : offset === 1 ? 20 : 10;

          return (
            <motion.div
              key={card.id}
              layout
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              style={{
                zIndex: isExpanded ? 1 : stackedZ,
              }}
              animate={
                isExpanded
                  ? {
                      rotate: 0,
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                    }
                  : {
                      rotate: stackedRotation,
                      x: stackedX,
                      y: stackedY,
                      scale: stackedScale,
                      opacity: isTop ? 1 : 0.88,
                    }
              }
              whileHover={
                isExpanded
                  ? { scale: 1.04, y: -6 }
                  : { scale: 1.02 }
              }
              className={`group overflow-hidden rounded-[36px] border-2 border-[#eddcd2] bg-white shadow-xl hover:shadow-2xl transition-shadow ${
                isExpanded
                  ? 'relative h-[480px] sm:h-[540px] flex flex-col'
                  : 'absolute w-full max-w-[420px] h-[540px] sm:h-[600px] flex flex-col'
              }`}
              onClick={(e) => handleCardClick(card, idx, e)}
            >
              {/* Media Display Area */}
              <div className="relative flex-1 overflow-hidden bg-[#241a20]">
                {media ? (
                  <SmartMedia
                    url={media.url}
                    type={media.type}
                    title={media.title}
                    aspectRatio="aspect-auto"
                    className="w-full h-full object-cover"
                    onEnded={() => {
                      if (card.id === 'cakes') setCakesMediaIndex((p) => p + 1);
                      if (card.id === 'events') setEventsMediaIndex((p) => p + 1);
                      if (card.id === 'mascots') setMascotsMediaIndex((p) => p + 1);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#f7ede6]">
                    <span className="text-4xl">{card.icon}</span>
                  </div>
                )}

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-xs font-semibold text-[#3a2d28]">
                  <span>{card.icon}</span>
                  <span>{card.badge}</span>
                </div>

                {/* Media Counter & Indicator Pill */}
                {card.mediaList.length > 1 && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px]">
                    {card.mediaList.map((_, mIdx) => {
                      const curIndex =
                        card.id === 'cakes'
                          ? cakesMediaIndex
                          : card.id === 'events'
                          ? eventsMediaIndex
                          : mascotsMediaIndex;
                      const isActive = mIdx === curIndex % card.mediaList.length;
                      return (
                        <span
                          key={mIdx}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive ? 'bg-[#d7a88c] w-3.5' : 'bg-white/50'
                          }`}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Subtle gradient vignette at bottom of media */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Title overlay on media */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3
                    className="text-2xl font-bold tracking-tight drop-shadow-md text-white"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/90 drop-shadow line-clamp-1 mt-0.5">
                    {card.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="p-4 bg-gradient-to-b from-[#fffbf8] to-[#fff5ed] border-t border-[#f0dfd7] flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#b89a89] font-bold">
                    Explore Service
                  </span>
                  <p className="text-sm font-semibold text-[#3a2d28] flex items-center gap-1">
                    {card.link === '/cakes' ? 'View Bakery Collection' : card.link === '/events' ? 'Browse Celebrations' : 'Meet Mascot Friends'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#d7a88c] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
                  <FaArrowRight className="text-sm" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Helper hint for users */}
      {!isExpanded && (
        <p className="mt-3 text-center text-xs text-[#9d897f]">
          ✨ Click any card to fan out & explore Cakes, Events, and Mascots
        </p>
      )}
    </div>
  );
};

export default HeroCardDeck;
