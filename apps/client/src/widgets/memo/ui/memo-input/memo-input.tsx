import { ChangeEvent, useMemo, useState } from 'react';

import { Button, ConfirmModal } from '@cds/ui';

import { LabelTextType } from '@shared/types/label-type';

import { TabList, ToolBar } from '@entities/memo';

import { InputContent, InputTitle, LabelSelect } from '@features/memo';
import { htmlToMarkdown } from '@features/memo/models/html-to-markdown';

import { useCreateMemo } from '../../api/queries';
import type { MemoCreateRequest } from '../../api/type';
import { useNavigationBlocker } from './use-navigation-blocker';

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

export type MemoDraft = {
  id: string;
  title: string;
  contents: string;
  labels: LabelItem[];
};

export type DraftsById = Record<string, MemoDraft>;

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

  const { pendingNavigation, handleNavigationConfirm, handleNavigationCancel } =
    useNavigationBlocker({
      draftsById,
      isConfirmModalOpen,
      tabToDeleteId,
      setIsConfirmModalOpen,
      setIsHaveCancel,
    });

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

  const hasDraftChanges = (draft: MemoDraft | undefined) => {
    if (!draft) return false;
    const hasTitle = draft.title.trim().length > 0;
    const hasContents = draft.contents.trim().length > 0;
    const hasLabels = draft.labels.length > 0;
    return hasTitle || hasContents || hasLabels;
  };

  const deleteTabById = (idToDelete: string) => {
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
  };

  const handleDeleteTab = (id: string) => {
    if (tabs.length <= 1) return;

    const draft = draftsById[id];

    // 선택한 탭에 작성된 내용이 없으면 모달 없이 바로 삭제
    if (!hasDraftChanges(draft)) {
      deleteTabById(id);
      return;
    }

    // 내용이 있는 탭만 ConfirmModal 표시
    setTabToDeleteId(id);
    setIsHaveCancel(true);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTabDelete = () => {
    if (!tabToDeleteId) return;

    const idToDelete = tabToDeleteId;
    deleteTabById(idToDelete);

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

    if (pendingNavigation) {
      handleNavigationConfirm(() => {});
      return;
    }

    setIsConfirmModalOpen(false);
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsConfirmModalOpen(open);
    if (!open) {
      setIsHaveCancel(false);
      setTabToDeleteId(null);
      if (pendingNavigation) {
        handleNavigationCancel();
      }
    }
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
          onOpenChange={handleModalOpenChange}
          onCloseClick={handleConfirmModalClose}
          isHavedCancel={isHaveCancel}
        />
      </div>
    </div>
  );
};

export default MemoInput;
