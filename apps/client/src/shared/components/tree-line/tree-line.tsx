import { ReactNode } from 'react';

import * as styles from './tree-line.css';

export interface TreeLineRootProps {
  children: ReactNode;
}

/**
 * 계층 구조를 커넥터 라인과 함께 보여주는 목록.
 *
 * `ul`/`li`를 컴포넌트가 소유하므로 사이에 다른 태그를 끼우면 안 된다.
 *
 * @example
 * <TreeLine>
 *   <TreeLine.Item>
 *     부모
 *     <TreeLine.Branch>
 *       <TreeLine.Item>자식</TreeLine.Item>
 *     </TreeLine.Branch>
 *   </TreeLine.Item>
 * </TreeLine>
 */
const TreeLineRoot = ({ children }: { children: ReactNode }) => {
  return <ul className={styles.root}>{children}</ul>;
};

/**
 * 트리 노드 하나(`li`).
 */
const Item = ({ children }: { children: ReactNode }) => {
  return <li className={styles.item}>{children}</li>;
};

/**
 * 자식 노드 묶음(`ul`). 이 안에 놓인 `TreeLine.Item`에만 커넥터가 그려진다.
 */
const Branch = ({ children }: { children: ReactNode }) => {
  return <ul className={styles.branch}>{children}</ul>;
};

const TreeLine = Object.assign(TreeLineRoot, {
  Item,
  Branch,
});

export default TreeLine;
