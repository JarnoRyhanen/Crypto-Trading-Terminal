# Coinpulse - Crypto Trading Terminal

A modern, feature-rich cryptocurrency dashboard built with **Next.js**, **React**, and **TypeScript**. Explore real-time
crypto data, analyze price trends with interactive charts, and discover trending cryptocurrencies.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black.svg)
![React](https://img.shields.io/badge/React-19.2.4-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

---

## 🚀 Features

### Core Features

- **🏠 Home Dashboard**: Quick overview of cryptocurrency markets with trending coins and categories
- **📊 Interactive Charts**: Candlestick charts with multiple time periods (1D, 1W, 1M, 3M, 6M, 1Y)
- **📈 Market Data**: Browse all cryptocurrencies with real-time market data and 24-hour price changes
- **💱 Currency Converter**: Convert cryptocurrency values to different currencies
- **🔍 Detailed Coin Pages**: In-depth information about individual cryptocurrencies including:
    - Market cap and ranking
    - Historical price data
    - Volume and market dominance
    - Links to external resources
    - DEX pool information from GeckoTerminal
- **⚡ Live Data Streaming**: Real-time price updates with configurable refresh intervals (1s or 1m)
- **📱 Responsive Design**: Beautiful, responsive UI with dark theme
- **♿ Accessible**: Built with semantic HTML and accessible components

### Technical Features

- **Server-Side Rendering (SSR)**: Fast initial page loads with server components
- **Suspense & Streaming**: Progressive UI rendering with fallback states
- **Type Safety**: Full TypeScript support for type-safe development
- **Dark Mode**: Modern dark theme with carefully chosen color palette
- **Component Library**: Reusable UI components (buttons, tables, inputs, badges, etc.)
- **Code Quality**: ESLint and Prettier configured for consistent code style

---

## 🛠️ Tech Stack

### Frontend

- **[Next.js](https://nextjs.org/)** (16.2.10) - React framework with SSR/SSG
- **[React](https://react.dev/)** (19.2.4) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** (5) - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** (4) - Utility-first CSS framework
- **[Lightweight Charts](https://tradingview.github.io/lightweight-charts/)** (5.2.0) - Professional charting library
- **[Lucide React](https://lucide.dev/)** (1.25.0) - Icon library
- **[Base UI](https://base-ui.com/)** (1.6.0) - Accessible component primitives
- **[shadcn](https://shadcn.com/)** (4.13.0) - Copy-paste UI components

### Utilities

- **[clsx](https://github.com/lukeed/clsx)** - Conditional CSS class handling
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes
- **[query-string](https://github.com/sindresorhus/query-string)** - URL query string parsing
- **[tw-animate-css](https://github.com/cmhello/tw-animate-css)** - Tailwind animation utilities

### Development Tools

- **ESLint** (9) - Code quality and linting
- **Prettier** (3.9.4) - Code formatting
- **prettier-plugin-tailwindcss** - Tailwind CSS class sorting

### API

- **[CoinGecko API](https://www.coingecko.com/en/api)** - Real-time cryptocurrency market data
- **[GeckoTerminal](https://www.geckoterminal.com/)** - DEX pool information

---

## 📋 Prerequisites

- **Node.js** (18 or higher)
- **npm** or **yarn** package manager
- CoinGecko API key (free tier available at [coingecko.com/api](https://www.coingecko.com/en/api))

---

## 🏃 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/JarnoRyhanen/Crypto-Trading-Terminal.git
cd crypto-trading-terminal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# CoinGecko API Configuration
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=your_coingecko_api_key_here
```

You can get a free API key from [CoinGecko's developer dashboard](https://www.coingecko.com/en/api).

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📦 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

---

## 📁 Project Structure

```
crypto-trading-terminal/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                # Root layout with header
│   ├── page.tsx                  # Home dashboard
│   ├── coins/
│   │   ├── page.tsx              # All coins list with pagination
│   │   └── [id]/
│   │       └── page.tsx          # Individual coin detail page
│   └── globals.css               # Global styles
├── components/                    # Reusable React components
│   ├── ui/                       # Base UI components
│   │   ├── button.tsx
│   │   ├── table.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── pagination.tsx
│   │   └── separator.tsx
│   ├── home/                     # Home page components
│   │   ├── CoinOverView.tsx      # Market overview cards
│   │   ├── TrendingCoins.tsx     # Trending coins section
│   │   ├── Categories.tsx        # Cryptocurrency categories
│   │   └── fallback.tsx          # Suspense fallback UI
│   ├── Header.tsx                # Navigation header
│   ├── Datatable.tsx             # Coin listing table
│   ├── CoinsPagination.tsx       # Pagination controls
│   ├── CandlestickChart.tsx      # Interactive price charts
│   ├── CoinHeader.tsx            # Coin detail header
│   ├── Converter.tsx             # Currency converter
│   └── LiveDataWrapper.tsx       # Real-time data updates
├── lib/                          # Utility functions and API clients
│   ├── coingecko.actions.ts      # CoinGecko API integration
│   └── utils.ts                  # Helper utilities
├── hooks/                        # Custom React hooks
├── constants.ts                  # Configuration constants
├── type.d.ts                     # Global TypeScript types
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── .prettierrc.json              # Prettier configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Documentation
```

---

## 🎯 Key Components

### Pages

#### Home Page (`app/page.tsx`)

The landing page featuring:

- **Coin Overview Cards**: Key market statistics
- **Trending Coins**: Top trending cryptocurrencies
- **Categories**: Browse crypto by category

#### All Coins Page (`app/coins/page.tsx`)

Displays all cryptocurrencies with:

- Sortable/filterable data table
- Pagination support (10 coins per page)
- Real-time market data including price, market cap, and 24h change
- Quick access to individual coin details

#### Coin Details Page (`app/coins/[id]/page.tsx`)

Comprehensive information for each coin:

- Detailed market statistics
- Interactive candlestick chart with multiple timeframes
- Historical OHLC data
- DEX pool information
- Currency converter
- Links to official resources and websites

### Core Components

#### CandlestickChart (`components/CandlestickChart.tsx`)

Interactive technical analysis chart featuring:

- Multiple time periods: 1D, 1W, 1M, 3M, 6M, 1Y
- Candlestick and OHLC data visualization
- Touch/mouse interactions (zoom, pan)
- Custom styling with dark theme

#### Datatable (`components/Datatable.tsx`)

Flexible data table component for displaying:

- Cryptocurrency market data
- Customizable columns and cell rendering
- Support for images, text, and interactive links
- Responsive design for mobile devices

#### LiveDataWrapper (`components/LiveDataWrapper.tsx`)

Real-time data streaming component:

- Configurable update intervals (1s, 1m)
- Automatic price refreshes
- Live trading data updates

#### Converter (`components/Converter.tsx`)

Cryptocurrency to fiat currency converter:

- Quick value conversion
- Multiple currency support
- Real-time exchange rates

---

## 🔌 API Integration

### CoinGecko API (`lib/coingecko.actions.ts`)

The application uses the CoinGecko API for all cryptocurrency data:

**Key Endpoints Used:**

- `/coins/markets` - Get list of cryptocurrencies with market data
- `/coins/{id}` - Get detailed information about a specific coin
- `/coins/{id}/ohlc` - Get OHLC (Open, High, Low, Close) price data
- `/onchain/networks/{network}/tokens/{contractAddress}/pools` - Get DEX pool data

**Data Revalidation:**

- Default revalidation time: 60 seconds
- Uses Next.js incremental static regeneration for optimal performance

---

## 🚀 Performance Optimizations

- **Server Components**: Leverages Next.js Server Components for faster rendering
- **Suspense Boundaries**: Progressive UI rendering with fallback states
- **Image Optimization**: Next.js Image component with remote image support
- **Data Revalidation**: ISR (Incremental Static Regeneration) with 60-second revalidation
- **Code Splitting**: Automatic code splitting via Next.js

---

## 🐛 Known Issues & Limitations

- DEX pool data (GeckoTerminal) is only available for tokens with asset platform IDs
- OHLC data availability depends on CoinGecko's historical data coverage
- API rate limits may apply to free tier CoinGecko accounts
- Some charts may show limited historical data for newer tokens

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎉 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing the cryptocurrency API
- [Vercel](https://vercel.com/) for Next.js framework
- [TradingView](https://tradingview.com/) for Lightweight Charts library

---
