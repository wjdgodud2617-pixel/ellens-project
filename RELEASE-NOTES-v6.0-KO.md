# ELDYN v6.0 — Data Safe + Live Run HUD + Story Studio

반영 내용

1. 데이터 안정화
- Supabase payload가 문자열/객체 어느 형태든 복원
- 로컬과 클라우드 중 updatedAt이 최신인 기록 우선 병합
- 복원 전 자동 로컬 백업(eldyn-before-cloud-restore)
- daily_logs 내부 러닝 기록을 전역 러닝 히스토리로 재구성
- 중복 러닝 제거

2. 러닝 경험 개선
- 지도 위에 거리·평균 페이스·시간 HUD 표시
- 기존 GPS 경로 및 자동 세션 저장 유지

3. Story Studio MVP
- 공유 카드에서 로고·기록·경로·문구를 직접 드래그
- 텍스트/경로/로고 크기 조절 유지
- 배치 초기화 및 My Layout 저장
- Story 9:16, Feed 4:5, Square 1:1 내보내기

주의
- iOS PWA는 화면 잠금 중 GPS가 중단될 수 있습니다. 네이티브 앱 전환 전까지는 앱을 화면에 유지하는 것이 가장 안정적입니다.
