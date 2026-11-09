import { ReactNode, CSSProperties, MouseEvent } from "react";

export interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  glare?: number;
  glareColor?: string;
  shadow?: number;
  shadowColor?: string;
  perspective?: number | string;
  radius?: number | string;
  smoothness?: number;
  parallax?: number;
  bleed?: number;
  axis?: "both" | "horizontal" | "vertical";
  reverse?: boolean;
  trackWindow?: boolean;
  floating?: boolean;
  gyroscope?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  overlayDepth?: number;
  backContent?: ReactNode;
  flipOnClick?: boolean;
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export declare const TiltedCardLayer: React.FC<{
  children?: ReactNode;
  depth?: number;
  className?: string;
  style?: CSSProperties;
}>;

declare const TiltedCard: React.FC<TiltedCardProps>;
export default TiltedCard;

