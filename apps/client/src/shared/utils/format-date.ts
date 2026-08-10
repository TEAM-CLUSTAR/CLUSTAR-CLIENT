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

/**
 * ISO 8601 날짜 문자열을 오늘이면 오전/오후 HH:MM, 오늘이 아니면 YY.MM.DD 형식으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2026-01-21T02:31:08.223443")
 * @returns 오늘이면 오전/오후 HH:MM, 오늘이 아니면 YY.MM.DD
 */
export const formatTodayTimeOrDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (!isToday) return formatDate(dateString);

  const period = date.getHours() < 12 ? '오전' : '오후';
  const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${period} ${hours}:${minutes}`;
};
