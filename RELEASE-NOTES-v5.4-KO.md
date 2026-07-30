# ELDYN v5.4

## 반영 내용
- 오늘 운동을 HYROX Full / Half / Beginner로 전체 교체
- 기존 운동 자동 보관 및 원래 계획 복원
- 변경된 운동명이 대시보드와 캘린더에 표시
- 음식 사진 분석 요청의 mode 오류 수정 (`mode: food`)
- iPhone 사진 해상도와 JPEG 품질 개선
- 영양정보표 촬영은 더 높은 해상도로 전송
- Supabase `analyze-food` Edge Function 기본 모드를 음식 분석으로 수정

## 중요
프론트엔드 배포만으로 음식 사진 분석의 핵심 오류가 수정됩니다. 최신 Edge Function까지 적용하려면 `supabase/functions/analyze-food/index.ts`도 다시 배포하세요.
