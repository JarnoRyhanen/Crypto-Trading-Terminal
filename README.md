# Crypto Trading Terminal

A lightweight crypto market dashboard and trading terminal UI built with Next.js (App Router), React and Tailwind. It
consumes CoinGecko API data and renders interactive candlestick charts using lightweight-charts. The codebase focuses on
a compact, composable UI with server components where appropriate and small client components for interactivity.

Table of contents

- Project status
- What it does (features)
- Architecture & data flow
- Detailed component map
- Charts & data handling
- Styling & CSS conventions
- Environment & security
- Local development
- Building & deployment
- Testing & quality
- Development workflow & git conventions
- Contribution guidelines
- Troubleshooting & known issues
- Credits & license

---

## Project status (current)

- Next.js 16+ with App Router and React 19 + TypeScript.
- Functional UI with server-side fetching using lib/coingecko.actions.ts.
- Candlestick chart using lightweight-charts; chart sizing set from container height and maintained with ResizeObserver.
- No automated tests or CI configured by default.

## What it does (features)

- Coin overview page with:
    - Responsive candlestick chart for OHLC data
    - Coin header (icon + formatted price)
    - Trending coins table (from /search/trending)
    - Categories table (from /coins/categories)
- Reusable Datatable and basic UI primitives (table, pagination, buttons) under components/ui.
- Centralized chart configuration in constants.ts for consistent theming.

## Architecture & data flow

High-level:

- Server components (app/* and components/home) call fetcher (...) from lib/coingecko.actions.ts to request CoinGecko
  endpoints. fetcher uses environment variables for base URL and API key and leverages Next's fetch revalidation option
  for caching.
- CandlestickChart.tsx is a client component — it receives pre-fetched OHLC data from server components, converts
  timestamps to seconds, and feeds the data to lightweight-charts.
- UI primitives (components/ui) are client components where interaction is required.

Sequence for chart rendering:

1. Server fetch returns OHLC data (timestamps in ms).
2. Parent component converts timestamps to seconds and passes data to CandlestickChart as props.
3. CandlestickChart creates a lightweight-charts chart with height = container.clientHeight and adds a Candlestick
   series.
4. ResizeObserver updates width and height (chart.applyOptions) so the chart fills its DOM box.

## Detailed component map (important files)

| Path                              | Purpose                                                                               |
|-----------------------------------|---------------------------------------------------------------------------------------|
| app/page.tsx                      | Main dashboard page; composes CoinOverView, TrendingCoins, Categories (uses Suspense) |
| components/CandlestickChart.tsx   | Client chart wrapper around lightweight-charts                                        |
| components/home/CoinOverView.tsx  | Fetches coin details and OHLC data, renders header + chart                            |
| components/home/TrendingCoins.tsx | Server component rendering trending coins table                                       |
| components/home/Categories.tsx    | Server component rendering categories table                                           |
| components/Datatable.tsx          | Generic table renderer using components/ui primitives                                 |
| components/ui/table.tsx           | Table primitives (Table, TableRow, TableCell, etc.)                                   |
| lib/coingecko.actions.ts          | Fetcher helper using COINGECKO_BASE_URL and COINGECKO_API_KEY                         |
| lib/utils.ts                      | formatCurrency, convertOHLCData, timeAgo, cn (class merge helper)                     |
| constants.ts                      | Chart colors, getChartConfig, getCandlestickConfig, period presets                    |
| type.d.ts                         | Ambient types (OHLCData, Period, CandlestickChartProps)                               |

## Charts & data handling (details)

- Data format:
    - CoinGecko OHLC timestamps are in milliseconds; code converts them to seconds for lightweight-charts.
    - convertOHLCData maps arrays to objects: { time, open, high, low, close } and filters duplicates.

- Chart sizing & lifecycle:
    - createChart (container, { height: container.clientHeight, ... }) is used for initial render.
    - ResizeObserver applies both width and height via chart.applyOptions so the chart fills the container as parents
      resize.
    - chart.timeScale ().fitContent () is called after data is set.

- Example chart config snippet (from constants.ts):

```ts
getChartConfig(height, timeVisible = true)
:
DeepPartial < ChartOptions > {
    return {
        width: 0,
        height,
        layout: {background: {color: '#0b1116'}, textColor: '#8f9fb1'},
        grid: {vertLines: {visible: false}, horzLines: {color: '#1a2332'}},
        crosshair: {mode: 1},
        timeScale: {timeVisible},
    };
}
```

## Styling & CSS conventions

- Tailwind CSS via @tailwindcss/postcss is used. Global styles live in app/globals.css.
- cn (...) helper merges clsx and tailwind-merge to avoid conflicting Tailwind classes.
- UI components use Tailwind utility classes inline; semantic HTML elements are used for tables and lists.

## Environment variables (summary table)

| Variable                      | Required | Purpose                                                |
|-------------------------------|---------:|--------------------------------------------------------|
| COINGECKO_BASE_URL            |      Yes | Base API URL (e.g., https://api.coingecko.com/api/v3)  |
| COINGECKO_API_KEY             |      Yes | Server-side API key (used in lib/coingecko.actions.ts) |
| NEXT_PUBLIC_COINGECKO_API_KEY |       No | Optional public key exposed to client code             |

## Scripts (summary table)

| Script               | Description                 |
|----------------------|-----------------------------|
| npm run dev          | Start Next.js dev server    |
| npm run build        | Build production assets     |
| npm run start        | Start production server     |
| npm run lint         | Run ESLint                  |
| npm run format       | Run Prettier to format code |
| npm run format:check | Check formatting            |

## Quick reference: common queries (table)

| Question                       | Location                                           |
|--------------------------------|----------------------------------------------------|
| Where is the chart configured? | constants.ts and components/CandlestickChart.tsx   |
| Where is the API fetcher?      | lib/coingecko.actions.ts                           |
| How are UI tables rendered?    | components/Datatable.tsx + components/ui/table.tsx |

## Local development

1. Install: npm install
2. Add .env.local with required variables (see Environment variables table)
3. Run: npm run dev
4. Open http://localhost:3000

## Building & deployment

- Build: npm run build
- Start: npm run start
- Deploy: recommended on Vercel; set env vars on the deployment platform.

## Testing & quality

- No tests currently included. Linting & formatting are configured via ESLint & Prettier.

## Development workflow & git conventions

- Branch naming: feature/<name> / fix/<issue>
- Commit messages: brief summary + body if needed
- Rebase/squash for clean PR history

## Troubleshooting & known issues

| Symptom                | Likely cause                               | Fix                                                                                    |
|------------------------|--------------------------------------------|----------------------------------------------------------------------------------------|
| Chart collapsed height | Parent has no explicit height              | Ensure ancestor containers have height or pass numeric height prop to CandlestickChart |
| API failures           | Missing env vars or rate limited           | Verify COINGECKO_BASE_URL & COINGECKO_API_KEY and check rate limits                    |
| Images not loading     | next.config.ts remotePatterns missing host | Add host to next.config.ts images.remotePatterns                                       |

## Credits & third-party

- CoinGecko API — market data
- lightweight-charts — charts
- lucide-react — icons
- Tailwind CSS ecosystem

## License

No license file included. Add a LICENSE if publishing.
