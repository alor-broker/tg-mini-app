import { Injectable } from "@angular/core";
import {
  ThemeConfig,
  ThemeConfigKey,
  ThemingService
} from "@environment-services-lib";

@Injectable({ providedIn: 'root' })
export class TgThemingService extends ThemingService {
  // just for example
  private readonly config: ThemeConfig = {
    button: {
      color: 'white',
      disabledColor: 'gray',
      bgColor: 'red'
    }
  };

  override getThemeConfig(): ThemeConfig {
    return this.config
  }

  override getConfigForComponent<T extends ThemeConfigKey>(componentName: T): ThemeConfig[T] {
    return this.config[componentName];
  }
}
