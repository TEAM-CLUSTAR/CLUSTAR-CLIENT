import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Icon } from '@cds/icon';

import Button from '../button/button';
import File, { type FileProps } from '../file/file';
import ImageContainer, {
  type ImageContainerProps,
} from '../image-container/image-container';
import LabelList, { type LabelListProps } from '../label-list/label-list';
import Modal from '../modal/modal';
import SelectedMemo from '../selected-memo/selected-memo';
import TextContent, {
  type TextContentProps,
} from '../text-content/text-content';

import * as styles from './detail-modal.css';

// api 명세 추가 시 해당 타입 삭제
interface SelectedMemoTypes {
  id: number;
  memoName: string;
}

interface DetailModalProps {
  children: ReactNode;
  labelList: Omit<LabelListProps, 'listType'>;
  images?: ImageContainerProps[];
  textContent: Omit<TextContentProps, 'mode'>;
  files?: FileProps[];
  selectedMemos?: SelectedMemoTypes[];
  memoId?: string;
  onAiCreateClick?: (memoId: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DetailModal = ({
  children,
  labelList,
  images,
  textContent,
  files,
  selectedMemos,
  memoId,
  onAiCreateClick,
  open,
  onOpenChange,
}: DetailModalProps) => {
  const { labelItems, dateText } = labelList;
  const { isAiResult, title, content } = textContent;

  const handleClick = () => {
    if (memoId && onAiCreateClick) {
      onAiCreateClick(memoId);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {open === undefined && <Modal.Trigger>{children}</Modal.Trigger>}
      {open !== undefined && children}
      <Modal.Content>
        <Dialog.Title className={styles.visuallyHidden}>{title}</Dialog.Title>
        <Dialog.Description className={styles.visuallyHidden}>
          {content}
        </Dialog.Description>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <div>
              <LabelList
                listType="modal"
                labelItems={labelItems}
                dateText={dateText}
                labelSize="lg"
              />
            </div>

            <Modal.Close>
              <button className={styles.closeButtonContainer} type="button">
                <Icon name="ic_close" width={28} height={28} />
              </button>
            </Modal.Close>
          </div>

          <div className={styles.contentContainer}>
            {images && (
              <div className={styles.imageContainer}>
                <div className={styles.imageInnerContainer}>
                  {images.map(({ imageUrl, imageAlt }) => (
                    <ImageContainer
                      key={imageUrl}
                      imageUrl={imageUrl}
                      imageAlt={imageAlt}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.textContentContainer({ isImg: !!images })}>
              <TextContent
                isAiResult={isAiResult}
                mode="detail"
                title={title}
                content={content}
              />
            </div>
          </div>
          {selectedMemos && (
            <div className={styles.selectedMemoContainer}>
              <p className={styles.selectedMemoCountContainer}>
                사용된 메모 ({selectedMemos?.length})
              </p>
              <div className={styles.selectedMemoContentContainer}>
                <div className={styles.selectedMemoContentInnerContainer}>
                  {selectedMemos.map(({ id, memoName }) => (
                    <SelectedMemo key={id} memoName={memoName} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {files && (
            <div className={styles.fileContainer}>
              <div className={styles.fileInnerContainer}>
                {files.map(({ fileName, fileSize, fileUrl }) => (
                  <File
                    key={fileUrl}
                    fileName={fileName}
                    fileSize={fileSize}
                    fileUrl={fileUrl}
                  />
                ))}
              </div>
            </div>
          )}

          <Modal.Close>
            <div className={styles.createAiMemoButton}>
              <Button size="xl" onClick={handleClick}>
                AI 생성 하기
              </Button>
            </div>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DetailModal;
