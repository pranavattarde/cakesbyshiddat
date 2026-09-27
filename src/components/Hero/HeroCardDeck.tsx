import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { SmartMedia } from '../common/SmartMedia';
import { FaArrowRight } from 'react-icons/fa';
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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Individual media indices for each card playlist
  const [cakesMediaIndex, setCakesMediaIndex] = useState(0);
  const [eventsMediaIndex, setEventsMediaIndex] = useState(0);
  const [mascotsMediaIndex, setMascotsMediaIndex] = useState(0);

  const shuffleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Helper to shuffle to next card
  const shuffleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % cardsData.length);
  };

  // Continuous smooth auto-shuffling loop (4.5s per card when not hovered)
  useEffect(() => {
    if (isHovered) {
      if (shuffleTimerRef.current) clearInterval(shuffleTimerRef.current);
      return;
    }

    shuffleTimerRef.current = setInterval(() => {
      shuffleNext();
    }, 4500);

    return () => {
      if (shuffleTimerRef.current) clearInterval(shuffleTimerRef.current);
    };
  }, [isHovered, cardsData.length]);

  // Playlist progression for currently visible media
  const handleMediaEnded = (cardId: string) => {
    if (cardId === 'cakes') setCakesMediaIndex((p) => p + 1);
    if (cardId === 'events') setEventsMediaIndex((p) => p + 1);
    if (cardId === 'mascots') setMascotsMediaIndex((p) => p + 1);

    // If currently active card's video completed, trigger smooth shuffle to next card
    const activeCard = cardsData[activeCardIndex];
    if (activeCard.id === cardId && !isHovered) {
      shuffleNext();
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

  const handleCardClick = (card: ServiceDeckCard, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const offset = (index - activeCardIndex + cardsData.length) % cardsData.length;
    if (offset === 0) {
      // Front card clicked -> navigate directly to service page!
      navigate(card.link);
    } else {
      // Behind card clicked -> bring it forward to the top of the stack!
      setActiveCardIndex(index);
    }
  };

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-[430px] xl:max-w-[450px] mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        // Resume auto shuffle after a brief delay
        setTimeout(() => setIsHovered(false), 2500);
      }}
    >
      {/* Main Interactive Deck Container */}
      <div className="relative h-[460px] xs:h-[490px] sm:h-[550px] lg:h-[560px] xl:h-[600px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {cardsData.map((card, idx) => {
            const media = getMediaForCard(card.id);
            const offset = (idx - activeCardIndex + cardsData.length) % cardsData.length;
            const isTop = offset === 0;

            // Live 3D Shuffling Transforms - tailored to be fully responsive without horizontal clipping
            const stackedRotation = offset === 0 ? 0 : offset === 1 ? 4 : -4;
            const stackedX = offset === 0 ? 0 : offset === 1 ? 16 : -16;
            const stackedY = offset === 0 ? 0 : offset === 1 ? 14 : 26;
            const stackedScale = offset === 0 ? 1 : offset === 1 ? 0.94 : 0.88;
            const stackedZ = offset === 0 ? 30 : offset === 1 ? 20 : 10;
            const stackedOpacity = offset === 0 ? 1 : offset === 1 ? 0.9 : 0.78;

            return (
              <motion.div
                key={card.id}
                layout
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  zIndex: stackedZ,
                }}
                animate={{
                  rotate: stackedRotation,
                  x: stackedX,
                  y: stackedY,
                  scale: stackedScale,
                  opacity: stackedOpacity,
                }}
                whileHover={
                  isTop
                    ? { scale: 1.02, y: -4 }
                    : { scale: stackedScale + 0.02 }
                }
                className="absolute w-[88vw] max-w-[310px] xs:max-w-[340px] sm:max-w-[390px] lg:max-w-[400px] xl:max-w-[420px] h-[430px] xs:h-[460px] sm:h-[520px] lg:h-[530px] xl:h-[570px] flex flex-col overflow-hidden rounded-[30px] sm:rounded-[36px] border-2 border-[#eddcd2] bg-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={(e) => handleCardClick(card, idx, e)}
              >
                {/* Media Display Area with Live Video / Image */}
                <div className="relative flex-1 overflow-hidden bg-[#241a20]">
                  {media ? (
                    <SmartMedia
                      url={media.url}
                      type={media.type}
                      title={media.title}
                      aspectRatio="aspect-auto"
                      className="w-full h-full object-cover"
                      autoPlay={isTop}
                      onEnded={() => handleMediaEnded(card.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#f7ede6]">
                      <span className="text-4xl sm:text-5xl">{card.icon}</span>
                    </div>
                  )}

                  {/* Floating Service Badge */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[11px] sm:text-xs font-bold text-[#3a2d28]">
                    <span>{card.icon}</span>
                    <span>{card.badge}</span>
                  </div>

                  {/* Vignette Shadow for Title Readability */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                  {/* Title & Tagline overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 z-10 text-white">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[2.5px] sm:tracking-[3px] text-[#e8c0a8] font-bold block mb-0.5">
                      {card.badge}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-md text-white leading-tight"
                      style={{ fontFamily: 'Playfair Display' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/90 drop-shadow line-clamp-1 mt-0.5">
                      {card.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="p-3.5 sm:p-4 bg-gradient-to-b from-[#fffdfb] to-[#fff5ed] border-t border-[#f0dfd7] flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#b89a89] font-bold block truncate">
                      {isTop ? 'Tap to View Page' : 'Tap to Bring Forward'}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#3a2d28] truncate">
                      {card.link === '/cakes'
                        ? 'Explore Luxury Bakery'
                        : card.link === '/events'
                        ? 'View Celebration Themes'
                        : 'Meet Mascot Characters'}
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#d7a88c] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md shrink-0">
                    <FaArrowRight className="text-xs sm:text-sm" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sleek Minimal Luxury Pagination Indicator Dots */}
      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
        {cardsData.map((c, idx) => {
          const isActive = idx === activeCardIndex;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCardIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 bg-[#d7a88c]'
                  : 'w-2 bg-[#ecd8cc] hover:bg-[#d7a88c]/60'
              }`}
              aria-label={`Go to ${c.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroCardDeck;
