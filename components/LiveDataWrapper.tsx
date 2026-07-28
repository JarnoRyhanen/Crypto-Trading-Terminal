import React from 'react';
import { Separator } from '@/components/ui/separator';
import CandlestickChart from '@/components/CandlestickChart';
import { formatCurrency, timeAgo } from '@/lib/utils';
import Datatable from '@/components/Datatable';
import CoinHeader from '@/components/CoinHeader';
import { fetcher } from '@/lib/coingecko.actions';

const LiveDataWrapper = async ({ coinId, pool, coin, coinOHLCData, network }: LiveDataProps) => {
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

  const address = pool.attributes.address;
  let trades: Trade[] = [];

  if (network && address) {
    console.log(`Fetching ${coin.name} trades for network: ${network}, address: ${address}`);
    const tradesResponse = await fetcher<DemoTradeData>(
      `/onchain/networks/${network}/pools/${address}/trades`,
      undefined,
      300
    );

    trades = (tradesResponse.data ?? [])
      .map((trade) => ({
        price: parseFloat(trade.attributes?.price_from_in_usd ?? '0'),
        amount: parseFloat(trade.attributes?.to_token_amount ?? '0'),
        value:
          parseFloat(trade.attributes?.price_from_in_usd ?? '0') *
          parseFloat(trade.attributes?.to_token_amount ?? '0'),
        type: trade.attributes?.kind === 'buy' ? 'b' : 's',
        timestamp: new Date(trade.attributes?.block_timestamp ?? 0).getTime(),
      }))
      .slice(0, 10);
  }

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

      {trades.length > 0 ? (
        <div className="trades">
          <h4>Recent trades</h4>

          <Datatable
            columns={tradeColumns}
            data={trades}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      ) : (
        <div>
          <h4>No recent trades available for {coin.name}</h4>
        </div>
      )}
    </section>
  );
};
export default LiveDataWrapper;
