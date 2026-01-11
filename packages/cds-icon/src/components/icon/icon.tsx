import React from 'react';

import { IconName } from '../../icon-list';

type IconProps = {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
  ariaHidden?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const Icon = ({
  name,
  width,
  height,
  className,
  ariaHidden,
  ...rest
}: IconProps) => {
  const computedWidth = width ?? 24;
  const computedHeight = height ?? 24;

  const toRem = (px: number, base = 10, digits = 4) =>
    `${Number((px / base).toFixed(digits))}rem`;

  return (
    <svg
      width={toRem(computedWidth)}
      height={toRem(computedHeight)}
      className={className}
      aria-hidden={ariaHidden ?? true}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
