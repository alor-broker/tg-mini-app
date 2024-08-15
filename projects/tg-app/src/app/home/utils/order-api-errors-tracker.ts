import { ApiErrorsTracker } from "@api-lib";
import { ModalService } from "@environment-services-lib";
import { HttpErrorResponse } from "@angular/common/http";

export class OrderApiErrorsTracker extends ApiErrorsTracker {

  private _modalService: ModalService;

  constructor(modalService: ModalService) {
    super();
    this._modalService = modalService;
  }

  override track(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this._modalService.showMessage(error.error.message, error.error.code)
        .subscribe()
    }
  }
}
