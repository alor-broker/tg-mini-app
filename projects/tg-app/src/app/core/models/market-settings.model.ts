export interface MarketExchange {
  exchange: string;
  settings: ExchangeSettings;
}

export interface ExchangeSettings {
  // Default currency to display data (used in blotter).
  defaultPortfolioCurrencyInstrument: string;
  hasIssue?: boolean;
  hasPayments?: boolean;
  hasFinance?: boolean;
  hasDividends?: boolean;
  isInternational?: boolean;
  isDefault?: boolean;
  // This instrument will be selected if dashboard has no selection (for example when dashboard just created)
  defaultInstrument?: {
    symbol: string;
    instrumentGroup?: string;
  };
  // Exchange timezone. Used in TV chart to correctly display candle timestamps
  timezone: string;
  // Trading session in format of TV chart. See https://www.tradingview.com/charting-library-docs/latest/connecting_data/Trading-Sessions
  defaultTradingSession: string;
}

export interface MarketSettings {
  exchanges: MarketExchange[];
}
