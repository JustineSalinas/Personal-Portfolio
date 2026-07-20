'use client';

import React, { useRef, useState, useEffect } from 'react';

// Naruto Shippuden — Loneliness (Lofi Hip Hop Remix by Rifti Beats)
const VIDEO_ID = 'k5j4Y8rG-Ew';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

let apiLoadingPromise: Promise<void> | null = null;

const loadYouTubeAPI = (): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();

  if (apiLoadingPromise) return apiLoadingPromise;

  apiLoadingPromise = new Promise<void>((resolve) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      resolve();
    };
  });

  return apiLoadingPromise;
};

export const MusicPlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(40);
  const [isMounted, setIsMounted] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let active = true;
    let player: any = null;

    loadYouTubeAPI().then(() => {
      if (!active || !iframeRef.current) return;

      player = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event: any) => {
            if (!active) return;
            setIsReady(true);
            event.target.setVolume(volume);
          },
          onStateChange: (event: any) => {
            if (!active) return;
            if (event.data === 1) { // Playing
              setIsPlaying(true);
            } else if (event.data === 2) { // Paused
              setIsPlaying(false);
            }
          }
        }
      });
      playerRef.current = player;
    });

    return () => {
      active = false;
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  }, [isMounted]);

  // Sync volume changes with player
  useEffect(() => {
    if (isReady && playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(volume);
    }
  }, [volume, isReady]);

  const togglePlay = () => {
    if (!isReady || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
  };

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      if (!isPlaying) setIsExpanded(false);
    }, 400);
  };

  return (
    <>
      {/* Hidden iframe controller — standard size but offscreen to satisfy browser autoplay policies */}
      {isMounted && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&controls=0&loop=1&playlist=${VIDEO_ID}&origin=${encodeURIComponent(window.location.origin)}`}
          title="Naruto Loneliness Audio Stream"
          style={{
            position: 'fixed',
            width: '300px',
            height: '200px',
            bottom: '24px',
            left: '-500px', // Hidden offscreen
            pointerEvents: 'none',
            zIndex: -100,
            border: 'none',
          }}
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      )}

      {/* Floating widget */}
      <div
        className="fixed bottom-6 left-6 z-50 flex flex-col items-start select-none"
        style={{ fontFamily: 'var(--font-dm-mono), monospace' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Expandable info + volume panel */}
        <div
          className={`transition-all duration-300 ease-out overflow-hidden ${
            isExpanded || isPlaying
              ? 'max-h-40 opacity-100 mb-2'
              : 'max-h-0 opacity-0 pointer-events-none mb-0'
          }`}
        >
          <div className="bg-background border border-border rounded-xl px-4 py-3 shadow-lg w-[220px] space-y-3">
            {/* Song info */}
            <div>
              <p className="text-[9px] tracking-[0.25em] text-secondary/50 uppercase mb-1">Now Playing</p>
              <p className="text-[12px] text-primary font-medium leading-snug">Loneliness (Lofi Remix)</p>
              <p className="text-[10px] text-secondary/60">Rifti Beats</p>
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-secondary/50 flex-shrink-0">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolume}
                className="flex-1 cursor-pointer"
                style={{ accentColor: 'var(--primary)', height: '2px' }}
              />
              <span className="text-[9px] text-secondary/40 w-5 text-right">{volume}</span>
            </div>
          </div>
        </div>

        {/* Pill button with premium hover & active effects */}
        <button
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 ease-out
            hover:scale-[1.04] active:scale-[0.96] hover:shadow-lg
            ${isPlaying
              ? 'bg-primary border-primary text-background'
              : 'bg-background border-border text-primary hover:border-primary/80'
            }
            ${!isReady ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
          `}
        >
          {/* Waveform bars */}
          <div className="flex items-end gap-[2.5px] h-3.5 w-[18px]">
            {[0.5, 1, 0.65, 1, 0.55].map((h, i) => (
              <span
                key={i}
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-background' : 'bg-secondary/40 group-hover:bg-primary'
                }`}
                style={{
                  height: isPlaying ? `${h * 100}%` : '28%',
                  ...(isPlaying
                    ? {
                        animation: `musicBar ${500 + i * 130}ms ease-in-out ${i * 80}ms infinite alternate`,
                      }
                    : {}),
                }}
              />
            ))}
          </div>

          <span
            className={`text-[10px] tracking-[0.25em] uppercase font-bold transition-colors ${
              isPlaying ? 'text-background' : 'text-secondary/80 hover:text-primary'
            }`}
          >
            {!isReady ? 'Loading…' : isPlaying ? 'Playing' : 'Music'}
          </span>

          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`transition-transform duration-300 ${
              isPlaying ? 'text-background rotate-90' : 'text-secondary/60 hover:text-primary hover:scale-110'
            }`}
          >
            {isPlaying ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
      </div>

      <style jsx global>{`
        @keyframes musicBar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
};
