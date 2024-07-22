export interface ButtonConfig {
  color: string;
  disabledColor: string;
  bgColor: string;
}

export interface ThemeConfig {
  button: ButtonConfig;
}

export type ThemeConfigKey = keyof ThemeConfig;
