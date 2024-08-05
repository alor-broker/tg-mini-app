import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, take } from "rxjs";
import { PasswordCheckParams } from "./password-check-service.model";
import { StorageService } from "@environment-services-lib";
import { StorageKeys } from "../../core/utils/storage-keys";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PasswordCheckService {

  private isPasswordTurnedOff$!: Observable<boolean>;
  private passwordCheckParamsSub = new BehaviorSubject<PasswordCheckParams>({ isChecked: false });
  passwordCheckParams$ = this.passwordCheckParamsSub.asObservable();

  constructor(
    private readonly storageService: StorageService
  ) {
    this.isPasswordTurnedOff$ = storageService.getItem(StorageKeys.AppPassword)
      .pipe(
        map(password => password === 'null'),
        shareReplay(1)
      );

    this.isPasswordTurnedOff$
      .pipe(
        take(1)
      )
      .subscribe(isTurnedOff => {
        this.passwordCheckParamsSub.next({ isChecked: isTurnedOff })
      })
  }

  checkPassword(isBackVisible = false) {
    this.isPasswordTurnedOff$
      .pipe(
        filter(isTurnedOff => !isTurnedOff),
        take(1)
      )
      .subscribe(() =>
        this.passwordCheckParamsSub.next({ isChecked: false, isBackVisible })
      )
  }

  passwordChecked(isSuccess: boolean) {
    this.passwordCheckParamsSub.next({ isChecked: true, isSuccess });
  }
}
