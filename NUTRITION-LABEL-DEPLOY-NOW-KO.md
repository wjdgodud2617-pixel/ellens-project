# ELDYN Nutrition Label Scan 지금 배포하기

## 1. Supabase Secret 등록
Supabase 왼쪽 메뉴 `Edge Functions > Secrets`에서 아래 Secret을 추가합니다.

- Name: `OPENAI_API_KEY`
- Value: 본인의 OpenAI API Key (`sk-...`)

선택 사항:
- Name: `OPENAI_VISION_MODEL`
- Value: `gpt-4.1-mini`

API Key는 GitHub, config.js, 브라우저 코드에 넣지 마세요.

## 2. Edge Function 생성
1. `Edge Functions > Functions > Open Editor`
2. 현재 보이는 `index.ts` 전체를 삭제
3. ZIP 안 `ANALYZE-FOOD-PASTE-IN-SUPABASE.ts` 전체를 복사해서 붙여넣기
4. Function name을 정확히 `analyze-food`로 입력
5. 아래쪽 `Deploy function` 클릭

## 3. 앱 파일 배포
ZIP의 전체 파일을 기존 GitHub 저장소에 덮어쓰고 Commit합니다. Vercel이 자동 배포되면 Deployments에서 Ready를 확인합니다.

## 4. 테스트
앱 로그인 → Nutrition 화면 → `영양표 분석` → 사진 촬영/선택 → `영양정보 분석하기` → 결과 확인 → 아침/점심/저녁 선택 → 저장
