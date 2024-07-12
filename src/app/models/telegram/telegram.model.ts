export enum ChartType {
  Users = 'users',
  Bots = 'bots',
  Groups = 'groups',
  Channels = 'channels'
}

export enum HapticStyle {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
  Rigid = 'rigid',
  Soft = 'soft'
}

export enum HapticType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

export enum BiometricType {
  Finger = 'finger',
  Face = 'face',
  Unknown = 'unknown'
}

export enum PopupButtonType {
  Default = 'default',
  Ok = 'ok',
  Close = 'close',
  Cancel = 'cancel',
  Destructive = 'destructive'
}

export interface Telegram {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  BackButton: BackButton;
  MainButton: MainButton;
  SettingsButton: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  BiometricManager: BiometricManager;
  isVersionAtLeast(version: string): boolean;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  onEvent(type: string, handler: (...args: any) => void): void;
  offEvent(type: string, handler: (...args: any) => void): void;
  sendData(data: string): void;
  switchInlineQuery(query: string, chatTypes?: ChartType[]): void;
  openLink(url: string, options?: { try_instant_view: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (invoiceStatus: string) => void): void;
  showPopup(params: PopupParams, callback?: (buttonId: string) => void): void;
  showAlert(message: string, alertCloseCallback?: () => void): void;
  showConfirm(message: string, alertCloseCallback?: (isOkBtnPressed: boolean) => void): void;
  showScanQrPopup(params: ScanQrPopupParams, callback?: (isOkBtnPressed: boolean) => boolean): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (textFromClipboard: string) => void): void;
  requestWriteAccess(alertCloseCallback?: (isAccessGranted: boolean) => void): void;
  requestContact(alertCloseCallback?: (isUserSharedPhone: boolean) => void): void;
  ready(): void;
  expand(): void;
  close(): void;
}

export interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  section_separator_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

export interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}

export interface PopupButton {
  id?: string;
  type?: PopupButtonType;
  text?: string;
}

export interface ScanQrPopupParams {
  text?: string;
}

interface Button {
  isVisible: boolean;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
  show(): void;
  hide(): void;
}

export interface BackButton extends Button {}

export interface SettingsButton extends Button {}

export interface MainButton extends Button {
  text: string;
  color: string;
  textColor: string;
  isActive: boolean;
  isProgressVisible: boolean;
  setText(text: string): void;
  enable(): void;
  disable(): void;
  showProgress(leaveActive: boolean): void;
  hideProgress(): void;
  setParams(params: MainButtonParams): void;
}

export interface MainButtonParams {
  text: string;
  color: string;
  text_color: string;
  is_active: boolean;
  is_visible: boolean;
}

export interface HapticFeedback {
  impactOccurred(style: HapticStyle): void;
  notificationOccurred(type: HapticType): void;
  selectionChanged(): void;
}

export interface CloudStorage {
  setItem(key: string, value: string, callback?: (error: Error | null, isValueStored: boolean) => void): void;
  getItem(key: string, callback: (error: Error | null, value: string) => void): void;
  getItems(keys: string[], callback: (error: Error | null, value: string[]) => void): void;
  removeItem(key: string, callback?: (error: Error | null, isValueRemoved: boolean) => void): void;
  removeItems(keys: string[], callback?: (error: Error | null, isValuesRemoved: boolean) => void): void;
  getKeys(callback: (error: Error | null, keys: []) => void): void;
}

export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: BiometricType;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;
  init(afterInitCallback?: () => void): BiometricManager;
  requestAccess(params: BiometricRequestAccessParams, callback?: (isUserGrantedAccess: boolean) => void): BiometricManager;
  authenticate(params: BiometricAuthenticateParams, callback?: (isAuthenticated: boolean, token: string) => void): BiometricManager;
  updateBiometricToken(token: string, callback?: (isTokenUpdated: boolean) => void): BiometricManager;
  openSettings(): BiometricManager;
}

export interface BiometricRequestAccessParams {
  reason?: string;
}

export interface BiometricAuthenticateParams {
  reason?: string;
}

export interface WebAppInitData {
  query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: WebAppChat;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: true;
  added_to_attachment_menu?: true;
  allows_write_to_pm?: true;
  photo_url?: string;
}

export interface WebAppChat {
  id: number;
  type: string;
  title: string;
  username?: string;
  photo_url?: string;
}
