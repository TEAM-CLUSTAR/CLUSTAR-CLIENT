import { ChangeEvent, useState } from 'react';

import { Button } from '@cds/ui';

import { LabelTextType } from '@shared/types/label-type';

import { TabList, ToolBar } from '@entities/memo';

import InputContent from '../input-content/input-content';
import InputTitle from '../input-title/input-title';
import LabelSelect from '../label-select/label-select';

import * as styles from './memo-input.css';

type TabItem = {
  id: string;
  title?: string;
  label: LabelTextType;
};

type LabelItem = {
  id: string;
  text: LabelTextType;
};

type MemoDraft = {
  id: string;
  title: string;
  contents: string;
  labels: LabelItem[];
};

type DraftsById = Record<string, MemoDraft>;

const MAX_TABS = 4;

const createId = () => crypto.randomUUID();

const createEmptyDraft = (id: string): MemoDraft => ({
  id,
  title: '',
  contents: '',
  labels: [],
});

const MemoInput = () => {
  // ✅ 최초 탭 1개를 “초기값”으로 생성 (useEffect X)
  const [{ initTabs, initSelectedId, initDraftsById }] = useState(() => {
    const id = createId();
    const tab: TabItem = { id, title: 'untitled', label: '라벨없음' };
    return {
      initTabs: [tab],
      initSelectedId: id,
      initDraftsById: { [id]: createEmptyDraft(id) } as DraftsById,
    };
  });

  const [tabs, setTabs] = useState<TabItem[]>(initTabs);
  const [selectedTabId, setSelectedTabId] = useState<string>(initSelectedId);
  const [draftsById, setDraftsById] = useState<DraftsById>(initDraftsById);

  const tabItemsView = () => {
    return tabs.map((tab) => {
      const draft = draftsById[tab.id];
      const title = draft?.title?.trim();
      const firstLabel = draft?.labels?.[0]?.text;

      return {
        ...tab,
        title: title && title.length > 0 ? title : `untiitled`,
        label: firstLabel ?? '라벨없음',
      };
    });
  };

  const selectedDraft = draftsById[selectedTabId];

  const handleAddTab = () => {
    if (tabs.length >= MAX_TABS) return;

    const id = createId();

    setTabs((prev) => [...prev, { id, title: 'untitled', label: '라벨없음' }]);
    setDraftsById((prev) => ({ ...prev, [id]: createEmptyDraft(id) }));
    setSelectedTabId(id);
  };

  const handleDeleteTab = (id: string) => {
    setTabs((prevTabs) => {
      if (prevTabs.length <= 1) return prevTabs;

      const removedIndex = prevTabs.findIndex((tab) => tab.id === id);
      const nextTabs = prevTabs.filter((tab) => tab.id !== id);

      // 3) “선택 탭”을 삭제한 경우 → 바로 이전 탭으로 이동 (없으면 다음)
      setSelectedTabId((prevSelected) => {
        if (prevSelected !== id) return prevSelected;

        const prevTab = nextTabs[removedIndex - 1]; // 바로 이전(삭제 전 index 기준)
        if (prevTab) return prevTab.id;

        const nextTab = nextTabs[removedIndex]; // 이전이 없으면 다음
        return nextTab?.id ?? nextTabs[0]?.id ?? '';
      });

      return nextTabs;
    });
  };

  const handleSelectTab = (id: string) => {
    setSelectedTabId(id);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;

    setDraftsById((prev) => ({
      ...prev,
      [selectedTabId]: {
        ...prev[selectedTabId],
        title,
      },
    }));
  };

  const handleChangeContents = (contents: string) => {
    setDraftsById((prev) => ({
      ...prev,
      [selectedTabId]: {
        ...prev[selectedTabId],
        contents,
      },
    }));
  };

  const handleChangeLabels = (labels: LabelItem[]) => {
    setDraftsById((prev) => ({
      ...prev,
      [selectedTabId]: {
        ...prev[selectedTabId],
        labels,
      },
    }));
  };

  const handleSubmit = () => {
    const draft = draftsById[selectedTabId];
    console.log(draft);
  };

  return (
    <div className={styles.memoInputContainer}>
      <div>
        <TabList
          items={tabItemsView()}
          selectedTabId={selectedTabId}
          handleAddTab={handleAddTab}
          handleDeleteTab={handleDeleteTab}
          handleSelectTab={handleSelectTab}
          maxTabs={MAX_TABS}
        />
      </div>

      <div className={styles.inputContainer}>
        <LabelSelect
          selectedItems={selectedDraft.labels}
          onSelect={handleChangeLabels}
        />

        <InputTitle title={selectedDraft.title} onChange={handleChangeTitle} />

        <InputContent
          key={selectedTabId}
          value={selectedDraft.contents}
          onChange={handleChangeContents}
        />

        <div className={styles.footerContainer}>
          <ToolBar />
          <Button size="lg" onClick={handleSubmit}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoInput;
