'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-surface/90 border border-border/60 backdrop-blur-md px-4 pb-3 shadow-lg shadow-black/5',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  active,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);

  const widthSpring = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightSpring = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith('http') || href.startsWith('mailto');

  const content = (
    <motion.div
      ref={ref}
      style={{ width: widthSpring, height: heightSpring }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative rounded-full border flex items-center justify-center transition-colors shadow-sm",
        active
          ? "bg-accent/5 border-accent text-accent"
          : "bg-background border-border text-secondary hover:text-accent hover:border-accent/40"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="px-2.5 py-1 rounded bg-surface border border-border text-[9px] font-mono tracking-wider uppercase text-primary absolute left-1/2 -top-10 w-fit whitespace-nowrap shadow-md pointer-events-none"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="flex items-center justify-center w-full h-full [&>svg]:w-[45%] [&>svg]:h-[45%]">
        {icon}
      </motion.div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {content}
    </Link>
  );
}

import { Menu, X } from 'lucide-react';

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-3 right-0 flex flex-col gap-2.5"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.href.startsWith('http') || item.href.startsWith('mailto') ? (
                  <a
                    href={item.href}
                    key={item.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "h-10 w-10 rounded-full border flex items-center justify-center shadow-md transition-colors",
                      item.active
                        ? "bg-accent/5 border-accent text-accent"
                        : "bg-surface border-border/80 text-secondary hover:text-accent"
                    )}
                  >
                    <div className="h-4 w-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">{item.icon}</div>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    key={item.title}
                    onClick={(e) => {
                      setOpen(false);
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(item.href);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className={cn(
                      "h-10 w-10 rounded-full border flex items-center justify-center shadow-md transition-colors",
                      item.active
                        ? "bg-accent/5 border-accent text-accent"
                        : "bg-surface border-border/80 text-secondary hover:text-accent"
                    )}
                  >
                    <div className="h-4 w-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">{item.icon}</div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/40 shadow-md transition-colors"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  );
};
