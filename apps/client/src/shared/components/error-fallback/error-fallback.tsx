import errorCommonImage from '@shared/assets/images/empty-state/error-common.svg';
import EmptyView from '@shared/components/empty-view/empty-view';

const ErrorFallback = () => {
  return (
    <EmptyView
      fullHeight
      imgSrc={errorCommonImage}
      title="앗, 문제가 발생했어요!"
      description="잠시 후에 다시 시도해주세요."
    />
  );
};

export default ErrorFallback;
