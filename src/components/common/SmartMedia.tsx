import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

export interface SmartMediaProps {
  url: string;
  type?: 'image' | 'video' | 'instagram' | 'youtube';
  title?: string;
  className?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  aspectRatio?: string;
}

export function detectMediaType(url: string, explicitType?: string): 'image' | 'video' | 'instagram' | 'youtube' {
  if (explicitType && ['image', 'video', 'instagram', 'youtube'].includes(explicitType)) {
    return explicitType as any;
  }
  if (/instagram\.com\/(reel|p|tv)\/([^/?#&]+)/i.test(url)) return 'instagram';
  if (/youtube\.com|youtu\.be/i.test(url)) return 'youtube';
  if (/\.(mp4|webm|ogg|mov)$/i.test(url) || /cloudinary\.com\/.*\/video\/upload/i.test(url)) return 'video';
  return 'image';
}

export function extractInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([^/?#&]+)/i);
  return match ? match[1] : null;
}

export function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&#]+)/i);
  return match ? match[1] : null;
}

export const SmartMedia: React.FC<SmartMediaProps> = ({
  url,
  type,
  title = '',
  className = '',
  autoPlay = true,
  onEnded,
  aspectRatio = 'aspect-[4/5]',
}) => {
  const mediaType = detectMediaType(url, type);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [url]);

  // Video playback control
  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(() => {
          // Browser prevented autoplay
        });
      }
    }
  }, [url, mediaType, autoPlay]);

  if (hasError || !url) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#fcf4ed] to-[#fae8dc] text-[#a07a68] p-6 text-center ${aspectRatio} ${className}`}>
        <div className="w-16 h-16 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3 text-2xl text-[#d7a88c]">
          🎂
        </div>
        <p className="font-serif text-lg text-[#3a2d28] font-medium">{title || 'Cakes By Shiddat'}</p>
        <span className="text-xs uppercase tracking-widest text-[#d7a88c] mt-1">Celebrations & Confections</span>
      </div>
    );
  }

  // Instagram Reel
  if (mediaType === 'instagram') {
    const reelId = extractInstagramId(url);
    if (!reelId) {
      return (
        <div className={`relative flex flex-col items-center justify-center bg-[#2d1e24] text-white p-6 ${aspectRatio} ${className}`}>
          <FaInstagram className="text-4xl text-[#f58529] mb-3" />
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-pink-200">
            View Reel on Instagram
          </a>
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden bg-[#241a20] ${aspectRatio} ${className}`}>
        <iframe
          src={`https://www.instagram.com/reel/${reelId}/embed/?autoplay=1`}
          title={title || 'Instagram Reel'}
          className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Fallback button if iframe fails or is restricted */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs transition"
        >
          <FaInstagram className="text-pink-400" /> Open Reel
        </a>
      </div>
    );
  }

  // YouTube Video
  if (mediaType === 'youtube') {
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return (
        <div className={`relative flex flex-col items-center justify-center bg-black text-white p-6 ${aspectRatio} ${className}`}>
          <FaYoutube className="text-4xl text-red-500 mb-2" />
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
            Watch Video
          </a>
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden bg-black ${aspectRatio} ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0`}
          title={title || 'YouTube Video'}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // HTML5 / Cloudinary Video
  if (mediaType === 'video') {
    return (
      <div className={`relative overflow-hidden bg-black ${aspectRatio} ${className}`}>
        <video
          ref={videoRef}
          src={url}
          autoPlay={autoPlay}
          muted
          playsInline
          onEnded={onEnded}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Standard Image
  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <img
        src={url}
        alt={title}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#f7ebe3] animate-pulse" />
      )}
    </div>
  );
};
