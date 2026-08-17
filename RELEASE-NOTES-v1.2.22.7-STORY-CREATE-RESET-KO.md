# ELDYN v1.2.22.7 — Story CREATE Reset Hotfix

- 러닝 인증샷 CREATE를 다시 열 때 이전 Preview가 순간적으로 보이는 현상 수정
- CREATE 진입 즉시 이전 Canvas / drag bounds / 진행 중 render token 초기화
- 선택한 run ID를 로드한 뒤 새 Preview만 렌더
- 사진 입력 및 photo transform은 기존처럼 새 인증샷 기준으로 초기화
- GPS, Auto Pause, AVG SPEED, 1KM Split, 식단, Today/Calendar 로직은 변경하지 않음
- Service Worker cache를 v1.2.22.7로 갱신
