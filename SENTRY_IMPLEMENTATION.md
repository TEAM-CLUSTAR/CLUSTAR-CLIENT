# Sentry Integration - Implementation Summary

이 PR은 CLUSTAR-CLIENT 프로젝트에 Sentry 에러 모니터링을 통합합니다.

## 구현 내용

### 1. 의존성 추가

- `@sentry/react@^10.32.1`: React 애플리케이션용 Sentry SDK
- `ky@^1.14.2`: HTTP 에러 타입 체킹을 위한 HTTP 클라이언트

### 2. 파일 구조

```
apps/client/
├── .env.example                                    # 환경 변수 예제
├── SENTRY_CONFIGURATION.md                         # Sentry 설정 상세 문서
└── src/
    ├── apps/
    │   └── main.tsx                               # Sentry 초기화 호출
    └── shared/
        ├── configs/
        │   └── sentry/
        │       ├── index.ts                       # 내보내기
        │       └── init-sentry.ts                 # Sentry 초기화 로직
        └── constants/
            └── HTTP_STATUS_CODE.ts                # HTTP 상태 코드 상수
```

### 3. 핵심 기능

#### HTTP 에러 필터링

다음 상태 코드는 Sentry에 리포팅되지 않습니다:

- 401 (Unauthorized): 인증 필요
- 403 (Forbidden): 권한 없음
- 404 (Not Found): 리소스 없음

이러한 상태는 예상 가능한 에러이므로 실제 버그가 아닙니다.

#### 환경별 설정

- **프로덕션**: Sentry 활성화
- **개발**: Sentry 비활성화 (환경 변수로 활성화 가능)

#### 성능 모니터링

- Browser Tracing Integration으로 페이지 로드 성능 추적
- Replay Integration으로 에러 발생 시 세션 재생

#### 샘플링 비율

- `tracesSampleRate: 1.0` (100%) - 프로덕션에서는 0.1로 조정 권장
- `replaysSessionSampleRate: 0.1` (10%) - 정상 세션
- `replaysOnErrorSampleRate: 1.0` (100%) - 에러 발생 세션

#### 프라이버시 보호

- `sendDefaultPii: false` - 개인 식별 정보 자동 수집 방지

## 제공된 Sentry 설정과의 비교

### ✅ 동일한 점 (좋은 설정)

1. 환경 변수로 DSN 관리
2. 프로덕션 환경만 활성화
3. PII 자동 수집 비활성화
4. HTTP 에러 필터링 (401, 403, 404)
5. Browser Tracing Integration
6. Replay Integration
7. 균형잡힌 샘플링 비율

### ⚠️ 개선 가능한 점

#### 1. 프로덕션 트레이스 샘플링

**현재**: `tracesSampleRate: 1.0` (100%)
**권장**:

```typescript
tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0;
```

프로덕션에서 100% 샘플링은 비용이 많이 들 수 있습니다.

#### 2. 개발 환경 테스트

**현재**: `enabled: import.meta.env.PROD`
**권장**:

```typescript
enabled: import.meta.env.VITE_ENABLE_SENTRY === 'true' || import.meta.env.PROD;
```

개발 환경에서도 필요시 Sentry를 테스트할 수 있습니다.

#### 3. Replay 민감 정보 마스킹

**권장 추가**:

```typescript
Sentry.replayIntegration({
  maskAllText: false,
  maskAllInputs: true, // 입력 필드 마스킹
  blockAllMedia: false,
});
```

#### 4. 에러 컨텍스트 추가

**권장 추가**:

```typescript
beforeSend(event, hint) {
  // ... 기존 코드 ...
  event.tags = {
    ...event.tags,
    http_status: status,
  };
  return event;
}
```

## 사용 방법

### 환경 변수 설정

1. `.env` 파일 생성 (`.env.example` 참고)
2. Sentry DSN 추가:

```env
VITE_SENTRY_DSN=your-sentry-dsn-here
```

### Sentry에서 DSN 가져오기

1. [Sentry.io](https://sentry.io) 로그인
2. 프로젝트 생성 또는 선택
3. Settings > Projects > [프로젝트명] > Client Keys (DSN)
4. DSN 복사

### 개발 환경에서 Sentry 활성화 (선택)

```env
VITE_ENABLE_SENTRY=true
```

## 추가 문서

상세한 설정 분석은 [SENTRY_CONFIGURATION.md](./apps/client/SENTRY_CONFIGURATION.md)를 참고하세요.

## 테스트 결과

✅ TypeScript 타입 체크 통과
✅ ESLint 검사 통과
✅ 빌드 성공
✅ Prettier 포맷팅 적용

## 다음 단계

1. Sentry 프로젝트 생성
2. DSN을 환경 변수에 추가
3. 프로덕션 배포 후 Sentry 대시보드에서 에러 확인
4. 필요시 샘플링 비율 조정
