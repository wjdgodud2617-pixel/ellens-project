# ELDYN v1.2.22.11 — 러닝 종료 버튼 긴급 핫픽스

- 전용 러닝 화면 종료 버튼에 iOS `pointerup` fallback 추가
- 중복 종료 방지 guard 추가
- 종료 직후 UI/로컬 기록을 먼저 확정하고, Supabase 저장은 비동기로 분리
- 네트워크가 느리거나 일시적으로 끊겨도 종료 버튼이 멈춘 것처럼 보이지 않도록 수정
- 종료 시 버튼에 `저장 중…` 상태 표시
- GPS 거리, Split, AVG SPEED/PACE, 식단, Calendar 로직은 변경하지 않음
