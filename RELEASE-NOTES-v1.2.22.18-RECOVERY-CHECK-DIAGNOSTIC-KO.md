# ELDYN v1.2.22.18 — Recovery Check 진단

- iPhone 저장공간을 **읽기 전용**으로 검사합니다.
- 앱 스크립트가 시작되는 즉시 localStorage/sessionStorage를 snapshot으로 보존한 뒤 검사하므로 Cloud Pull 이전 흔적도 확인할 수 있습니다.
- 화면 우측 하단 `RECOVERY CHECK` 버튼에서 2026-08-23 러닝 객체, run ID, 거리, 시간, route point, split 수를 확인합니다.
- Supabase 저장, localStorage 변경, Cloud Pull 강제 실행, 데이터 삭제를 하지 않습니다.
