import { ApiErrorsTracker } from "@api-lib";
import { ModalService } from "@environment-services-lib";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TgAppApiErrorsTracker extends ApiErrorsTracker {

  constructor(
    private readonly modalService: ModalService,
  ) {
    super();
  }

  override track(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this.modalService.showMessage(error.error.message, error.error.code)
        .subscribe()
    }
  }

}
