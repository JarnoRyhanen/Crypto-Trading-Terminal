import React from 'react';
import Image from 'next/image';
import Datatable from '@/components/Datatable';
import Link from 'next/link';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
          <span className="ml-2">{item.data.price_change_percentage_24h.usd.toFixed(2)}%</span>
        </div>
      );
    },
  },
  {
    header: 'price',
    cellClassName: 'price-cell',
    cell: (coin) => coin.item.data.price,
  },
];

const dummyTrending: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      market_cap_rank: 1,
      thumb: '/logo.svg',
      large: '/logo.svg',
      data: {
        price: 43256.78,
        price_change_percentage_24h: { usd: 2.34 },
      },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      market_cap_rank: 2,
      thumb: '/converter.svg',
      large: '/converter.svg',
      data: {
        price: 3189.12,
        price_change_percentage_24h: { usd: -1.12 },
      },
    },
  },
  {
    item: {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      market_cap_rank: 10,
      thumb: '/logo.svg',
      large: '/converter.svg',
      data: {
        price: 0.4567,
        price_change_percentage_24h: { usd: 4.56 },
      },
    },
  },
];

const Page = () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <div id="coin-overview">
          <div className="header pt-2">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              width={56}
              height={56}
              alt="bitcoin"
            />
            <div className="info">
              <p>Bitcoin / BTC</p>
              <h1>$43,256.78</h1>
            </div>
          </div>
        </div>
        <p>Trending Coins</p>
        <Datatable columns={columns} data={dummyTrending} rowKey={(row) => row.item.id} />{' '}
      </section>

      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};
export default Page;
