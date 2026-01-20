import { ChangeEvent, useMemo, useState } from 'react';

import { Button } from '@cds/ui';

import { LabelTextType } from '@shared/types/label-type';

import { TabList, ToolBar } from '@entities/memo';

import { InputContent, InputTitle, LabelSelect } from '@features/memo';
import { htmlToMarkdown } from '@features/memo/models/html-to-markdown';

import { useCreateMemo } from '../../api/queries';
import type { MemoCreateRequest } from '../../api/type';

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
const DEFAULT_TITLE = 'untitled';
const DEFAULT_LABEL = '라벨없음' as LabelTextType;

const createId = () => crypto.randomUUID();
const createEmptyDraft = (id: string): MemoDraft => ({
  id,
  title: '',
  contents: '',
  labels: [],
});

const MemoInput = () => {
  const [{ initTabs, initSelectedId, initDraftsById }] = useState(() => {
    const id = createId();
    const tab: TabItem = { id, title: DEFAULT_TITLE, label: DEFAULT_LABEL };
    return {
      initTabs: [tab],
      initSelectedId: id,
      initDraftsById: { [id]: createEmptyDraft(id) } as DraftsById,
    };
  });

  const [tabs, setTabs] = useState<TabItem[]>(initTabs);
  const [selectedTabId, setSelectedTabId] = useState<string>(initSelectedId);
  const [draftsById, setDraftsById] = useState<DraftsById>(initDraftsById);

  const { mutate: createMemo } = useCreateMemo();

  const selectedDraft = draftsById[selectedTabId];

  const tabItemsView = useMemo(() => {
    return tabs.map((tab) => {
      const draft = draftsById[tab.id];
      const title = draft?.title?.trim();
      const firstLabel = draft?.labels?.[0]?.text;

      return {
        ...tab,
        title: title && title.length > 0 ? title : DEFAULT_TITLE,
        label: firstLabel ?? DEFAULT_LABEL,
      };
    });
  }, [tabs, draftsById]);

  const handleAddTab = () => {
    if (tabs.length >= MAX_TABS) return;

    const id = createId();

    setTabs((prevTabs) => [
      ...prevTabs,
      { id, title: DEFAULT_TITLE, label: DEFAULT_LABEL },
    ]);

    setDraftsById((prevDrafts) => ({
      ...prevDrafts,
      [id]: createEmptyDraft(id),
    }));

    setSelectedTabId(id);
  };

  const handleDeleteTab = (id: string) => {
    setTabs((prevTabs) => {
      if (prevTabs.length <= 1) return prevTabs;

      const nextTabs = prevTabs.filter((tab) => tab.id !== id);
      setDraftsById((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });

      const removedIndex = prevTabs.findIndex((tab) => tab.id === id);

      setSelectedTabId((prevSelected) => {
        if (prevSelected !== id) return prevSelected;

        const prevTab = nextTabs[removedIndex - 1];
        if (prevTab) return prevTab.id;

        const nextTab = nextTabs[removedIndex];
        return nextTab?.id ?? nextTabs[0]?.id ?? '';
      });

      return nextTabs;
    });
  };

  const handleSelectTab = (id: string) => {
    setSelectedTabId(id);
  };

  const patchSelectedDraft = (patch: Partial<Omit<MemoDraft, 'id'>>) => {
    setDraftsById((prev) => ({
      ...prev,
      [selectedTabId]: {
        ...prev[selectedTabId],
        ...patch,
      },
    }));
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    patchSelectedDraft({ title: e.target.value });
  };

  const handleChangeContents = (contents: string) => {
    patchSelectedDraft({ contents });
  };

  const handleChangeLabels = (labels: LabelItem[]) => {
    patchSelectedDraft({ labels });
  };

  const handleSubmit = () => {
    const request: MemoCreateRequest = {
      title: selectedDraft.title,
      content: htmlToMarkdown(selectedDraft.contents),
      labelNames: selectedDraft.labels.map((l) => l.text),
    };
    createMemo(request);
  };
  return (
    <div className={styles.memoInputContainer}>
      <TabList
        items={tabItemsView}
        selectedTabId={selectedTabId}
        handleAddTab={handleAddTab}
        handleDeleteTab={handleDeleteTab}
        handleSelectTab={handleSelectTab}
        maxTabs={MAX_TABS}
      />
      <div className={styles.inputContainer}>
        <div className={styles.contentsContainer}>
          <LabelSelect
            selectedItems={selectedDraft.labels}
            onSelect={handleChangeLabels}
          />

          <InputTitle
            title={selectedDraft.title}
            onChange={handleChangeTitle}
          />

          <InputContent
            key={selectedTabId}
            value={selectedDraft.contents}
            onChange={handleChangeContents}
          />
        </div>

        <div className={styles.footerContainer}>
          <ToolBar />
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!selectedDraft.contents || !selectedDraft.title}
          >
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoInput;
