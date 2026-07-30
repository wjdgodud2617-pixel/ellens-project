# ELDYN v5 — Nutrition Edition

## 기준 버전 변경

앞으로 ELDYN 기능 개발은 v5를 기준으로 진행합니다.

## 주요 기능

- 음식 검색 DB 확장 및 한글·영문 부분 검색
- 최근 음식과 즐겨찾기
- 음식 사진 AI 분석
- 제품 영양정보표 사진 분석
- 제품명, 총 내용량, 기준량, 열량, 탄수화물, 단백질, 지방, 당류, 나트륨 표시
- 분석 숫자 직접 수정
- 실제 섭취량에 따른 영양값 자동 환산
- 아침·점심·저녁·간식에 바로 저장
- AI 한 줄 영양 코멘트
- 기존 GPS 러닝, 기록, 프로필, Supabase 동기화 유지

## 이미 완료된 Supabase 설정

- Edge Function: `analyze-food`
- Secret: `OPENAI_API_KEY`

## 중요

OpenAI API 키는 GitHub, Vercel 프런트엔드 파일 또는 `config.js`에 입력하지 않습니다.
