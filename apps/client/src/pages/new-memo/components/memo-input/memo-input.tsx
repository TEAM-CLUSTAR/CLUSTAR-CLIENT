import { ChangeEvent, useMemo, useState } from 'react';

import { Button } from '@cds/ui';

import { htmlToMarkdown } from '@pages/new-memo/utils/html-to-markdown';

import ConfirmModal from '@shared/components/modals/confirm-modal/confirm-modal';
import { components } from '@shared/types/schema';

import { useCreateMemo } from '../../apis/queries';
import type { MemoCreateRequest } from '../../apis/type';
import { useNavigationBlocker } from '../../hooks/use-navigation-blocker';
import InputContent from '../input-content/input-content';
import InputTitle from '../input-title/input-title';
import TabList from '../tab-list/tab-list';
import ToolBar from '../toolbar/toolbar';

import * as styles from './memo-input.css';

type TagItem = components['schemas']['TagResponse'];

type TabItem = {
  id: string;
  title?: string;
};

export type MemoDraft = {
  id: string;
  title: string;
  contents: string;
  tags: TagItem[];
};

export type DraftsById = Record<string, MemoDraft>;

const MAX_TABS = 4;
const DEFAULT_TITLE = '제목없음';

const createId = () => crypto.randomUUID();
const createEmptyDraft = (id: string): MemoDraft => ({
  id,
  title: '',
  contents: '',
  tags: [],
});

const MemoInput = () => {
  const [{ initTabs, initSelectedId, initDraftsById }] = useState(() => {
    const id = createId();
    const tab: TabItem = { id, title: DEFAULT_TITLE };
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
  const [isCancel, setIsCancel] = useState(false);
  const { mutate: createMemo } = useCreateMemo();

  const { pendingNavigation, handleNavigationConfirm, handleNavigationCancel } =
    useNavigationBlocker({
      draftsById,
      isConfirmModalOpen,
      tabToDeleteId,
      setIsConfirmModalOpen,
      setIsCancel,
    });

  const selectedDraft = draftsById[selectedTabId];

  const tabItemsView = useMemo(() => {
    return tabs.map((tab) => {
      const draft = draftsById[tab.id];
      const title = draft?.title?.trim();

      return {
        ...tab,
        title: title && title.length > 0 ? title : DEFAULT_TITLE,
      };
    });
  }, [tabs, draftsById]);

  const handleAddTab = () => {
    if (tabs.length >= MAX_TABS) return;

    const id = createId();

    setTabs((prevTabs) => [...prevTabs, { id, title: DEFAULT_TITLE }]);

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
    const hasTags = draft.tags.length > 0;
    return hasTitle || hasContents || hasTags;
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

    if (!hasDraftChanges(draft)) {
      deleteTabById(id);
      return;
    }

    setTabToDeleteId(id);
    setIsCancel(true);
    setIsConfirmModalOpen(true);
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

  const handleSubmit = () => {
    const request: MemoCreateRequest = {
      title: selectedDraft.title,
      content: htmlToMarkdown(selectedDraft.contents),
      tagNames: selectedDraft.tags.map((l) => l.name ?? ''),
    };

    createMemo(request, {
      onSuccess: () => {
        setIsCancel(false);
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

  const handleModalOpenChange = (open: boolean) => {
    setIsConfirmModalOpen(open);
    if (!open) {
      setTabToDeleteId(null);
      if (pendingNavigation) handleNavigationCancel();
    }
  };

  const handleConfirmModalClose = () => {
    if (tabToDeleteId) {
      const idToDelete = tabToDeleteId;
      deleteTabById(idToDelete);
      setTabToDeleteId(null);
      return;
    }

    if (pendingNavigation) {
      handleNavigationConfirm(() => {});
      return;
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
          onConfirm={handleConfirmModalClose}
          hasCancel={isCancel}
        />
      </div>
    </div>
  );
};

export default MemoInput;
