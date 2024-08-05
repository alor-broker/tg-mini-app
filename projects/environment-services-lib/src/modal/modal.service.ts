import { Observable } from "rxjs";

export abstract class ModalService {

  abstract showMessage(message: string, title?: string): Observable<void>;
}
