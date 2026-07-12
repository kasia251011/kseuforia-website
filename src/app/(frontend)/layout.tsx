import type { Metadata } from 'next';

import { cn } from '@/utilities/ui';
import { GeistMono } from 'geist/font/mono';
import { Poppins, Alfa_Slab_One } from 'next/font/google';
import React from 'react';

import { AdminBar } from '@/components/AdminBar';
import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import { Providers } from '@/providers';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { draftMode } from 'next/headers';

import './globals.css';
import { getServerSideURL } from '@/utilities/getURL';
import dayjs from 'dayjs';

dayjs.locale('fr');

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-alfa-slab-one',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html className={cn(poppins.variable, alfaSlabOne.variable, GeistMono.variable)} lang="pl">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
