import { useMemo, useState } from 'react';

import { Icon } from '@cds/icon';
import { Modal } from '@cds/ui';

import { useGetTag } from '@shared/apis/tag/queries';
import ParentTagList from '@shared/components/parent-tag-list/parent-tag-list';
import TagCheckTree from '@shared/components/tag-check-tree/tag-check-tree';
import { flattenTree } from '@shared/utils/build-tree';

import TagSelectField from './tag-select-field/tag-select-field';

import * as styles from './filter-modal.css';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (tagIds: number[]) => void;
}

const FilterModal = ({ open, onOpenChange, onApply }: FilterModalProps) => {
  const { data: roots = [] } = useGetTag();
  const [activeRootId, setActiveRootId] = useState<number>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const activeRoot =
    roots.find((root) => root.tagId === activeRootId) ?? roots[0];
  const flatTags = useMemo(() => flattenTree(roots), [roots]);
  const selectedTags = flatTags.filter((tag) =>
    selectedIds.includes(tag.tagId),
  );

  const handleToggle = (tagId: number) => {
    setSelectedIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleApply = () => {
    onApply(selectedIds);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content ariaLabel="태그 필터링">
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.headerTitle}>태그 필터링</p>
            <Modal.Close>
              <button type="button" aria-label="닫기">
                <Icon name="ic_delete" size={24} color="grey700" />
              </button>
            </Modal.Close>
          </div>

          {roots.length ? (
            <div className={styles.body}>
              <ParentTagList
                tags={roots}
                selectedTagId={activeRoot?.tagId ?? 0}
                onSelect={setActiveRootId}
              />

              <div className={styles.panel}>
                <TagSelectField
                  selectedTags={selectedTags}
                  onRemoveTag={handleToggle}
                />

                <p className={styles.selectedLabel}>
                  {`선택된 태그(${selectedIds.length}개)`}
                </p>
                {activeRoot && (
                  <div className={styles.treeScroll}>
                    <TagCheckTree
                      tag={activeRoot}
                      selectedIds={selectedIds}
                      onToggle={handleToggle}
                    />
                  </div>
                )}

                <div className={styles.footer}>
                  {/** TODO 임시 버튼 공통 버튼 수정후 교체하겠습니다. */}
                  <Modal.Close>
                    <button type="button" className={styles.cancelButton}>
                      취소
                    </button>
                  </Modal.Close>
                  <button
                    type="button"
                    className={styles.applyButton({
                      disabled: selectedIds.length === 0,
                    })}
                    disabled={selectedIds.length === 0}
                    onClick={handleApply}
                  >
                    적용하기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // TODO: 빈 상태 UI 추후 작업
            <p>생성된 태그가 없습니다.</p>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default FilterModal;
