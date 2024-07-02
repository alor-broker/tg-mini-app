import { Side } from "../side.model";
import { TimeInForce } from "./orders.model";
import { InstrumentKey } from "../instrument/instrument.model";

export interface NewLimitOrder {
  side: Side;
  instrument: InstrumentKey;
  quantity: number;
  price: number;
  icebergFixed?: number;
  icebergVariance?: number;
  timeInForce?: TimeInForce;
  topOrderPrice?: number | null;
  topOrderSide?: Side;
  bottomOrderPrice?: number | null;
  bottomOrderSide?: Side;
  orderEndUnixTime?: number;
}

export interface SubmitOrderResult {
  isSuccess: boolean;
  orderNumber?: string;
}
