'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import CandlestickChart from '@/components/CandlestickChart';
import { formatCurrency, timeAgo } from '@/lib/utils';
import Datatable from '@/components/Datatable';
import CoinHeader from '@/components/CoinHeader';

const LiveDataWrapper = ({ children, coinId, pool, coin, coinOHLCData }: LiveDataProps) => {
  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : '-'),
    },
    {
      header: 'Amount',
      cellClassName: 'amount-cell',
      cell: (trade) => trade.amount?.toFixed(4) ?? '-',
    },
    {
      header: 'Value',
      cellClassName: 'value-cell',
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : '-'),
    },
    {
      header: 'Buy/Sell',
      cellClassName: 'type-cell',
      cell: (trade) => (
        <span className={trade.type === 'b' ? 'text-green-500' : 'text-red-500'}>
          {trade.type === 'b' ? 'Buy' : 'Sell'}
        </span>
      ),
    },
    {
      header: 'Time',
      cellClassName: 'time-cell',
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : '-'),
    },
  ];

  // TODO find a way to get the pool network
  // const poolAddress = pool.attributes.address;
  /*  const trades = await fetcher<Trade[]>(
      `/onchain/networks/${pool.network}/pools/${pool.address}/trades`,
      undefined,
      300
    );*/

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        currentPrice={coin.market_data.current_price.usd}
        image={coin.image.large}
        priceChangePercentage30d={coin.market_data.price_change_percentage_30d_in_currency.usd}
        priceChange24h={coin.market_data.price_change_percentage_24h_in_currency.usd}
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>

      <Separator className="divider" />

      {tradeColumns && (
        <div className="trades">
          <h4>Recent trades</h4>

          <Datatable
            columns={tradeColumns}
            data={[]}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )}
    </section>
  );
};
export default LiveDataWrapper;
