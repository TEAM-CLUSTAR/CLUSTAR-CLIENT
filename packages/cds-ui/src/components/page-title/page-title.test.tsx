import { render, screen } from '@testing-library/react';

import PageTitle from './page-title';

describe('PageTitle 컴포넌트 테스트', () => {
  it('전달된 title 텍스트가 화면에 올바르게 표시되어야 한다.', () => {
    render(<PageTitle title="전체 메모" count={10} />);

    expect(screen.getByText('전체 메모')).toBeInTheDocument();
  });

  it('전달된 count 숫자가 n개 형식으로 배지에 표시되어야 한다.', () => {
    render(<PageTitle title="전체 메모" count={24} />);

    expect(screen.getByText('24개')).toBeInTheDocument();
  });

  it('제목이 h2 태그로 렌더링되어 적절한 시맨틱 구조를 가져야 한다.', () => {
    render(<PageTitle title="전체 메모" count={5} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      '전체 메모',
    );
  });
});
