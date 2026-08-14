# ELDYN v1.2.22.0 — Run Finish Refresh Hotfix

- v1.2.21.9 안정 버전을 기준으로 러닝/워킹 종료 처리만 수정
- 종료 시 라이브 세션을 0으로 초기화하기 전에 완료 기록을 로컬/일일 로그에 먼저 저장
- `saveState()`의 500ms 자동 Cloud Sync와 즉시 일일 로그 저장이 겹치던 종료 시점 race condition 방지
- 저장 완료 후 Running / Today / Progress / Calendar를 즉시 다시 렌더링
- 앱을 종료했다 다시 열지 않아도 Today의 최신 러닝/워킹 기록이 바로 표시되도록 수정
- GPS 거리 계산, Auto Pause, 식단 로직은 변경하지 않음
