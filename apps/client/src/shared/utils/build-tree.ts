type TreeNode<T> = T & { children: TreeNode<T>[] };

interface BuildTreeOptions<T, K> {
  /** 각 항목의 고유 id */
  getId: (item: T) => K;
  /** 부모 항목의 id (루트면 null | undefined) */
  getParentId: (item: T) => K | null | undefined;
}

/**
 * id/parentId를 가진 평면(flat) 목록을 중첩 트리로 변환.
 * - 입력 순서를 유지.
 * - 부모를 찾지 못한(또는 parentId가 없는) 노드는 루트로 간주.
 *
 * @example
 * buildTree(labels, { getId: (l) => l.tagId, getParentId: (l) => l.parentId })
 */
export const buildTree = <T, K>(
  items: T[],
  { getId, getParentId }: BuildTreeOptions<T, K>,
): TreeNode<T>[] => {
  const nodeMap = new Map<K, TreeNode<T>>(
    items.map((item) => [
      getId(item),
      { ...item, children: [] } as TreeNode<T>,
    ]),
  );
  const roots: TreeNode<T>[] = [];

  for (const item of items) {
    const node = nodeMap.get(getId(item))!;
    const parentId = getParentId(item);
    const parent = parentId == null ? undefined : nodeMap.get(parentId);

    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
};
