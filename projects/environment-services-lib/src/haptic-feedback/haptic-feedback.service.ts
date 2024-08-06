import { ImpactHapticStyle } from "./haptic-feedback-service.model";
import { NotificationType } from "@m1cron-labs/ng-telegram-mini-app";

export abstract class HapticFeedbackService {

  abstract impactOccurred(style: ImpactHapticStyle): void;

  abstract notificationOccurred(style: NotificationType): void;
}
