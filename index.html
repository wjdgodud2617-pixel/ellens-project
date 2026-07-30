# ELDYN AI Food Scan 설정

앱 화면과 저장 기능은 이미 포함되어 있습니다. 실제 AI 분석을 켜려면 Supabase Edge Function을 한 번 배포해야 합니다.

## 1. OpenAI API 키를 Supabase Secret에 저장

```bash
supabase secrets set OPENAI_API_KEY=여기에_API키
```

선택적으로 모델을 바꿀 수 있습니다.

```bash
supabase secrets set OPENAI_VISION_MODEL=gpt-5-mini
```

API 키를 `config.js` 또는 브라우저 코드에 넣으면 안 됩니다.

## 2. Edge Function 배포

프로젝트 루트에서:

```bash
supabase login
supabase link --project-ref qgpcnuvotlmxedrzrlnc
supabase functions deploy analyze-food
```

기본 JWT 검증을 유지하세요. AI Food Scan은 로그인한 사용자만 호출합니다.

## 3. 앱 재배포

전체 파일을 GitHub 저장소에 덮어쓰고 Vercel에서 재배포합니다.

## 사용 흐름

오늘 식단 카드 → `📷 AI 사진` → 촬영/선택 → AI 분석 → 음식명·양·영양성분 수정 → 식단 저장

분석 결과는 해당 날짜의 식단에 들어가며 기존 `daily_logs` RLS 정책에 따라 로그인 사용자별로 분리됩니다.
