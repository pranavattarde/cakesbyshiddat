import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { SmartMedia } from '../common/SmartMedia';
import {
  FaArrowRight,
  FaLayerGroup,
  FaThLarge,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
} from 'react-icons/fa';
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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const shufflePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  // Continuous Live Shuffling Loop (4.5s per card when not hovered or paused)
  useEffect(() => {
    if (isExpanded || isPaused || isHovered) {
      if (shuffleTimerRef.current) clearInterval(shuffleTimerRef.current);
      return;
    }

    shuffleTimerRef.current = setInterval(() => {
      shuffleNext();
    }, 4500);

    return () => {
      if (shuffleTimerRef.current) clearInterval(shuffleTimerRef.current);
    };
  }, [isExpanded, isPaused, isHovered, cardsData.length]);

  // Playlist progression for currently visible media
  const handleMediaEnded = (cardId: string) => {
    if (cardId === 'cakes') setCakesMediaIndex((p) => p + 1);
    if (cardId === 'events') setEventsMediaIndex((p) => p + 1);
    if (cardId === 'mascots') setMascotsMediaIndex((p) => p + 1);

    // If currently active card's video completed, trigger smooth shuffle to next card!
    const activeCard = cardsData[activeCardIndex];
    if (activeCard.id === cardId && !isHovered && !isPaused) {
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
    if (isExpanded) {
      navigate(card.link);
      return;
    }

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
      className="relative w-full max-w-lg mx-auto lg:max-w-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Deck Controls Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
        {/* Live Shuffling Indicator Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#eddcd2] shadow-sm text-xs font-semibold text-[#543d34]">
            <span
              className={`w-2 h-2 rounded-full ${
                isPaused || isHovered ? 'bg-amber-400' : 'bg-emerald-500 animate-ping'
              }`}
            />
            <span className="text-[11px] uppercase tracking-wider text-[#7d665b]">
              {isHovered ? 'Paused (Hovered)' : isPaused ? 'Paused' : 'Live Shuffling'}
            </span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-7 h-7 rounded-full bg-white border border-[#eddcd2] shadow-sm flex items-center justify-center text-[10px] text-[#7d665b] hover:bg-[#faeae1] transition cursor-pointer"
            title={isPaused ? 'Resume auto-shuffle' : 'Pause auto-shuffle'}
            aria-label="Pause/Resume shuffle"
          >
            {isPaused ? <FaPlay className="ml-0.5" /> : <FaPause />}
          </button>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-2">
          {/* Quick prev/next shuffle arrows */}
          {!isExpanded && (
            <div className="flex items-center gap-1">
              <button
                onClick={shufflePrev}
                className="w-7 h-7 rounded-full bg-white border border-[#eddcd2] shadow-sm flex items-center justify-center text-xs text-[#543d34] hover:bg-[#faeae1] transition cursor-pointer"
                title="Shuffle Previous"
                aria-label="Previous card"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={shuffleNext}
                className="w-7 h-7 rounded-full bg-white border border-[#eddcd2] shadow-sm flex items-center justify-center text-xs text-[#543d34] hover:bg-[#faeae1] transition cursor-pointer"
                title="Shuffle Next"
                aria-label="Next card"
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-[#fff0e6] border border-[#ecd7cb] text-xs font-semibold text-[#3a2d28] shadow-sm transition hover:scale-105 cursor-pointer"
          >
            {isExpanded ? (
              <>
                <FaLayerGroup className="text-[#d7a88c]" /> Stack Live Deck
              </>
            ) : (
              <>
                <FaThLarge className="text-[#d7a88c]" /> Fan Out (All 3)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Navigation Pills (Cakes | Events | Mascots) */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {cardsData.map((c, idx) => {
          const isActive = idx === activeCardIndex;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCardIndex(idx);
                if (isExpanded) setIsExpanded(false);
              }}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#d7a88c] text-white shadow-md shadow-[#d7a88c]/30 scale-105'
                  : 'bg-white/80 border border-[#ecd7cb] text-[#543d34] hover:bg-[#fff0e6]'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Deck Container */}
      <div
        className={`relative transition-all duration-700 select-none ${
          isExpanded
            ? 'grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-4'
            : 'h-[580px] sm:h-[630px] flex items-center justify-center'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {cardsData.map((card, idx) => {
            const media = getMediaForCard(card.id);
            const offset = (idx - activeCardIndex + cardsData.length) % cardsData.length;
            const isTop = offset === 0;

            // Live 3D Shuffling Transforms
            const stackedRotation = offset === 0 ? 0 : offset === 1 ? 5 : -5;
            const stackedX = offset === 0 ? 0 : offset === 1 ? 24 : -24;
            const stackedY = offset === 0 ? 0 : offset === 1 ? 16 : 30;
            const stackedScale = offset === 0 ? 1 : offset === 1 ? 0.94 : 0.88;
            const stackedZ = offset === 0 ? 30 : offset === 1 ? 20 : 10;
            const stackedOpacity = offset === 0 ? 1 : offset === 1 ? 0.88 : 0.75;

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
                        opacity: stackedOpacity,
                      }
                }
                whileHover={
                  isTop
                    ? { scale: 1.02, y: -4 }
                    : { scale: stackedScale + 0.02 }
                }
                className={`group overflow-hidden rounded-[36px] border-2 border-[#eddcd2] bg-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer ${
                  isExpanded
                    ? 'relative h-[480px] sm:h-[540px] flex flex-col'
                    : 'absolute w-full max-w-[420px] h-[530px] sm:h-[580px] flex flex-col'
                }`}
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
                      <span className="text-5xl">{card.icon}</span>
                    </div>
                  )}

                  {/* Floating Service Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-[#3a2d28]">
                    <span>{card.icon}</span>
                    <span>{card.badge}</span>
                  </div>

                  {/* Shuffle Card Counter Badge */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                    <span>
                      {idx + 1} / {cardsData.length}
                    </span>
                    {isTop && !isExpanded && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                    )}
                  </div>

                  {/* Vignette Shadow */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                  {/* Title & Tagline overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <span className="text-[10px] uppercase tracking-[3px] text-[#e8c0a8] font-bold block mb-0.5">
                      {card.badge}
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md text-white"
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
                <div className="p-4 bg-gradient-to-b from-[#fffdfb] to-[#fff5ed] border-t border-[#f0dfd7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#b89a89] font-bold block">
                      {isTop ? 'Click to View Page' : 'Click to Bring Forward'}
                    </span>
                    <p className="text-sm font-bold text-[#3a2d28] flex items-center gap-1">
                      {card.link === '/cakes'
                        ? 'Explore Luxury Bakery'
                        : card.link === '/events'
                        ? 'View Celebration Themes'
                        : 'Meet Mascot Characters'}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#d7a88c] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md shrink-0">
                    <FaArrowRight className="text-sm" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Helpful Hint */}
      {!isExpanded && (
        <p className="mt-2 text-center text-xs text-[#9d897f]">
          ✨ Shuffling automatically • Click top card to view page • Hover to pause
        </p>
      )}
    </div>
  );
};

export default HeroCardDeck;
