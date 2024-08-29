import { ApiErrorsTracker } from "@api-lib";
import { ButtonType, LinksService, ModalService } from "@environment-services-lib";
import { HttpErrorResponse } from "@angular/common/http";
import { Clipboard } from "@angular/cdk/clipboard";
import { environment } from "../../../environments/environment";
import { TranslatorService } from "../services/translator.service";
import { switchMap } from "rxjs";
import { OrderActionType } from "../models/order-api-errors-tracker.model";

enum ButtonId {
  Copy = 'copy',
  Support = 'support'
}

export class OrderApiErrorsTracker extends ApiErrorsTracker {

  private orderActionType: OrderActionType;

  constructor(
    private readonly modalService: ModalService,
    private readonly clipboard: Clipboard,
    private readonly linksService: LinksService,
    private readonly translatorService: TranslatorService,
    orderActionType: OrderActionType
  ) {
    super();

    this.orderActionType = orderActionType;
  }

  override track(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      this.translatorService.getTranslator('core/order-api-errors-tracker')
        .pipe(
          switchMap(t => this.modalService.showMessage({
              message:
                `${ t(['errorCode']) }: ${ error.error.code }\n` +
                `${ t(['errorText']) }: ${ error.error.message }\n\n` +
                `${ t(['helpInfo']) }`,
              title: this.orderActionType === OrderActionType.Create ? t(['createOrderErrorTitle']) : t(['cancelOrderErrorTitle']),
              buttons: [
                {
                  id: ButtonId.Copy,
                  text: t(['copyBtn'])
                },
                {
                  id: ButtonId.Support,
                  text: t(['supportBtn'])
                },
                {
                  type: ButtonType.Close
                }
              ]
            })
          )
        )
        .subscribe(buttonId => {
          switch (buttonId) {
            case ButtonId.Copy:
              this.clipboard.copy(JSON.stringify(error.error));
              break;
            case ButtonId.Support:
              this.clipboard.copy(JSON.stringify(error.error));
              this.linksService.openApplicationLink(environment.externalLinks.tgAlorSupport)
          }
        });
    }
  }
}
