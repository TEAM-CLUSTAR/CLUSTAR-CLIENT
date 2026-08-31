/**
 * 사이드바 전체에서 선택된 항목.
 * 메뉴와 태그가 동시에 선택된 상태를 표현할 수 없다.
 */
export type SidebarSelection =
  | { type: 'menu'; path: string }
  | { type: 'tag'; tagId: number };
