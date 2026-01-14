import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * 기본 사용 예 (uncontrolled)
 */
export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button>모달 열기</button>
      </Modal.Trigger>

      <Modal.Content>
        <div style={{ padding: 20 }}>
          <h3>Modal Title</h3>
          <p>기본 모달 예시입니다.</p>

          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * defaultOpen 사용 예
 */
export const DefaultOpen: Story = {
  render: () => (
    <Modal defaultOpen>
      <Modal.Trigger>
        <button>열기</button>
      </Modal.Trigger>

      <Modal.Content>
        <div style={{ padding: 20 }}>
          <p>처음부터 열려 있는 모달입니다.</p>

          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * controlled 모달 사용 예
 */
const ControlledModalStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>외부 버튼으로 열기</button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <div style={{ padding: 20 }}>
            <p>Controlled Modal</p>

            <Modal.Close>
              <button>닫기</button>
            </Modal.Close>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const Controlled: Story = {
  render: () => <ControlledModalStory />,
};

/**
 * 스크롤 / 레이아웃 확인용
 */
export const WithLongContent: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button>열기</button>
      </Modal.Trigger>

      <Modal.Content>
        <div style={{ padding: 20, maxHeight: 300, overflow: 'auto' }}>
          <h3>Scrollable Content</h3>

          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>콘텐츠 {i + 1}</p>
          ))}

          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};
