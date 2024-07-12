import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { BackButton, MainButton, SettingsButton, Telegram } from "../../models/telegram/telegram.model";

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  tg: Telegram;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.tg = document.defaultView.Telegram.WebApp;
  }

  get mainButton(): MainButton {
    return this.tg.MainButton;
  }

  get backButton(): BackButton {
    return this.tg.BackButton;
  }

  get settingsButton(): SettingsButton {
    return this.tg.SettingsButton;
  }

  getItemFromCloudStorage(key: string, callback: (error: Error | null, value: string) => void): void {
    this.tg.CloudStorage.getItem(key, callback);
  }

  setItemFromCloudStorage(key: string, value: string, callback?: (error: Error | null, isValueStored: boolean) => void): void {
    this.tg.CloudStorage.setItem(key, value, callback);
  }

  removeItemFromCloudStorage(key: string, callback?: (error: Error | null, isValueRemoved: boolean) => void): void {
    this.tg.CloudStorage.removeItem(key, callback);
  }
}
