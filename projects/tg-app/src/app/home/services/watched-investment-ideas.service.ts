import { Injectable } from '@angular/core';
import { StorageService } from "@environment-services-lib";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WatchedInvestmentIdeasService {

  private readonly watchedIdeasKey = 'watched-ideas';

  constructor(
    private readonly storageService: StorageService
  ) { }

  getWatchedIdeasIds(): Observable<number[]> {
    return this.storageService.getItem(this.watchedIdeasKey)
      .pipe(
        map((ideas: string | null) => ideas == null ? [] : JSON.parse(ideas))
      );
  }

  setWatchedIdeasIds(ids: number[]): void {
    this.storageService.setItem(this.watchedIdeasKey, JSON.stringify(ids))
      .subscribe();
  }
}
