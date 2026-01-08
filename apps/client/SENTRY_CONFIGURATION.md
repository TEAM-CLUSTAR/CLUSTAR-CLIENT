# Sentry 설정 분석 및 설명

## 개요

이 문서는 프로젝트에 적용된 Sentry 초기화 설정을 분석하고, 각 설정 옵션의 장단점을 설명합니다.

## 설정 파일 위치

- `/apps/client/src/shared/configs/sentry/init-sentry.ts`

## 설정 항목 분석

### 1. DSN (Data Source Name)

```typescript
dsn: import.meta.env.VITE_SENTRY_DSN;
```

**장점:**

- 환경 변수로 관리하여 보안성 향상
- 환경별로 다른 Sentry 프로젝트 사용 가능
- 코드에 민감한 정보가 노출되지 않음

**주의사항:**

- `.env` 파일에 `VITE_SENTRY_DSN` 값을 설정해야 함
- 환경 변수가 없으면 Sentry가 초기화되지 않음

### 2. Enabled 설정

```typescript
enabled: import.meta.env.PROD;
```

**장점:**

- 프로덕션 환경에서만 Sentry 활성화
- 개발 중 불필요한 에러 리포팅 방지
- Sentry 할당량 절약

**단점:**

- 개발 환경에서 Sentry 테스트 어려움

**개선 방안:**

```typescript
enabled: import.meta.env.VITE_ENABLE_SENTRY === 'true' || import.meta.env.PROD;
```

이렇게 하면 개발 환경에서도 필요시 Sentry를 활성화할 수 있습니다.

### 3. SendDefaultPii 설정

```typescript
sendDefaultPii: false;
```

**장점:**

- 개인 식별 정보(PII) 자동 수집 방지
- GDPR 및 개인정보 보호법 준수
- 사용자 프라이버시 보호

**권장사항:**

- 대부분의 경우 `false`로 설정하는 것이 좋습니다
- 필요한 경우에만 명시적으로 정보를 추가하는 것이 안전합니다

### 4. BeforeSend Hook

```typescript
beforeSend(event, hint) {
  const error = hint?.originalException;
  if (error instanceof HTTPError) {
    const status = error.response?.status;
    if (status && IGNORED_STATUS_SET.has(status)) {
      return null;
    }
  }
  return event;
}
```

**장점:**

- 특정 HTTP 상태 코드 필터링 (401, 403, 404)
- 예상된 에러를 제외하여 노이즈 감소
- Sentry 할당량 효율적 사용

**필터링되는 상태 코드:**

- `401 UNAUTHORIZED`: 인증 실패 (로그인 필요)
- `403 FORBIDDEN`: 권한 없음
- `404 NOT_FOUND`: 리소스를 찾을 수 없음

**이유:**
이러한 상태 코드들은 일반적으로 예상 가능한 에러이며, 애플리케이션 로직의 일부입니다. 실제 버그가 아닌 경우가 많아 Sentry에 리포팅할 필요가 없습니다.

**개선 가능 사항:**

```typescript
// 더 상세한 로깅을 위해 컨텍스트 추가
beforeSend(event, hint) {
  const error = hint?.originalException;
  if (error instanceof HTTPError) {
    const status = error.response?.status;
    if (status && IGNORED_STATUS_SET.has(status)) {
      return null;
    }
    // HTTP 에러에 추가 컨텍스트 추가
    event.contexts = {
      ...event.contexts,
      http: {
        url: error.request?.url,
        method: error.request?.method,
        status_code: status,
      },
    };
  }
  return event;
}
```

### 5. Integrations

#### Browser Tracing Integration

```typescript
Sentry.browserTracingIntegration();
```

**장점:**

- 페이지 로드 및 네비게이션 성능 추적
- 사용자 경험 모니터링
- 성능 병목 지점 파악

**주의사항:**

- 성능 모니터링은 추가 비용이 발생할 수 있음
- `tracesSampleRate`로 샘플링 비율 조정 필요

#### Replay Integration

```typescript
Sentry.replayIntegration();
```

**장점:**

- 에러 발생 시 사용자 세션 재생
- 버그 재현이 어려운 경우 매우 유용
- 사용자 행동 패턴 이해

**단점:**

- 추가 비용 발생
- 더 많은 데이터 전송
- 개인정보 보호 고려 필요

**권장사항:**

- `replaysSessionSampleRate`를 낮게 설정 (현재 0.1 = 10%)
- 민감한 정보 마스킹 설정 추가:

```typescript
Sentry.replayIntegration({
  maskAllText: true,
  maskAllInputs: true,
  blockAllMedia: true,
});
```

### 6. Traces Sample Rate

```typescript
tracesSampleRate: 1.0;
```

**장점:**

- 모든 트랜잭션 추적 (100%)
- 완전한 성능 데이터 수집

**단점:**

- 많은 비용 발생 가능
- 대용량 트래픽 시 Sentry 할당량 초과 위험

**권장사항:**
프로덕션 환경에서는 더 낮은 샘플링 비율 사용:

```typescript
tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0;
```

- 프로덕션: 10% 샘플링
- 개발: 100% 샘플링

### 7. Replay Sample Rates

```typescript
replaysSessionSampleRate: 0.1,  // 정상 세션의 10%
replaysOnErrorSampleRate: 1.0,   // 에러 발생 시 100%
```

**장점:**

- 균형잡힌 설정
- 에러 발생 시 완전한 세션 캡처
- 비용 효율적

**적절한 설정:**
현재 설정은 매우 합리적입니다:

- 정상 세션: 10%만 기록하여 비용 절감
- 에러 세션: 100% 기록하여 디버깅 정보 확보

## 전체 평가

### 좋은 점 (장점)

1. ✅ 환경 변수를 통한 보안 관리
2. ✅ 프로덕션 환경만 활성화
3. ✅ PII 자동 수집 비활성화
4. ✅ 예상 가능한 HTTP 에러 필터링
5. ✅ 균형잡힌 replay 샘플링 비율
6. ✅ 에러 발생 시 완전한 세션 캡처
7. ✅ 타입 안전성 (TypeScript)

### 개선 가능한 점

1. ⚠️ `tracesSampleRate` 1.0은 프로덕션에서 비용이 높을 수 있음
2. ⚠️ 개발 환경에서 Sentry 테스트가 어려움
3. ⚠️ Replay integration에 민감 정보 마스킹 옵션 없음
4. ⚠️ 에러 컨텍스트에 추가 정보 부족
5. ⚠️ 환경 설정 문서화 필요 (.env.example)

### 권장 개선 사항

#### 1. 환경별 샘플링 비율 조정

```typescript
tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
```

#### 2. 개발 환경 Sentry 활성화 옵션

```typescript
enabled: import.meta.env.VITE_ENABLE_SENTRY === 'true' || import.meta.env.PROD,
```

#### 3. Replay 민감 정보 마스킹

```typescript
Sentry.replayIntegration({
  maskAllText: false,
  maskAllInputs: true,
  blockAllMedia: false,
});
```

#### 4. 환경 변수 예제 파일 생성

`.env.example` 파일 추가:

```env
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
VITE_ENABLE_SENTRY=false
```

#### 5. 추가 에러 컨텍스트

```typescript
beforeSend(event, hint) {
  const error = hint?.originalException;
  if (error instanceof HTTPError) {
    const status = error.response?.status;
    if (status && IGNORED_STATUS_SET.has(status)) {
      return null;
    }
    event.tags = {
      ...event.tags,
      http_status: status,
    };
  }
  return event;
}
```

## 사용 방법

### 1. 환경 변수 설정

`.env` 파일에 Sentry DSN 추가:

```env
VITE_SENTRY_DSN=your-sentry-dsn-here
```

### 2. 애플리케이션 시작 시 초기화

`main.tsx`에서 자동으로 초기화됩니다:

```typescript
import { InitSentry } from '@shared/configs/sentry';
InitSentry();
```

### 3. 수동 에러 캡처

필요한 경우 수동으로 에러 리포팅:

```typescript
import * as Sentry from '@sentry/react';

try {
  // 코드
} catch (error) {
  Sentry.captureException(error);
}
```

## 결론

현재 Sentry 설정은 전반적으로 잘 구성되어 있습니다. 특히 보안과 프라이버시를 고려한 설정이 돋보입니다. 몇 가지 개선사항을 적용하면 더욱 효율적이고 비용 효과적인 에러 모니터링 시스템을 구축할 수 있습니다.
