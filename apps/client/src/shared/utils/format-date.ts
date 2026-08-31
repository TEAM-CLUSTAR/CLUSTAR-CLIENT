/**
 * ISO 8601 날짜 문자열을 YY.MM.DD 형식으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2026-01-21T02:31:08.223443")
 * @returns YY.MM.DD 형식의 날짜 문자열 (예: "26.01.21")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  } catch {
    return dateString;
  }
};
