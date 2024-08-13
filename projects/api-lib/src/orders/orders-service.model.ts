import { Side } from "../models/api.enums";
import { InstrumentKey } from "../instruments/instruments-service.model";

export interface NewOrder {
  side: Side;
  instrument: InstrumentKey;
  quantity: number;
}

export interface NewLimitOrder extends NewOrder {
  price: number;
}
