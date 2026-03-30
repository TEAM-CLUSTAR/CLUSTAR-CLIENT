import { Icon } from '@cds/icon';

import { LabelTextType } from '@shared/types/label-type';

import Tab from '../tab/tab';

import * as styles from './tab-list.css';

interface TabItemType {
  id: string;
  title?: string;
  label: LabelTextType;
}

interface TabListProps {
  items: TabItemType[];
  selectedTabId: string;
  handleAddTab: () => void;
  handleDeleteTab: (id: string) => void;
  handleSelectTab: (id: string) => void;
  maxTabs: number;
}

const TabList = ({
  items,
  selectedTabId,
  handleAddTab,
  handleDeleteTab,
  handleSelectTab,
  maxTabs,
}: TabListProps) => {
  const isAddTab = items.length < maxTabs;
  const isDefault = items.length > 1;

  return (
    <div className={styles.tabListContainer}>
      <div className={styles.memoMarker}>
        <Icon name="ic_memo_36" width={36} height={36} />
      </div>
      {items.map(({ id, title, label }) => (
        <Tab
          key={id}
          id={id}
          title={title}
          label={label}
          isSelected={id === selectedTabId}
          handleSelect={() => handleSelectTab(id)}
          handleDelete={() => handleDeleteTab(id)}
          isDefault={isDefault}
        />
      ))}
      {isAddTab && (
        <button
          type="button"
          onClick={handleAddTab}
          className={styles.addButton}
          aria-label="탭 추가"
        >
          <Icon name="ic_plus" width={28} height={28} />
        </button>
      )}
    </div>
  );
};

export default TabList;
