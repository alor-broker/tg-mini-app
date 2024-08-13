import { Injectable } from '@angular/core';
import { ApiConfigProvider, ApiErrorsTracker, ApiRequestOptions, ApiResponse, SearchFilter } from "@api-lib";
import { HttpClient } from "@angular/common/http";
import { BaseHttpApiService } from "../base-http-api.service";
import { Instrument, InstrumentKey, InstrumentResponse } from "./instruments-service.model";

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService extends BaseHttpApiService {

  constructor(
    configProvider: ApiConfigProvider,
    errorsTracker: ApiErrorsTracker,
    httpClient: HttpClient
  ) {
    super(
      configProvider,
      errorsTracker,
      httpClient
    );
  }

  searchInstruments(filters: SearchFilter, options?: ApiRequestOptions): ApiResponse<Instrument[]> {
    return this.sendRequest<Instrument[], InstrumentResponse[]>(
      (config) => this.httpClient.get<InstrumentResponse[]>(
        `${this.getInstrumentsUrl(config.apiUrl)}`,
        {
          params: {
            ...filters,
            IncludeUnknownBoards: false
          }
        }
      ),
      options,
      (res) => res.map(r => ({
        symbol: r.symbol,
        shortName: r.shortname,
        exchange: r.exchange,
        description: r.description,
        instrumentGroup: r.board ?? r.primary_board,
        isin: r.ISIN,
        currency: r.currency,
        minstep: r.minstep ?? 0.01
      }))
    )
  }

  getInstrument(instrument: InstrumentKey, options?: ApiRequestOptions): ApiResponse<Instrument> {
    return this.sendRequest<Instrument, InstrumentResponse>(
      (config) => this.httpClient.get<InstrumentResponse>(
        `${this.getInstrumentsUrl(config.apiUrl)}/${instrument.exchange}/${instrument.symbol}`
      ),
      options,
      (res) => ({
        symbol: res.symbol,
        shortName: res.shortname,
        exchange: res.exchange,
        description: res.description,
        instrumentGroup: res.board ?? res.primary_board,
        isin: res.ISIN,
        currency: res.currency,
        minstep: res.minstep ?? 0.01,
        pricestep: res.pricestep,
        lotsize: res.lotsize,
        cfiCode: res.cfiCode,
        type: res.type,
        marginbuy: res.marginbuy,
        marginsell: res.marginsell,
        expirationDate: res.cancellation,
        tradingStatus: res.tradingStatus
      })
    )
  }

  private getInstrumentsUrl(apiUrl: string) {
    return `${apiUrl}/md/v2/Securities`
  }
}
