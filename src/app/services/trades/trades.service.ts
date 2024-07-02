import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, of } from "rxjs";
import { RepoTrade, Trade } from "../../models/trades/trades.model";

@Injectable({
  providedIn: 'root'
})
export class TradesService {

  private readonly baseUrl = environment.apiUrl + '/md/v2/Clients';

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getCurrentSessionTrades(portfolio: string, exchange: string): Observable<Trade[] | null> {
    return this.http.get<Trade[]>(`${ this.baseUrl }/${ exchange }/${ portfolio }/trades`, {
        params: {
          format: 'heavy'
        }
      })
      .pipe(
        catchError(() => of(null))
      );
  }

  getRepoTrades(portfolio: string, exchange: string): Observable<RepoTrade[]> {
    return this.http.get<RepoTrade[]>(`${ this.baseUrl }/${ exchange }/${ portfolio }/trades`, {
        params: {
          withRepo: true,
          format: 'heavy'
        }
      })
      .pipe(
        map(trades => trades.filter(t => t.repoSpecificFields != null)),
        catchError(() => of(null))
      );
  }
}
