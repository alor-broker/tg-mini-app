import { HapticStyle } from "./haptic-feedback-service.model";

export abstract class HapticFeedbackService {

  abstract impactOccurred(style: HapticStyle): void;
}
