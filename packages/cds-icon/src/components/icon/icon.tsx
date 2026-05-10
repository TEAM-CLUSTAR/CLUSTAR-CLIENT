import { SVGProps } from 'react';

import { IconName } from '../../icon-list';

// TODO: color 타입을 tokens의 color 타입과 연동
//import { tokens } from '@cds/token';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
  ariaHidden?: boolean;
}

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

  const toRem = (px: number, base = 10) => `${Number(px / base)}rem`;

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
