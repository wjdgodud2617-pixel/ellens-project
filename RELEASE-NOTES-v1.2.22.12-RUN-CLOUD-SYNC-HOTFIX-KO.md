# ELDYN v1.2.22.12 — 러닝 종료 후 DB/다기기 동기화 핫픽스

- 종료 즉시 휴대폰 로컬 기록/Today UI 반영 유지
- 종료한 run ID를 Supabase `daily_logs.payload.runs`에 직접 upsert
- 저장 후 동일 run ID가 서버에 실제 존재하는지 재조회 검증
- 네트워크/서버 오류 시 `eldyn-pending-run-sync-v1` 재시도 큐에 보관
- 온라인 복귀, Cloud Pull, Sync Now 때 미전송 러닝 자동 재시도
- 종료 후 activeDate/selectedDate를 오늘 날짜로 맞춰 Today가 즉시 최신 기록을 렌더링
- GPS, Split, 평균 Pace/Speed, 식단, 인증샷 로직은 변경하지 않음
