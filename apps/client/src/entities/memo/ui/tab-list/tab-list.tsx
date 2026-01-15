import { Icon } from '@cds/icon';

import { LabelTextType } from '@shared/types/label-type';

import Tab from '../tab/tab';

import * as styles from './tab-list.css';

type TabItemType = {
  id: string;
  title: string;
  label: LabelTextType;
};

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
  const isDeleteTab = items.length > 1;

  return (
    <div className={styles.tabListContainer}>
      <div className={styles.memoMarer}>
        <Icon name="ic_memo_36" width={36} height={36} />
      </div>
      {items.map((item) => (
        <Tab
          key={item.id}
          id={item.id}
          title={item.title}
          label={item.label}
          isSelected={item.id === selectedTabId}
          handleSelect={() => handleSelectTab(item.id)}
          handleDelete={() => handleDeleteTab(item.id)}
          isDeleteTab={isDeleteTab}
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
