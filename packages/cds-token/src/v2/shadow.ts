import { color } from './color';

const shadowColor = color.shadow.color;

export const shadow = {
  /** 면 위로 살짝 뜬 칸 */
  raised: `0 0.1rem 0.2rem 0 ${shadowColor}`,
  /** 마우스를 올린 카드 */
  hover: `0 0.4rem 1.2rem 0 ${shadowColor}`,
  /** 떠 있는 면 */
  floating: `0 0.4rem 1.6rem 0 ${shadowColor}`,
  /** 끌고 있는 카드 */
  drag: `0 0.2rem 0.6rem 0 ${shadowColor}, 0 1.6rem 4rem -0.4rem ${shadowColor}`,
  /** 모달 확인창 */
  modal: `0 0.8rem 3.2rem 0 ${shadowColor}`,
} as const;
