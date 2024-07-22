import { Observable } from "rxjs";

export interface ApiConfig {
  apiUrl: string;
}

export abstract class ApiConfigProvider {
  abstract getConfig(): Observable<ApiConfig>
}
