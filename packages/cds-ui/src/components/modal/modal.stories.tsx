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
        <div style={boxStyle}>
          <h3>기본 모달</h3>
          <p style={descStyle}>기본 uncontrolled 모달입니다.</p>
          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * defaultOpen
 */
export const DefaultOpen: Story = {
  render: () => (
    <Modal defaultOpen>
      <Modal.Trigger>
        <button>열기</button>
      </Modal.Trigger>
      <Modal.Content aria-label="기본으로 열린 모달">
        <div style={boxStyle}>
          <h3>처음부터 열려있어요</h3>
          <p style={descStyle}>defaultOpen 모달입니다.</p>
          <Modal.Close>
            <button>닫기</button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

/**
 * Controlled
 */
const ControlledModalStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={centerColumn}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setOpen(true)}>외부에서 열기</button>
        <button onClick={() => setOpen(false)}>외부에서 닫기</button>
      </div>
      <p style={smallText}>현재 상태: {open ? '열림' : '닫힘'}</p>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content aria-label="controlled 모달">
          <div style={boxStyle}>
            <h3>Controlled 모달</h3>
            <p style={descStyle}>부모 컴포넌트가 상태를 직접 제어합니다.</p>
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
 * Confirm
 */
const ConfirmModalStory = () => {
  const [result, setResult] = useState<'확인' | '취소' | null>(null);

  return (
    <div style={centerColumn}>
      <Modal>
        <Modal.Trigger>
          <button>삭제하기</button>
        </Modal.Trigger>

        <Modal.Content aria-label="삭제 확인">
          <div style={{ ...boxStyle, gap: 20 }}>
            <div>
              <h3>정말 삭제할까요?</h3>
              <p style={descStyle}>이 작업은 되돌릴 수 없습니다.</p>
            </div>

            <div style={footerRight}>
              <Modal.Close>
                <button onClick={() => setResult('취소')}>취소</button>
              </Modal.Close>
              <Modal.Close>
                <button style={dangerBtn} onClick={() => setResult('확인')}>
                  삭제
                </button>
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal>

      {result && <p style={smallText}>선택: {result}</p>}
    </div>
  );
};

export const Confirm: Story = {
  render: () => <ConfirmModalStory />,
};

/**
 * Form
 */
type FormData = {
  name: string;
  email: string;
};

export const Form = () => {
  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    setSubmitted({ name, email });
    setOpen(false);
  };

  return (
    <div style={centerColumn}>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Trigger>
          <button>프로필 수정</button>
        </Modal.Trigger>

        <Modal.Content aria-label="프로필 수정">
          <div style={{ ...boxStyle, minWidth: 320 }}>
            <h3>프로필 수정</h3>

            <form onSubmit={handleSubmit} style={column}>
              <input name="name" placeholder="이름" style={inputStyle} />
              <input
                name="email"
                type="email"
                placeholder="이메일"
                style={inputStyle}
              />

              <div style={footerRight}>
                <Modal.Close>
                  <button type="button">취소</button>
                </Modal.Close>
                <button type="submit" style={primaryBtn}>
                  저장
                </button>
              </div>
            </form>
          </div>
        </Modal.Content>
      </Modal>

      {submitted && (
        <p style={smallText}>
          저장됨: {submitted.name} / {submitted.email}
        </p>
      )}
    </div>
  );
};

/**
 * Long Content
 */
export const WithLongContent: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button>긴 내용 모달</button>
      </Modal.Trigger>

      <Modal.Content aria-label="긴 내용">
        <div style={boxStyle}>
          <h3>스크롤 모달</h3>

          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>콘텐츠 {i + 1}</p>
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
 * Nested
 */
export const Nested: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button>첫 번째 모달</button>
      </Modal.Trigger>

      <Modal.Content aria-label="첫 번째">
        <div style={boxStyle}>
          <h3>첫 번째</h3>

          <Modal>
            <Modal.Trigger>
              <button>두 번째</button>
            </Modal.Trigger>

            <Modal.Content aria-label="두 번째">
              <div style={boxStyle}>
                <h3>두 번째</h3>
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

/**
 * ✅ Complex (요소 많은 모달)
 */
const ComplexModalStory = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Trigger>
          <button>설정 열기</button>
        </Modal.Trigger>

        <Modal.Content aria-label="설정">
          <div style={complexWrapper}>
            {/* Header */}
            <div style={headerStyle}>
              <h2>설정</h2>
            </div>

            {/* Body */}
            <div style={bodyStyle}>
              <section>
                <h4>프로필</h4>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input placeholder="이름" style={inputStyle} />
                  <input placeholder="이메일" style={inputStyle} />
                </div>
              </section>

              <section>
                <h4>알림</h4>
                <label style={rowStyle}>
                  이메일 알림
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </label>
              </section>

              <section>
                <h4>테마</h4>
                <label style={rowStyle}>
                  다크 모드
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                </label>
              </section>

              <section>
                <h4>권한 목록</h4>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={listItem}>
                    권한 {i + 1}
                    <button>관리</button>
                  </div>
                ))}
              </section>
            </div>

            {/* Footer */}
            <div style={footerStyle}>
              <Modal.Close>
                <button>취소</button>
              </Modal.Close>
              <button style={primaryBtn}>저장</button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export const Complex: Story = {
  render: () => <ComplexModalStory />,
};

/* ================= 스타일 ================= */

const boxStyle = {
  padding: 24,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 16,
};

const descStyle = { color: '#666' };
const smallText = { fontSize: 13, color: '#888' };

const centerColumn = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  alignItems: 'center',
};

const column = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
};

const footerRight = {
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-end',
};

const inputStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: 6,
};

const primaryBtn = {
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  padding: '8px 16px',
};

const dangerBtn = {
  background: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  padding: '8px 16px',
};

const complexWrapper = {
  width: 600,
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column' as const,
};

const headerStyle = {
  padding: 20,
  borderBottom: '1px solid #eee',
};

const bodyStyle = {
  padding: 24,
  overflowY: 'auto' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 24,
};

const footerStyle = {
  padding: 16,
  borderTop: '1px solid #eee',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const listItem = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid #eee',
};
