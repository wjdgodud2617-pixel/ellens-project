# ELDYN v1.2.22.19 — 러닝 기록 영구보존 패치

- 러닝/워킹 종료 시 runRecord를 세션 초기화보다 먼저 IndexedDB 전용 Run Vault에 저장합니다.
- 대형 app state/localStorage와 별도 저장소를 사용해 localStorage 용량 문제의 영향을 줄입니다.
- Cloud Pull 전에 Run Vault를 먼저 복원하여 서버의 `runs: []`가 휴대폰의 완료 기록을 덮어쓰지 못하게 합니다.
- Supabase 저장 시 state/daily log에서 runId를 못 찾더라도 Run Vault에서 같은 runId를 복구해 재전송합니다.
- 네트워크 재연결 시 Run Vault → state 복원 → cloud retry 순서로 동기화합니다.
- GPS/거리/Split/Pace/식단/인증샷 계산 로직은 변경하지 않았습니다.

주의: 이 버전은 이미 사라진 2026-08-23 원본 경로를 되살리는 패치가 아니라, 이후 완료되는 러닝/워킹 기록의 재발 방지용입니다.
