import { ApiErrorsTracker } from "@api-lib";
import { ButtonType, LinksService, ModalService } from "@environment-services-lib";
import { HttpErrorResponse } from "@angular/common/http";
import { Clipboard } from "@angular/cdk/clipboard";
import { environment } from "../../../environments/environment";

enum ButtonId {
  Copy = 'copy',
  Support = 'support'
}

export class OrderApiErrorsTracker extends ApiErrorsTracker {

  private _modalService: ModalService;
  private _clipboard: Clipboard;
  private _linksService: LinksService;

  constructor(
    modalService: ModalService,
    clipboard: Clipboard,
    linksService: LinksService,
  ) {
    super();
    this._modalService = modalService;
    this._clipboard = clipboard;
    this._linksService = linksService;
  }

  override track(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this._modalService.showMessage({
          message:
            `Код ошибки: ${error.error.code}\n` +
            `Текст ошибки: ${error.error.message}\n\n` +
            'Для более подробной информации свяжитесь с поддержкой (текст ошибки будет скопирован в буфер обмена)',
          title: 'Ошибка выставления заявки',
          buttons: [
            {
              id: ButtonId.Copy,
              text: 'Скопировать текст ошибки'
            },
            {
              id: ButtonId.Support,
              text: 'Связаться с поддержкой'
            },
            {
              type: ButtonType.Close
            }
          ]
        })
        .subscribe(buttonId => {
          switch (buttonId) {
            case ButtonId.Copy:
              this._clipboard.copy(JSON.stringify(error));
              break;
            case ButtonId.Support:
              this._clipboard.copy(JSON.stringify(error));
              this._linksService.openApplicationLink(environment.externalLinks.tgAlorSupport)
          }
        });
    }
  }
}