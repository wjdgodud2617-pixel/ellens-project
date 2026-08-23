# ELDYN v1.2.22.20 — Deep Recovery Diagnostic

읽기 전용 복구 진단 패치입니다.

- 앱 시작 전 localStorage/sessionStorage snapshot 검사
- 현재 메모리 state/runSession/last run snapshot 검사
- IndexedDB Run Vault 전체 검사
- emergency per-run localStorage backup 검사
- 현재 Service Worker cache 이름 표시
- 2026-08-23 러닝 발견 시 Run ID, 거리, 시간, Route point 수, Split 수 표시
- Supabase/localStorage/IndexedDB 데이터 수정 없음

사용법: 배포 후 아이폰 ELDYN을 완전히 종료했다가 다시 열고 우측 하단 `DEEP RECOVERY CHECK` 버튼을 누릅니다.
