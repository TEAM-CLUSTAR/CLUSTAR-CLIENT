import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { Icon } from '@cds/icon';

import { PATH } from '@shared/router/path';
import { getAccessToken } from '@shared/storage/token-storage';

import * as styles from './landing-page.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (accessToken) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setShowScrollTop(scrollTop > window.innerHeight * 0.8);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [accessToken]);

  if (accessToken) {
    return <Navigate to={PATH.NEW_MEMO} replace />;
  }

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.content01}>
          <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
              <Icon name="ic_logo_symbol" width={42.67} height={42.67} />
              <Icon name="ic_logo_type" width={106.5} height={13.84} />
            </div>
            <a href={PATH.LOGIN} className={styles.loginLink}>
              로그인
            </a>
          </header>
          <img
            src="/landing_graphic.png"
            alt="landing graphic"
            width={525}
            height={357}
          />
          <div className={styles.content01Content}>
            <div className={styles.content01ContentText}>
              <div className={styles.content01SubtitleWrapper}>
                <div className={styles.content01Subtitle}>
                  AI 활용 메모 서비스
                </div>
              </div>
              <p className={styles.content01Title}>
                흩어진 메모를 모아{' '}
                <span className={styles.content01TitleHighlight}>
                  빛나는 결과물로
                </span>
              </p>
              <p className={styles.content01Description}>
                생각을 연결해 하나의 흐름으로 만들고,
                <br />
                의미있는 결과물로 완성합니다.
              </p>
            </div>
            <button
              className={styles.content01Button}
              onClick={() => navigate(PATH.LOGIN)}
            >
              지금 시작하기
            </button>
          </div>
        </div>

        <div className={styles.content02}>
          <p className={styles.content02Text}>
            쓰고 잊어버리는 메모,{' '}
            <span className={styles.content02Highlight}>
              혹시 당신의 이야기인가요?
            </span>
          </p>
          <img src="/img_card.png" alt="card image" width={1202} height={376} />
        </div>

        <div className={styles.content03}>
          <div className={styles.content03Text}>
            <div className={styles.content03SubtitleContainer}>
              <div className={styles.content03Tag}>STAR 01</div>
              <p className={styles.content03Subtitle}>
                사소한 메모도 놓치지 않게
              </p>
            </div>
            <p className={styles.contentDescription}>
              기억하고 싶은 내용을
              <br />
              메모로 간편하게 남겨보세요.
            </p>
          </div>
          <img
            src="/img_view1.png"
            alt="view1 image"
            width={1440}
            height={437}
          />
        </div>

        <div className={styles.content04}>
          <div className={styles.content04Text}>
            <div className={styles.content04SubtitleContainer}>
              <div className={styles.content04Tag}>STAR 02</div>
              <p className={styles.content03Subtitle}>
                메모 탐색을 더 간결하게
              </p>
            </div>
            <p className={styles.contentDescription}>
              수많은 메모 중 필요한 메모를
              <br />
              쉽고 빠르게 찾아보세요.
            </p>
          </div>
          <img
            src="/img_view2.png"
            alt="view2 image"
            width={1052}
            height={687}
          />
        </div>

        <div className={styles.content05}>
          <img
            src="/img_view3.png"
            alt="view3 image"
            width={1213}
            height={688}
            className={styles.content05Image}
          />
          <div className={styles.content05Text}>
            <div className={styles.content05SubtitleContainer}>
              <div className={styles.content05Tag}>STAR 03</div>
              <p className={styles.content03Subtitle}>구조를 바로 알 수 있게</p>
            </div>
            <p className={styles.contentDescription}>
              메모들의 구조를
              <br />
              한눈에 확인해보세요.
            </p>
          </div>
        </div>

        <div className={styles.content06}>
          <div className={styles.content06Text}>
            <div className={styles.content06SubtitleContainer}>
              <div className={styles.content06Tag}>STAR 04</div>
              <p className={styles.content03Subtitle}>메모를 더 가치있게</p>
            </div>
            <p className={styles.contentDescription}>
              선택한 메모를 활용하여
              <br />
              어떤 방향으로 만들지 적어보세요.
            </p>
          </div>
          <img
            src="/img_view4.png"
            alt="view4 image"
            width={1440}
            height={1024}
          />
        </div>
      </div>
      <footer className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerItem}>
            <p className={styles.footerItemText}>Instagram</p>
            <p>@ team_clustar</p>
          </div>
          <div className={styles.footerItem}>
            <p className={styles.footerItemText}>e-mail</p>
            <p>team.clustar@gmail.com</p>
          </div>
        </div>
      </footer>
      {showScrollTop && (
        <button
          className={styles.scrollTopButton}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="맨 위로 이동"
        >
          <img
            src={isHovered ? '/ic_arrow_blue.svg' : '/ic_arrow_black.svg'}
            alt="맨 위로 이동"
            width={32}
            height={18}
          />
        </button>
      )}
    </div>
  );
};

export default LandingPage;
