import { Icon } from '@cds/icon';

import { TagNode } from '@shared/apis/tag/type';
import ParentTagList from '@shared/components/parent-tag-list/parent-tag-list';
import TagCheckTree from '@shared/components/tag-check-tree/tag-check-tree';
import { TreeNode } from '@shared/utils/build-tree';

import TagInputField from './tag-input-field/tag-input-field';
import { TagInputFieldProps } from './type';

import * as styles from './tag-popover.css';

type TagPopoverPanelProps =
  | {
      mode: 'browse';
      parentTags: TagNode[];
      selectedParentId: number;
      onSelectParent: (tagId: number) => void;
      tagTree: TreeNode<TagNode>;
      selectedIds: number[];
      onToggleTag: (tagId: number) => void;
    }
  | {
      mode: 'create';
      newTagName: string;
      onCreate: () => void;
    };

type TagPopoverProps = TagInputFieldProps & TagPopoverPanelProps;

const TagPopover = (props: TagPopoverProps) => {
  return (
    <div className={styles.container}>
      <TagInputField
        selectedTags={props.selectedTags}
        onRemoveTag={props.onRemoveTag}
        isOpen={props.isOpen}
        onFocus={props.onFocus}
        onEnter={props.onEnter}
      />

      {props.isOpen && (
        <div className={styles.panel}>
          {props.mode === 'browse' ? (
            <>
              <span className={styles.label}>
                태그 선택({props.selectedIds.length}개)
              </span>

              <div className={styles.contentContainer}>
                <ParentTagList
                  tags={props.parentTags}
                  selectedTagId={props.selectedParentId}
                  onSelect={props.onSelectParent}
                />
                <div className={styles.treeContainer}>
                  <TagCheckTree
                    tag={props.tagTree}
                    selectedIds={props.selectedIds}
                    onToggle={props.onToggleTag}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <span className={styles.label}>태그 생성</span>

              <button
                type="button"
                className={styles.createFieldButton}
                onClick={props.onCreate}
              >
                <Icon name="ic_plus" size={20} color="grey600" />
                <span className={styles.createText}>
                  {props.newTagName || '새로운 태그명'}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TagPopover;
