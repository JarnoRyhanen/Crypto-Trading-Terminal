import React from 'react';
import Link from 'next/link';

const Attribution = () => {
  return (
    <div className="attribution">
      <p>
        Data provided by{' '}
        <Link
          href="https://www.coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit CoinGecko - Free Cryptocurrency API and Data"
          className="coingecko-link"
        >
          CoinGecko
        </Link>
      </p>
    </div>
  );
};
export default Attribution;
