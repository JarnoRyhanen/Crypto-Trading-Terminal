import React, { Suspense } from 'react';
import CoinOverView from '@/components/home/CoinOverView';
import TrendingCoins from '@/components/home/TrendingCoins';
import { CoinOverviewFallback, TrendingCoinsFallback } from '@/components/home/fallback';

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverView />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};
export default Page;
