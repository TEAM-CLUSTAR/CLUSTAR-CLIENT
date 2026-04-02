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
      <Modal.Content aria-label="기본 모달">
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h3 style={{ margin: 0 }}>기본 모달</h3>
          <p style={{ margin: 0, color: '#666' }}>
            기본 uncontrolled 모달입니다.
          </p>
          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * 처음부터 열려있는 모달
 */
export const DefaultOpen: Story = {
  render: () => (
    <Modal defaultOpen>
      <Modal.Trigger>
        <button>열기</button>
      </Modal.Trigger>
      <Modal.Content aria-label="기본으로 열린 모달">
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h3 style={{ margin: 0 }}>처음부터 열려있어요</h3>
          <p style={{ margin: 0, color: '#666' }}>defaultOpen 모달입니다.</p>
          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * Controlled 모달
 */
const ControlledModalStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setOpen(true)}>외부에서 열기</button>
        <button onClick={() => setOpen(false)}>외부에서 닫기</button>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
        현재 상태: {open ? '열림' : '닫힘'}
      </p>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content aria-label="controlled 모달">
          <div
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3 style={{ margin: 0 }}>Controlled 모달</h3>
            <p style={{ margin: 0, color: '#666' }}>
              부모 컴포넌트가 상태를 직접 제어합니다.
            </p>
            <Modal.Close>
              <button>닫기</button>
            </Modal.Close>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledModalStory />,
};

/**
 * 확인 / 취소 다이얼로그
 */
const ConfirmModalStory = () => {
  const [result, setResult] = useState<'확인' | '취소' | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <Modal>
        <Modal.Trigger>
          <button>삭제하기</button>
        </Modal.Trigger>
        <Modal.Content aria-label="삭제 확인">
          <div
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 8px' }}>정말 삭제할까요?</h3>
              <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            <div
              style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}
            >
              <Modal.Close>
                <button onClick={() => setResult('취소')}>취소</button>
              </Modal.Close>
              <Modal.Close>
                <button
                  onClick={() => setResult('확인')}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    cursor: 'pointer',
                  }}
                >
                  삭제
                </button>
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal>
      {result && (
        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>선택: {result}</p>
      )}
    </div>
  );
};

export const Confirm: Story = {
  render: () => <ConfirmModalStory />,
};

/**
 * 폼이 있는 모달
 */
const FormModalStory = () => {
  const [submitted, setSubmitted] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    setSubmitted({ name, email });
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Trigger>
          <button>프로필 수정</button>
        </Modal.Trigger>
        <Modal.Content aria-label="프로필 수정">
          <div
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              minWidth: 320,
            }}
          >
            <h3 style={{ margin: 0 }}>프로필 수정</h3>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 13, fontWeight: 500 }}>이름</label>
                <input
                  name="name"
                  placeholder="이름을 입력하세요"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 13, fontWeight: 500 }}>이메일</label>
                <input
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid #ddd',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'flex-end',
                  marginTop: 8,
                }}
              >
                <Modal.Close>
                  <button type="button">취소</button>
                </Modal.Close>
                <button
                  type="submit"
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    cursor: 'pointer',
                  }}
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </Modal.Content>
      </Modal>
      {submitted && (
        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
          저장됨: {submitted.name} / {submitted.email}
        </p>
      )}
    </div>
  );
};

export const WithForm: Story = {
  render: () => <FormModalStory />,
};

/**
 * 스크롤 가능한 모달
 */
export const WithLongContent: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button>긴 내용 모달 열기</button>
      </Modal.Trigger>
      <Modal.Content aria-label="긴 내용 모달">
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h3 style={{ margin: 0 }}>스크롤 가능한 모달</h3>
          <div
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <p
                key={i}
                style={{
                  margin: 0,
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#444',
                }}
              >
                콘텐츠 {i + 1}번째 항목입니다.
              </p>
            ))}
          </div>
          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * 모달 안에 모달
 */
export const Nested: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button>첫 번째 모달 열기</button>
      </Modal.Trigger>
      <Modal.Content aria-label="첫 번째 모달">
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h3 style={{ margin: 0 }}>첫 번째 모달</h3>
          <Modal>
            <Modal.Trigger>
              <button>두 번째 모달 열기</button>
            </Modal.Trigger>
            <Modal.Content aria-label="두 번째 모달">
              <div
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <h3 style={{ margin: 0 }}>두 번째 모달</h3>
                <p style={{ margin: 0, color: '#666' }}>중첩된 모달입니다.</p>
                <Modal.Close>
                  <button>닫기</button>
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal>
          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};
