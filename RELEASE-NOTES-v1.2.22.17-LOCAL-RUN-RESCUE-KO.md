# ELDYN v1.2.22.17 — Local Run Rescue

- 종료된 러닝/워킹이 휴대폰의 last-run snapshot 또는 state.runs에는 남아 있지만 `daily_logs.payload.runs`가 비어 있는 경우 해당 run ID를 자동 복구합니다.
- 앱 로그인/Cloud Pull 직후 최신 로컬 run을 해당 날짜의 `payload.runs`에 병합해 Supabase로 업서트하고 동일 run ID가 서버에 존재하는지 검증합니다.
- 기존 8/23 식단, 수분, 수면, 영양 데이터는 유지하고 `runs` 배열만 merge합니다.
- Sync Now를 눌러도 동일 복구를 먼저 시도합니다.
- GPS, Split, Pace/Speed, 식단 계산, Story UI는 변경하지 않습니다.
