'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Network', href: '/' },
    { label: 'Schedule', href: '/calendar' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top accent stripe */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

      <div
        className="px-8 py-0 flex items-center justify-between"
        style={{
          background: 'linear-gradient(180deg, rgba(8,10,15,0.98) 0%, rgba(13,16,23,0.95) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          height: '56px',
        }}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4 group">
          <div
            className="flex items-center justify-center italic font-black text-white text-[11px] transition-all group-hover:scale-105"
            style={{
              width: '32px',
              height: '32px',
              background: 'var(--red)',
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              letterSpacing: '0.05em',
            }}
          >
            PL
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-f1 font-black uppercase italic tracking-tighter text-white text-sm leading-none">
              PitLine <span className="text-primary">2026</span>
            </span>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] font-mono">
              Oracle Mission Control
            </span>
          </div>
        </Link>

        {/* NAV ITEMS */}
        <div className="hidden md:flex items-center">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-6 py-0 flex items-center h-[56px] text-[9px] font-black uppercase tracking-[0.35em] italic transition-all ${
                  isActive ? 'text-primary' : 'text-white/30 hover:text-white/70'
                }`}
              >
                {item.label}
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    isActive ? 'bg-primary shadow-[0_0_8px_rgba(225,6,0,0.8)]' : 'bg-transparent'
                  }`}
                />
                {/* Separator lines between items — first item has left border */}
                {i === 0 && (
                  <span className="absolute left-0 top-3 bottom-3 w-px bg-white/[0.06]" />
                )}
                <span className="absolute right-0 top-3 bottom-3 w-px bg-white/[0.06]" />
              </Link>
            );
          })}
        </div>

        {/* STATUS & PROFILE */}
        <div className="flex items-center gap-5">
          {/* Live indicator */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="live-pulse" />
            <div className="flex flex-col leading-none">
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.35em]">
                Oracle Cloud Feed
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/[0.08]" />

          {/* Profile */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 cursor-pointer transition-all hover:bg-white/5 rounded"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div
              className="w-6 h-6 flex items-center justify-center font-black italic text-white text-[9px]"
              style={{
                background: 'linear-gradient(135deg, rgba(225,6,0,0.3), rgba(225,6,0,0.1))',
                border: '1px solid rgba(225,6,0,0.3)',
                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              }}
            >
              M
            </div>
            <span className="text-[9px] font-black text-white italic uppercase tracking-tight">
              Profile
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
