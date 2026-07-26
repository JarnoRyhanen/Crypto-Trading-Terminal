import React from 'react';
import Datatable from '@/components/Datatable';
import { fetcher } from '@/lib/coingecko.actions';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CoinsPagination from '@/components/CoinsPagination';

const Page = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 10;

  const coinsData = await fetcher<CoinMarketData[]>('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    sparkline: 'false ',
    price_change_percentage: '24h',
    per_page: perPage,
    page: currentPage,
  });

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: 'Coin',
      cellClassName: 'token-cell',
      cell: (coin) => {
        return (
          <div className="flex items-center gap-3">
            <Image src={coin.image} alt={coin.name} width={30} height={30} />
            <p>
              {coin.name} ({coin.symbol.toUpperCase()})
            </p>
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: (coin) => {
        const isTrendingUp = coin.market_cap_change_percentage_24h > 0;

        return (
          <div className={cn('change-value', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <p className="flex items-center">
              <span className="ml-2">
                {formatPercentage(coin.market_cap_change_percentage_24h)}
              </span>
              <span className="mr-2" />
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  const hasMorePages = coinsData.length === perPage;

  const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All coins</h4>
        <Datatable
          columns={columns}
          data={coinsData}
          rowKey={(coin) => coin.id}
          tableClassName="coins-table"
        />
        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  );
};
export default Page;
