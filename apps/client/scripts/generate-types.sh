#!/bin/sh
set -eu

# 필수 환경변수 검증 
: "${SWAGGER_USERNAME:?SWAGGER_USERNAME이 .env에 필요합니다}"
: "${SWAGGER_PASSWORD:?SWAGGER_PASSWORD가 .env에 필요합니다}"
: "${VITE_API_BASE_URL:?VITE_API_BASE_URL이 .env에 필요합니다}"

DOCS_URL="${VITE_API_BASE_URL%/}/v3/api-docs"
OUTPUT="src/shared/apis/schema.d.ts"

#종료 시 임시 파일 삭제
TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

# curl 설정 전체를 stdin으로 전달 — URL/자격증명의 ps 노출 방지
curl --config - <<EOF
url = "$DOCS_URL"
user = "$SWAGGER_USERNAME:$SWAGGER_PASSWORD"
output = "$TMP_FILE"
fail
silent
show-error
EOF

pnpm exec openapi-typescript "$TMP_FILE" -o "$OUTPUT"

echo "✅ 타입 생성 완료: $OUTPUT"