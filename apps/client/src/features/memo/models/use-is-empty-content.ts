/**
 * Quill HTML 내용이 실제로 비어있는지 확인하는 훅
 * Quill은 빈 상태에서도 <p><br></p> 같은 HTML을 생성하므로,
 * 실제 텍스트 내용이 있는지 확인해야 함
 */
export const useIsEmptyContent = () => {
  const isEmptyContent = (html: string): boolean => {
    if (!html || html.trim() === '') return true;

    const withoutTags = html.replace(/<[^>]*>/g, '');
    const textContent = withoutTags.replace(/&nbsp;/g, ' ').trim();

    return textContent.length === 0;
  };

  return { isEmptyContent };
};
