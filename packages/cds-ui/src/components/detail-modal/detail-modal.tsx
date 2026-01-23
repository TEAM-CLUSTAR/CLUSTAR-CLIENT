import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Icon } from '@cds/icon';

import { LabelTextType } from '../../constants/label-color-map';
import Button from '../button/button';
import File from '../file/file';
import ImageContainer from '../image-container/image-container';
import LabelList from '../label-list/label-list';
import Modal from '../modal/modal';
import SelectedMemo from '../selected-memo/selected-memo';
import TextContent from '../text-content/text-content';

import * as styles from './detail-modal.css';

const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${year}.${month}.${day} ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  } catch {
    return dateString;
  }
};

export interface SelectedMemoTypes {
  memoId: number;
  title: string;
  content: string;
  images: {
    imageId: number;
    imageUrl: string;
    imageName: string;
    imageExtension: string;
    imageSize: string;
  }[];
  files: {
    fileId: number;
    fileUrl: string;
    fileName: string;
    fileExtension: string;
    fileSize: string;
  }[];
  labelList: {
    labelId: number;
    name: LabelTextType;
  }[];
  createdAt: string;
  isAiGenerated: boolean;
  sourceMemoTitleList: string[];
}

interface DetailModalProps {
  children: ReactNode;
  data: SelectedMemoTypes;
  id: number;
  onAiCreateClick?: (memoId: number) => void;
  /**
   * 모달 open 상태를 제어하기 위한 제어형 props
   * - 전달하지 않으면 Radix 내부 상태로만 제어됩니다.
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DetailModal = ({
  children,
  data,
  id,
  onAiCreateClick,
  open,
  onOpenChange,
}: DetailModalProps) => {
  const {
    title,
    content,
    images,
    files,
    labelList,
    createdAt,
    isAiGenerated,
    sourceMemoTitleList,
  } = data;

  const handleClick = () => {
    if (id && onAiCreateClick) {
      onAiCreateClick(id);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {/* 부모 컴포넌트에서 open 상태를 제어하므로 Trigger로 감싸지 않고 그대로 렌더링 */}
      {children}
      <Modal.Content>
        <Dialog.Title className={styles.visuallyHidden}>{title}</Dialog.Title>
        <Dialog.Description className={styles.visuallyHidden}>
          {content}
        </Dialog.Description>
        <div
          className={styles.container({
            isGenerateButton: !!onAiCreateClick,
          })}
        >
          <div className={styles.headerContainer}>
            <div>
              <LabelList
                listType="modal"
                labelItems={labelList.map((label) => ({
                  id: String(label.labelId),
                  text: label.name,
                }))}
                dateText={formatDateTime(createdAt)}
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
            {images?.length > 0 && (
              <div className={styles.imageContainer}>
                <div className={styles.imageInnerContainer}>
                  {images.map(({ imageId, imageUrl, imageName }) => (
                    <ImageContainer
                      key={imageId}
                      imageUrl={imageUrl}
                      imageAlt={imageName}
                    />
                  ))}
                </div>
              </div>
            )}
            <div
              className={styles.textContentContainer({
                isImg: images?.length > 0,
              })}
            >
              <TextContent
                isAiResult={isAiGenerated}
                mode="detail"
                title={title}
                content={content}
              />
            </div>
          </div>
          {sourceMemoTitleList?.length > 0 && (
            <div className={styles.selectedMemoContainer}>
              <p className={styles.selectedMemoCountContainer}>
                사용된 메모 ({sourceMemoTitleList?.length})
              </p>
              <div className={styles.selectedMemoContentContainer}>
                <div className={styles.selectedMemoContentInnerContainer}>
                  {sourceMemoTitleList?.map((name, idx) => (
                    <SelectedMemo key={idx} memoName={name} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {files?.length > 0 && (
            <div className={styles.fileContainer}>
              <div className={styles.fileInnerContainer}>
                {files.map(({ fileId, fileName, fileSize, fileUrl }) => (
                  <File
                    key={fileId}
                    fileName={fileName}
                    fileSize={fileSize}
                    fileUrl={fileUrl}
                  />
                ))}
              </div>
            </div>
          )}

          {onAiCreateClick && (
            <Modal.Close>
              <div className={styles.createAiMemoButton}>
                <Button size="xl" onClick={handleClick}>
                  AI 생성 하기
                </Button>
              </div>
            </Modal.Close>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DetailModal;
