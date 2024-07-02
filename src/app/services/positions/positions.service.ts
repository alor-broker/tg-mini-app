import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { Position } from "../../models/positions/positions.model";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private readonly url = environment.apiUrl + '/md/v2/clients';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getAllByLogin(login: string): Observable<Position[] | null> {
    return this.http.get<Position[]>(`${ this.url }/${ login }/positions`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getAllByPortfolio(portfolio: string, exchange: string): Observable<Position[] | null> {
    return this.http.get<Position[]>(`${ this.url }/${ exchange }/${ portfolio }/positions`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getByPortfolio(portfolio: string, exchange: string, ticker: string): Observable<Position | null> {
    return this.http.get<Position>(`${ this.url }/${ exchange }/${ portfolio }/positions/${ ticker }`)
      .pipe(
        catchError(() => of(null))
      );
  }
}
