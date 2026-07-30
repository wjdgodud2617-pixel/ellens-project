# ELDYN v5.6.2 데이터 복구 패치

- 기존 ELDYN/Ellen localStorage 키 자동 탐색 및 마이그레이션
- 로그인 직후 클라우드 데이터를 먼저 불러온 뒤 동기화 시작
- 빈 초기 데이터가 Supabase 기록을 덮어쓰지 않도록 보호
- daily_logs의 payload 구조를 기존 화면 상태에 안전하게 병합
- 서비스워커 캐시 버전 갱신
