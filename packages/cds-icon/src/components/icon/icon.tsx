import { SVGProps } from 'react';

import { color as colorToken } from '@cds/token';

import { IconName } from '../../icon-list';

type IconColor = keyof typeof colorToken;
interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  color?: IconColor;
  className?: string;
  ariaHidden?: boolean;
}

export const Icon = ({
  name,
  size,
  width,
  height,
  color,
  className,
  ariaHidden,
  ...rest
}: IconProps) => {
  const computedWidth = width ?? size ?? 32;
  const computedHeight = height ?? size ?? 32;

  const toRem = (px: number, base = 10) => `${Number(px / base)}rem`;

  return (
    <svg
      width={toRem(computedWidth)}
      height={toRem(computedHeight)}
      style={{
        color: color ? colorToken[color] : colorToken.grey700,
      }}
      className={className}
      aria-hidden={ariaHidden ?? true}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
