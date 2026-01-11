import { SVGProps } from 'react';

import { IconName } from '../../icon-list';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
  ariaHidden?: boolean;
}

export const Icon = ({
  name,
  size,
  width,
  height,
  className,
  ariaHidden,
  ...rest
}: IconProps) => {
  const computedWidth = width ?? size ?? 24;
  const computedHeight = height ?? size ?? 24;

  return (
    <svg
      width={
        typeof computedWidth === 'number' ? `${computedWidth}px` : computedWidth
      }
      height={
        typeof computedHeight === 'number'
          ? `${computedHeight}px`
          : computedHeight
      }
      className={className}
      aria-hidden={ariaHidden ?? true}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
