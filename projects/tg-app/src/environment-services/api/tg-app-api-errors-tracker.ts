import { ApiErrorsTracker } from "@api-lib";

export class TgAppApiErrorsTracker extends ApiErrorsTracker {
  override track(error: Error): void {
    console.log(error);
  }

}
