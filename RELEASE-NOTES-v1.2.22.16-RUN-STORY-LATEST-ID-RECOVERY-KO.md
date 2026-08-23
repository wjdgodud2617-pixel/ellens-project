# ELDYN v1.2.22.16 — 최신 러닝 ID / 인증샷 연결 복구

이번 버전은 22.15를 기준으로 러닝 종료 후 Today와 인증샷이 과거 기록을 다시 선택하는 문제만 수정합니다.

- 종료 직후 최신 run record를 별도 lightweight snapshot으로 보존합니다.
- Today/최근 러닝은 state.runs뿐 아니라 daily log와 최신 snapshot을 합쳐 최신 기록을 판정합니다.
- 인증샷 CREATE는 state.runs만 보지 않고 동일한 통합 run source에서 선택한 runId를 찾습니다.
- 클라우드 저장 검증 성공 시에도 동일 runId snapshot을 갱신합니다.
- 앱 재렌더/재접속 시 daily log + snapshot을 state.runs에 복구합니다.
- 날짜 판정은 Asia/Seoul 기준을 유지합니다.

GPS 거리, Split, 평균 Pace/Speed, 식단, 운동, Calendar 로직은 변경하지 않았습니다.
