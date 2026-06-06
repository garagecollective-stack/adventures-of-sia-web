'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/',           label: 'Home',       type: 'page'   },
  { href: '#meet-sia',   label: 'About Sia',  type: 'scroll' },
  { href: '#adventures', label: 'Adventures', type: 'scroll' },
  { href: '#adventures', label: 'Stories',    type: 'scroll' },
  { href: '/games',      label: 'Games',      type: 'page'   },
  { href: '#adventures', label: 'Videos',     type: 'scroll' },
  { href: '#',           label: 'Shop',       type: 'page'   },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 140)
          setActive('#' + s.id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    if (!isHome) {
      router.push('/' + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-3'} px-4 sm:px-6`}>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex items-center justify-between h-[68px] sm:h-[78px] px-4 sm:px-6 rounded-[28px] nav-floating"
      >
        {/* Logo → home */}
        <Link href="/" aria-label="Adventures of Sia home"
          className="shrink-0 hover:scale-105 transition-transform duration-300 relative z-10">
          <Image src="/images/logo-new.webp" alt="Adventures of Sia"
            width={280} height={210} className="object-contain w-auto h-[76px] sm:h-[112px]" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(l => {
            const isActive = l.type === 'scroll' && active === l.href;
            return l.type === 'scroll' ? (
              <motion.button key={l.label} onClick={() => scrollTo(l.href)}
                whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}
                className="relative px-3.5 py-2 font-body font-semibold text-[0.88rem]
                           transition-colors duration-150 whitespace-nowrap focus-visible:outline-none"
                style={{ color: isActive ? '#A88CFF' : '#8B86A0' }}>
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[3px] rounded-full block"
                    style={{ background: 'linear-gradient(90deg,#A88CFF,#FF9DC4)' }} />
                )}
              </motion.button>
            ) : (
              <Link key={l.label} href={l.href}
                className="px-3.5 py-2 font-body font-semibold text-[0.88rem] whitespace-nowrap
                           text-[#8B86A0] hover:text-[#A88CFF] transition-colors duration-150">
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {/* Parents */}
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link href="/parents"
              className="font-body font-bold text-[0.85rem] text-white px-6 py-2.5 rounded-full whitespace-nowrap inline-block
                         shadow-[0_4px_16px_rgba(255,134,181,0.4)]"
              style={{ background: 'linear-gradient(135deg,#FF9DC4 0%,#FF86B5 100%)' }}>
              Parents
            </Link>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <motion.button onClick={() => setOpen(!open)} whileTap={{ scale: 0.92 }}
            className="min-w-[44px] min-h-[44px] w-10 h-10 rounded-full flex items-center justify-center
                       bg-[#A88CFF]/8 text-[#A88CFF] border border-[#A88CFF]/15">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div key="drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden mt-2 max-w-7xl mx-auto rounded-[24px] overflow-hidden nav-floating">
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(l => (
                l.type === 'scroll' ? (
                  <button key={l.label} onClick={() => scrollTo(l.href)}
                    className="text-left px-4 py-3.5 rounded-2xl font-body font-semibold text-[0.95rem] text-[#8B86A0]
                               hover:text-[#A88CFF] hover:bg-[#A88CFF]/8 transition-all">
                    {l.label}
                  </button>
                ) : (
                  <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                    className="px-4 py-3.5 rounded-2xl font-body font-semibold text-[0.95rem] text-[#8B86A0]
                               hover:text-[#A88CFF] hover:bg-[#A88CFF]/8 transition-all">
                    {l.label}
                  </Link>
                )
              ))}
              <div className="mt-2 pt-3 border-t border-[#A88CFF]/10">
                <Link href="/parents" onClick={() => setOpen(false)}
                  className="block text-center py-3 rounded-2xl font-body font-bold text-[0.9rem] text-white"
                  style={{ background: 'linear-gradient(135deg,#FF9DC4,#FF86B5)' }}>
                  Parents
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
