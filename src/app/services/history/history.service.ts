import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { HistoryRequest } from "../../models/history/history-request.model";
import { HistoryResponse } from "../../models/history/history-response.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly baseUrl = environment.apiUrl + '/md/v2/history';

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getHistory(request: HistoryRequest): Observable<HistoryResponse | null> {
    return this.http.get<HistoryResponse>(this.baseUrl, { params: { ...request } }).pipe(
      catchError(() => of(null))
    );
  }
}
