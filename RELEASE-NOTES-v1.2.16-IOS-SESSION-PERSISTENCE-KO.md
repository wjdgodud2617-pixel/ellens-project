# ELDYN v1.2.16 — iOS 앱 전환 / 세션 복구 안정화

이번 버전은 iPhone 홈 화면 PWA에서 러닝·걷기 중 카메라나 다른 앱을 열고 ELDYN이 뒤로 밀렸을 때 세션이 끊기거나 GPS watcher가 죽는 문제를 줄이기 위한 안정화 패치입니다.

## 변경 사항

- 러닝 시작 시 고유 sessionId를 생성하고 진행 상태를 localStorage에 지속 저장
- 현재 거리, 마지막 유효 GPS 좌표, 누적 시간, 스플릿, 경로, 마지막 GPS 수신 시각을 세션 스냅샷으로 유지
- visibilitychange / pagehide / freeze 전에 세션과 마지막 좌표를 즉시 저장
- pageshow / focus / visibility 복귀 시 GPS watcher를 강제로 새로 연결
- iOS가 PWA 프로세스를 정리해 페이지가 다시 로드돼도 12시간 이내의 진행 중 세션을 자동 복원
- 복원된 세션은 기존처럼 강제 Pause하지 않고 Running 상태로 이어가기
- 앱 전환 중 수집할 수 없었던 구간은 마지막 유효 위치와 복귀 위치 사이가 현실적인 속도 범위일 때만 직선 거리로 보정
- Run/Walk 별 최대 현실 속도 검증으로 비정상 GPS 점프 방지
- GPS가 화면 복귀 후 15초 이상 새 좌표를 보내지 않으면 watchdog가 watcher를 자동 재시작
- 기존 GPS 거리 정확도, 1km Split, Run/Walk 인증샷, AI Daily Review, Workout 연동 기능 유지

## PWA 한계

iOS가 PWA를 완전히 suspend한 동안에는 실제 이동 경로의 중간 GPS 좌표를 수집할 수 없습니다. 따라서 중단 구간은 복귀 시 마지막 위치와 현재 위치를 직선으로 보정하며, 방향을 많이 바꾼 경우 실제 거리보다 짧게 기록될 수 있습니다.
