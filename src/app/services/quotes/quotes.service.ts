import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { Quote } from "../../models/quotes/quotes.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private readonly baseUrl = environment.apiUrl + '/md/v2/Securities';

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getQuotes(symbol: string, exchange: string): Observable<Quote[] | null> {
    return this.http.get<Quote[]>(`${ this.baseUrl }/${ exchange }:${ symbol }/quotes`).pipe(
      catchError(() => of(null)),
    );
  }
}
