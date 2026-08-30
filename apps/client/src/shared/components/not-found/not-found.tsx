import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import notFoundImage from '@shared/assets/images/empty-state/not-found.svg';
import EmptyView from '@shared/components/empty-view/empty-view';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <EmptyView
      fullHeight
      imgSrc={notFoundImage}
      title="앗, 페이지를 찾을 수 없어요!"
      description="메인화면으로 돌아가거나, 주소가 맞는지 다시 한 번 확인해 주세요!"
      buttonText="메인 화면으로"
      onButtonClick={() => navigate(PATH.ROOT)}
    />
  );
};

export default NotFound;
