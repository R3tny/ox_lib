
import type { Properties as CSSProperties } from 'csstype';

type IconAnimation = 'spin' | 'spinPulse' | 'spinReverse' | 'pulse' | 'beat' | 'fade' | 'beatFade' | 'bounce' | 'shake';

interface OptionsProps {
  position?: 'right-center' | 'left-center' | 'top-center' | 'bottom-center';
  control?: string;
  style?: CSSProperties;
  alignIcon?: 'top' | 'center';
}

export const showTextUI = (text: string, options?: OptionsProps): void => exports.ox_lib.showTextUI(text, options);

export const hideTextUI = (): void => exports.ox_lib.hideTextUI();

export const isTextUIOpen = (): boolean => exports.ox_lib.isTextUIOpen();
