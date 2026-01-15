import { ReactNode } from 'react';

import { Icon } from '@cds/icon';

import Button, { type ButtonProps } from '../button/button';
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
  labelList: Omit<LabelListProps, 'listType'>;
  textContent: Omit<TextContentProps, 'mode'>;
  generateAiButton: Omit<ButtonProps, 'size'>;
  trigger: ReactNode;
  images?: ImageContainerProps[];
  files?: FileProps[];
  memos?: SelectedMemoTypes[];
}

const DetailModal = ({
  trigger,
  labelList,
  images,
  textContent,
  files,
  memos,
  generateAiButton,
}: DetailModalProps) => {
  const { labelItems, dateText } = labelList;
  const { isAiResult, title, content } = textContent;
  const { onClick } = generateAiButton;

  return (
    <Modal>
      <Modal.Trigger>{trigger}</Modal.Trigger>
      <Modal.Content>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <div>
              <LabelList
                listType="modal"
                labelItems={labelItems}
                dateText={dateText}
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
          {memos && (
            <div className={styles.selectedMemoContainer}>
              <p className={styles.selectedMemoCountContainer}>
                사용된 메모 ({memos?.length})
              </p>
              <div className={styles.selectedMemoContentContainer}>
                <div className={styles.selectedMemoContentInnerContainer}>
                  {memos.map(({ id, memoName }) => (
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
            <div className={styles.aiGenerateButtonContainer}>
              <Button size="xl" onClick={onClick}>
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
