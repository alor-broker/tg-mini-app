export interface MarketExchange {
  exchange: string;
  settings: ExchangeSettings;
}

export interface ExchangeSettings {
  isDefault?: boolean;
}

export interface MarketSettings {
  exchanges: MarketExchange[];
}
