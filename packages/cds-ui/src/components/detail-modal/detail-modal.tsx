import { ReactNode } from 'react';

import { Icon } from '@cds/icon';

import Button, { type ButtonProps } from '../button/button';
import File, { type FileProps } from '../file/file';
import ImgContainer, {
  type ImgContainerProps,
} from '../image-container/image-container';
import LabelList, { type LabelListProps } from '../label-list/label-list';
import Modal from '../modal/modal';
import SelectedMemo, {
  type SelectedMemoProps,
} from '../selected-memo/selected-memo';
import TextContent, {
  type TextContentProps,
} from '../text-content/text-content';

import * as styles from './detail-modal.css';

interface DetailModalProps
  extends
    Omit<LabelListProps, 'listType'>,
    Omit<TextContentProps, 'mode'>,
    Omit<ButtonProps, 'size'> {
  trigger: ReactNode;
  imgs?: ImgContainerProps[];
  files?: FileProps[];
  memos?: SelectedMemoProps[];
}

const DetailModal = ({
  trigger,
  labelItems,
  dateText,
  imgs,
  isAiResult,
  title,
  content,
  files,
  memos,
  onClick,
}: DetailModalProps) => {
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
          {imgs && (
            <div className={styles.imageContainer}>
              <div className={styles.imageInnerContainer}>
                {imgs.map(({ imageUrl, imageAlt }) => (
                  <ImgContainer
                    key={imageUrl}
                    imageUrl={imageUrl}
                    imageAlt={imageAlt}
                  />
                ))}
              </div>
            </div>
          )}

          <div className={styles.textContentContainer({ isImg: !!imgs })}>
            <TextContent
              isAiResult={isAiResult}
              mode="detail"
              title={title}
              content={content}
            />
          </div>
          {memos && (
            <div className={styles.selectedMemoContainer}>
              <p>사용된 메모 ({memos?.length})</p>
              <div className={styles.selectedMemoContentContainer}>
                {memos.map(({ id, memoName }) => (
                  <SelectedMemo key={id} memoName={memoName} />
                ))}
              </div>
            </div>
          )}
          {files && (
            <div className={styles.fileContainer}>
              {files.map(({ fileName, fileSize, fileUrl }) => (
                <File
                  key={fileUrl}
                  fileName={fileName}
                  fileSize={fileSize}
                  fileUrl={fileUrl}
                />
              ))}
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
