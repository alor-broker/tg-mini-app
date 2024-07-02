import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Trade } from "../../models/trades/trades.model";

@Injectable({
  providedIn: 'root'
})
export class TradesHistoryService {

  private readonly baseUrl = environment.apiUrl + '/md/stats';

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getTradesHistoryForPortfolio(
    exchange: string,
    portfolio: string,
    options?: Partial<{
      from: string | null;
      limit: number | null;
    }>
  ): Observable<Trade[] | null> {
    let params: { [propName: string]: any } = {
      descending: true,
      format: 'heavy'
    };

    if (options) {
      if (options.limit != null) {
        params.limit = options.limit;
      }

      if (options.from != null) {
        params.from = options.from;
      }
    }
    return this.http.get<Trade[]>(
      `${ this.baseUrl }/${ exchange }/${ portfolio }/history/trades`,
      {
        params
      }
    ).pipe(
      catchError(() => of(null)),
      map(trades => {
        if (trades == null) {
          return null;
        }

        return trades.map(t => ({
          ...t,
          date: new Date(t.date)
        }));
      })
    );
  }

  getTradesHistoryForSymbol(
    exchange: string,
    portfolio: string,
    symbol: string,
    options?: Partial<{
      from: string | null;
      limit: number | null;
    }>
  ): Observable<Trade[] | null> {
    let params: { [propName: string]: any } = {
      descending: true
    };

    if (options) {
      if (options.limit != null) {
        params.limit = options.limit;
      }

      if (options.from != null) {
        params.from = options.from;
      }
    }
    return this.http.get<Trade[]>(
      `${ this.baseUrl }/${ exchange }/${ portfolio }/history/trades/${ symbol }`,
      {
        params
      }
    ).pipe(
      catchError(() => of(null)),
      map(trades => {
        if (trades == null) {
          return null;
        }

        return trades.map(t => ({
          ...t,
          date: new Date(t.date)
        }));
      })
    );
  }
}
