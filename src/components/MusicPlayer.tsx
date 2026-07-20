'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Naruto Shippuden OST — Loneliness (孤独)
const VIDEO_ID = 'F0f8sH_W4J0';

export const MusicPlayer = () => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(40);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initPlayer = useCallback(() => {
    if (playerRef.current || !window.YT) return;
    const container = document.getElementById('yt-music-player');
    if (!container) return;

    playerRef.current = new window.YT.Player('yt-music-player', {
      height: '1',
      width: '1',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: (e: any) => {
          e.target.setVolume(40);
          setIsReady(true);
        },
        onStateChange: (e: any) => {
          if (e.data === 0) {
            playerRef.current?.seekTo(0);
            playerRef.current?.playVideo();
          }
          setIsPlaying(e.data === 1);
        },
      },
    });
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    const checkAndInit = () => {
      if (window.YT && window.YT.Player && document.getElementById('yt-music-player')) {
        initPlayer();
        clearInterval(interval);
      }
    };

    checkAndInit();
    interval = setInterval(checkAndInit, 200);

    const loadAPI = () => {
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        checkAndInit();
      };
      loadAPI();
    }

    return () => {
      clearInterval(interval);
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, [initPlayer]);

  const togglePlay = () => {
    if (!isReady || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    playerRef.current?.setVolume(val);
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
      {/* YouTube player target */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <div id="yt-music-player" />
      </div>

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
              <p className="text-[12px] text-primary font-medium leading-snug">Loneliness</p>
              <p className="text-[10px] text-secondary/60">Naruto Shippuden OST</p>
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

        {/* Pill button */}
        <button
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300
            ${isPlaying
              ? 'bg-primary border-primary text-background shadow-lg'
              : 'bg-background border-border text-primary hover:border-primary/50 shadow-md'
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
                  isPlaying ? 'bg-background' : 'bg-secondary/40'
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
            className={`text-[10px] tracking-[0.2em] uppercase ${
              isPlaying ? 'text-background' : 'text-secondary/70'
            }`}
          >
            {!isReady ? 'Loading…' : isPlaying ? 'Playing' : 'Music'}
          </span>

          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={isPlaying ? 'text-background' : 'text-secondary/60'}
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
