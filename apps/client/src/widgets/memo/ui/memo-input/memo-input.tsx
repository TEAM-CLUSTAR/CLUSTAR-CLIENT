import { ChangeEvent, useMemo, useState } from 'react';

import { Button, ConfirmModal } from '@cds/ui';

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [tabToDeleteId, setTabToDeleteId] = useState<string | null>(null);
  const [isHaveCancel, setIsHaveCancel] = useState(false);
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
    if (tabs.length <= 1) return;

    // 탭 삭제 모달은 취소 버튼 있음
    setTabToDeleteId(id);
    setIsHaveCancel(true);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTabDelete = () => {
    if (!tabToDeleteId) return;

    const idToDelete = tabToDeleteId;
    setTabs((prevTabs) => {
      const nextTabs = prevTabs.filter((tab) => tab.id !== idToDelete);

      setDraftsById((prev) => {
        const { [idToDelete]: _, ...rest } = prev;
        return rest;
      });

      const removedIndex = prevTabs.findIndex((tab) => tab.id === idToDelete);
      setSelectedTabId((prevSelected) => {
        if (prevSelected !== idToDelete) return prevSelected;

        const prevTab = nextTabs[removedIndex - 1];
        if (prevTab) return prevTab.id;

        const nextTab = nextTabs[removedIndex];
        return nextTab?.id ?? nextTabs[0]?.id ?? '';
      });

      return nextTabs;
    });

    setIsConfirmModalOpen(false);
    setTabToDeleteId(null);
    setIsHaveCancel(false);
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

    createMemo(request, {
      onSuccess: () => {
        // 저장하기 모달은 취소 버튼 없음
        setIsHaveCancel(false);
        setIsConfirmModalOpen(true);

        const currentTabId = selectedTabId;
        setTabs((prevTabs) => {
          if (prevTabs.length <= 1) {
            setDraftsById((prev) => ({
              ...prev,
              [currentTabId]: createEmptyDraft(currentTabId),
            }));
            return prevTabs;
          }

          const nextTabs = prevTabs.filter((tab) => tab.id !== currentTabId);

          setDraftsById((prev) => {
            const { [currentTabId]: _, ...rest } = prev;
            return rest;
          });

          const removedIndex = prevTabs.findIndex(
            (tab) => tab.id === currentTabId,
          );
          const prevTab = nextTabs[removedIndex - 1];
          if (prevTab) {
            setSelectedTabId(prevTab.id);
          } else {
            const nextTab = nextTabs[removedIndex];
            setSelectedTabId(nextTab?.id ?? nextTabs[0]?.id ?? '');
          }

          return nextTabs;
        });
      },
    });
  };

  const handleConfirmModalClose = () => {
    if (tabToDeleteId) {
      handleConfirmTabDelete();
      return;
    }

    // 저장하기 모달의 확인 버튼은 모달만 닫기
    setIsConfirmModalOpen(false);
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
          <div className={styles.buttonContainer}>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!selectedDraft.contents || !selectedDraft.title}
            >
              저장하기
            </Button>
          </div>
        </div>
        <ConfirmModal
          open={isConfirmModalOpen}
          onOpenChange={(open) => {
            setIsConfirmModalOpen(open);
            if (!open) {
              // 모달이 닫힐 때 상태 초기화
              setIsHaveCancel(false);
              setTabToDeleteId(null);
            }
          }}
          onCloseClick={handleConfirmModalClose}
          isHavedCancel={isHaveCancel}
        />
      </div>
    </div>
  );
};

export default MemoInput;
