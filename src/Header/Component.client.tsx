'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import type { Header } from '@/payload-types';

import { Logo } from '@/components/Logo/Logo';
import { HeaderNav } from './Nav';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx('fixed top-0 inset-x-0 z-20 transition-colors duration-300', {
        'bg-primary': isScrolled,
        'bg-transparent': !isScrolled,
      })}
    >
      <div className="max-w-344! px-4 mx-auto">
        <div className="py-4 flex justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className={clsx(isScrolled && 'size-12!')} />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  );
};
