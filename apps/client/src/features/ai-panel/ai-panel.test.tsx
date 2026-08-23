import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AiPanel from './ai-panel';

const mockUseAiPrompt = vi.fn();

vi.mock('./hooks/use-ai-prompt', () => ({
  useAiPrompt: () => mockUseAiPrompt(),
}));

const defaultHookValue = {
  isOpen: true,
  isLoading: false,
  shouldShowLoadingMessage: false,
  visibleMessages: [],
  handleClose: vi.fn(),
  handleSubmit: vi.fn(),
  handleRegenerate: vi.fn(),
  handleSaveToMemo: vi.fn(),
  handleCreateNewChat: vi.fn(),
};

const renderAiPanel = () => {
  return render(
    <AiPanel
      isAIOpen
      selectedMemos={[]}
      handleClose={vi.fn()}
      onRemoveMemo={vi.fn()}
      isDragOver={false}
    />,
  );
};

describe('AiPanel', () => {
  beforeEach(() => {
    mockUseAiPrompt.mockReturnValue(defaultHookValue);
  });

  it('does not render when the panel is closed', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      isOpen: false,
    });

    renderAiPanel();

    expect(screen.queryByText('AI 생성하기')).not.toBeInTheDocument();
  });

  it('renders the empty state when there are no messages', () => {
    renderAiPanel();

    expect(screen.getByText('AI 생성하기')).toBeInTheDocument();
    expect(
      screen.getByText('새 메모에 대해서 질문해보세요.'),
    ).toBeInTheDocument();
  });

  it('enables prompt input when no memo is selected', () => {
    renderAiPanel();

    expect(
      screen.getByPlaceholderText(
        '선택한 메모로 만들고 싶은 것에 대해 설명하세요.',
      ),
    ).not.toBeDisabled();
  });

  it('enables submit button after typing when no memo is selected', () => {
    const { container } = renderAiPanel();

    const buttons = container.querySelectorAll('button');
    const submitButton = buttons[buttons.length - 1];

    expect(submitButton).toBeDisabled();

    fireEvent.change(
      screen.getByPlaceholderText(
        '선택한 메모로 만들고 싶은 것에 대해 설명하세요.',
      ),
      { target: { value: '메모 없이 질문해줘' } },
    );

    expect(submitButton).not.toBeDisabled();
  });

  it('creates a new chat when the plus button is clicked', () => {
    const handleCreateNewChat = vi.fn();
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      handleCreateNewChat,
    });

    renderAiPanel();

    fireEvent.click(screen.getByLabelText('새 대화창'));

    expect(handleCreateNewChat).toHaveBeenCalled();
  });

  it('closes the panel when the close button is clicked', () => {
    const handleClose = vi.fn();
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      handleClose,
    });

    renderAiPanel();

    fireEvent.click(screen.getByLabelText('AI 패널 닫기'));

    expect(handleClose).toHaveBeenCalled();
  });

  it('renders user and AI messages', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      visibleMessages: [
        {
          id: 'user-1',
          text: '기획 내용을 요약해줘',
          type: 'user',
        },
        {
          id: 'ai-1',
          text: '기획 내용 요약본입니다.',
          type: 'ai',
        },
      ],
    });

    renderAiPanel();

    expect(screen.getByText('기획 내용을 요약해줘')).toBeInTheDocument();
    expect(screen.getByText('기획 내용 요약본입니다.')).toBeInTheDocument();
  });

  it('renders used memo count from AI message memoIds', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      visibleMessages: [
        {
          id: 'ai-1',
          text: '기획 내용 요약본입니다.',
          type: 'ai',
          memoIds: [1, 2],
        },
      ],
    });

    render(
      <AiPanel
        isAIOpen
        selectedMemos={[
          { memoId: 1, title: '메모 1' },
          { memoId: 2, title: '메모 2' },
          { memoId: 3, title: '메모 3' },
        ]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        isDragOver={false}
      />,
    );

    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.queryByText('+3')).not.toBeInTheDocument();
  });

  it('renders used memo count on AI error message when memoIds exist', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      visibleMessages: [
        {
          id: 'error-1',
          text: 'AI 응답 생성에 실패했습니다. 다시 시도해주세요.',
          type: 'ai',
          memoIds: [1, 2],
        },
      ],
    });

    renderAiPanel();

    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders loading message with selected memo count', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      isLoading: true,
      shouldShowLoadingMessage: true,
    });

    render(
      <AiPanel
        isAIOpen
        selectedMemos={[
          { memoId: 1, title: '메모 1' },
          { memoId: 2, title: '메모 2' },
          { memoId: 3, title: '메모 3' },
        ]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        isDragOver={false}
      />,
    );

    expect(
      screen.getByText('3개의 메모를 바탕으로 결과물을 생성중이에요...'),
    ).toBeInTheDocument();
  });

  it('does not render AI answer while answer is generating', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      isLoading: true,
      shouldShowLoadingMessage: true,
      visibleMessages: [
        {
          id: 'user-1',
          text: '기획 내용을 요약해줘',
          type: 'user',
        },
      ],
    });

    renderAiPanel();

    expect(screen.getByText('기획 내용을 요약해줘')).toBeInTheDocument();
    expect(
      screen.queryByText('기획 내용 요약본입니다.'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('0개의 메모를 바탕으로 결과물을 생성중이에요...'),
    ).toBeInTheDocument();
  });

  it('renders suggested memos when they are provided', () => {
    render(
      <AiPanel
        isAIOpen
        selectedMemos={[]}
        suggestedMemos={[
          {
            memoId: 1,
            title: '추천 메모',
            isSelected: false,
          },
        ]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        onSelectSuggestedMemo={vi.fn()}
        isDragOver={false}
      />,
    );

    expect(screen.getByText('AI 추천 메모')).toBeInTheDocument();
  });

  it('does not render suggested memo tab when no suggested memos are provided', () => {
    render(
      <AiPanel
        isAIOpen
        selectedMemos={[]}
        suggestedMemos={[]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        onSelectSuggestedMemo={vi.fn()}
        isDragOver={false}
      />,
    );

    expect(screen.queryByText('AI 추천 메모')).not.toBeInTheDocument();
  });

  it('renders drag over empty text while dragging a memo over the panel', () => {
    render(
      <AiPanel
        isAIOpen
        selectedMemos={[]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        isDragOver
      />,
    );

    expect(
      screen.getByText('메모를 해당 패널로 드롭해주세요'),
    ).toBeInTheDocument();
  });

  it('renders drag over text while dragging a memo over a panel with messages', () => {
    mockUseAiPrompt.mockReturnValue({
      ...defaultHookValue,
      visibleMessages: [
        {
          id: 'user-1',
          text: '기획 내용을 요약해줘',
          type: 'user',
        },
      ],
    });

    render(
      <AiPanel
        isAIOpen
        selectedMemos={[]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        isDragOver
      />,
    );

    expect(
      screen.getByText('메모를 해당 패널로 드롭해주세요'),
    ).toBeInTheDocument();
  });

  it('calls onSelectSuggestedMemo when a suggested memo is selected', async () => {
    const handleSelectSuggestedMemo = vi.fn();

    render(
      <AiPanel
        isAIOpen
        selectedMemos={[]}
        suggestedMemos={[
          {
            memoId: 1,
            title: '추천 메모',
            isSelected: false,
          },
        ]}
        handleClose={vi.fn()}
        onRemoveMemo={vi.fn()}
        onSelectSuggestedMemo={handleSelectSuggestedMemo}
        isDragOver={false}
      />,
    );

    fireEvent.click(
      screen.getByLabelText('추천 메모 추천 메모 추가', {
        selector: 'button',
      }),
    );

    expect(handleSelectSuggestedMemo).toHaveBeenCalledWith(1);
  });
});
