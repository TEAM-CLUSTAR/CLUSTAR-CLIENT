import { ReactNode } from 'react';

import { Icon } from '@cds/icon';
import { Button, File, ImageContainer, Modal, TextContent } from '@cds/ui';

import * as styles from './detail-modal.css';

// TODO: 이 모달과 관련된 작업 진행 시 이 컴포넌트를 삭제

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
  isAiGenerated: boolean;
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
  const { title, content, images, files, isAiGenerated } = data;

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
        <div
          className={styles.container({
            isGenerateButton: !!onAiCreateClick,
          })}
        >
          <div className={styles.headerContainer}>
            <Modal.Close>
              <button className={styles.closeButtonContainer} type="button">
                <Icon name="ic_close" size={28} />
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
                  AI로 정리하기
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
