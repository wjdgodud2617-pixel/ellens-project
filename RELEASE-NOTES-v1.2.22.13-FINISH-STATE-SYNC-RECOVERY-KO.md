# ELDYN v1.2.22.13 — 종료 상태/동기화 복구

- RUNNING / WALKING 구분과 무관하게 종료 시 현재 세션을 즉시 메모리에서 종료하고 Today를 즉시 갱신합니다.
- localStorage 용량 초과(QuotaExceededError)나 저장 오류가 발생해도 종료 로직이 중간에서 멈추지 않도록 변경했습니다.
- 휴대폰 로컬 저장 실패와 Supabase 클라우드 저장을 분리해, 로컬 저장 실패가 DB 업데이트를 막지 않도록 했습니다.
- 종료한 run ID는 기존 v1.2.22.12의 직접 Supabase 저장/검증 경로를 그대로 사용합니다.
- 활성 러닝 스냅샷 저장 실패도 종료/재개 UI를 막지 않도록 방어 처리했습니다.
- GPS 거리, Split, 평균 Pace/Speed, 식단, Calendar, Story Studio 로직은 변경하지 않았습니다.
