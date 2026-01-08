# Known Improvement Opportunities

이 문서는 코드 리뷰에서 제안된 개선 사항들을 정리합니다. 현재 구현은 완전히 작동하며, 이러한 개선사항들은 선택적입니다.

## 1. 프로덕션 트레이스 샘플링 최적화

### 현재 상태

```typescript
tracesSampleRate: 1.0,
```

### 제안

```typescript
tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
```

### 이유

- 프로덕션에서 100% 샘플링은 많은 비용 발생
- 개발 환경에서는 100% 샘플링이 유용
- 프로덕션에서는 10% 샘플링으로도 충분한 인사이트 확보 가능

### 영향

- **비용**: 프로덕션 트레이싱 비용 90% 절감
- **데이터**: 여전히 충분한 성능 데이터 수집 가능

## 2. Replay 민감 정보 마스킹

### 현재 상태

```typescript
Sentry.replayIntegration(),
```

### 제안

```typescript
Sentry.replayIntegration({
  maskAllInputs: true,
  maskAllText: false,
  blockAllMedia: false,
}),
```

### 이유

- 사용자 입력 필드(비밀번호, 이메일 등)의 민감 정보 보호
- 텍스트와 미디어는 디버깅에 유용하므로 선택적으로 허용
- 추가 프라이버시 레이어 제공

### 영향

- **보안**: 입력 필드 자동 마스킹으로 민감 정보 유출 방지
- **디버깅**: 화면 텍스트와 미디어는 계속 캡처되어 문제 파악 가능

## 적용 시기

이러한 개선사항들은:

- ✅ 즉시 적용 가능
- ✅ 기존 기능에 영향 없음
- ✅ 선택적 적용 가능

다만, 현재 구현도 완전히 작동하며 프로덕션 배포 가능합니다. 실제 Sentry 사용량과 비용을 모니터링한 후 필요시 적용하는 것을 권장합니다.

## 우선순위

1. **높음**: 트레이스 샘플링 최적화 (비용 절감)
2. **중간**: Replay 마스킹 (보안 강화)

## 참고

더 자세한 설명은 [SENTRY_CONFIGURATION.md](apps/client/SENTRY_CONFIGURATION.md)의 "권장 개선 사항" 섹션을 참고하세요.
