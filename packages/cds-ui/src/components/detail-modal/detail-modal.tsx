import { ReactNode } from 'react';

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
}

const DetailModal = ({
  children,
  labelList,
  images,
  textContent,
  files,
  selectedMemos,
}: DetailModalProps) => {
  const { labelItems, dateText } = labelList;
  const { isAiResult, title, content } = textContent;

  const handleClick = () => {
    // ai 메모 생성 클릭 시, 모달에 뜬 메모의 id에 대해 선택하고, 메모 페이지로 이동합니다. 이후 ai 프롬프트를 띄웁니다.
  };

  return (
    <Modal>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
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
