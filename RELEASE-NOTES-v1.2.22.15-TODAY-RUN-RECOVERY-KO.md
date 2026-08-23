# ELDYN v1.2.22.15 — Today 최신 러닝 복구

- v1.2.22.13 종료 안정화 로직을 기준으로 복구
- Today 최근 러닝이 `state.runs` 하나만 보지 않고 일별 로그의 `runs`도 병합해 조회
- 종료 직후 기록은 메모리 preview로 즉시 Today 카드에 반영
- 러닝 날짜 판정은 브라우저 로컬 시간 대신 Asia/Seoul 기준으로 통일
- 종료 기록의 일별 로그 저장 날짜도 `endedAt`의 Asia/Seoul 날짜로 고정
- GPS/거리/Split/Pace/식단/인증샷 로직은 변경하지 않음
