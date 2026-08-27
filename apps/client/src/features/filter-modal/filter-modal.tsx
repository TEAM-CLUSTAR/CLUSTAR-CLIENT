import { useState } from 'react';

import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import { useFlatTags, useGetTag } from '@shared/apis/tag/queries';
import tagImage from '@shared/assets/images/empty-state/tag_image.svg';
import EmptyState from '@shared/components/empty-state/empty-state';
import ParentTagList from '@shared/components/parent-tag-list/parent-tag-list';
import TagCheckTree from '@shared/components/tag-check-tree/tag-check-tree';

import TagSelectField from './tag-select-field/tag-select-field';

import * as styles from './filter-modal.css';

interface FilterModalProps {
  open: boolean;
  selectedTagIds: number[];
  onOpenChange: (open: boolean) => void;
  onApply: (tagIds: number[]) => void;
}

const FilterModal = ({
  open,
  selectedTagIds,
  onOpenChange,
  onApply,
}: FilterModalProps) => {
  const { data: roots = [] } = useGetTag();
  const [activeRootId, setActiveRootId] = useState<number>();
  const [selectedIds, setSelectedIds] = useState<number[]>(selectedTagIds);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setSelectedIds(selectedTagIds);
  }

  const activeRoot =
    roots.find((root) => root.tagId === activeRootId) ?? roots[0];
  const { data: flatTags = [] } = useFlatTags();
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
                  <Modal.Close>
                    <Button size="md" variant="outlined">
                      취소
                    </Button>
                  </Modal.Close>
                  <Button size="md" variant="solid" onClick={handleApply}>
                    적용하기
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyBody}>
              <EmptyState
                imageSrc={tagImage}
                title="생성된 태그가 없습니다."
                description="새 메모 창에 들어가서 새로운 태그를 생성해보세요."
              />
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default FilterModal;
