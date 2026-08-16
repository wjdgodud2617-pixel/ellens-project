# ELDYN v1.2.22.5 — Auto Pause / Story Marker Hotfix

- v1.2.22.4 통합본 기준 핫픽스
- 러닝 중 GPS 자동 일시정지 ON/OFF 변경을 현재 세션에 즉시 반영
- 카메라/동영상 등 앱 전환 직전 Auto Pause 판정용 저속 샘플과 stillSince를 초기화
- 복귀 후 stale 저속 샘플 때문에 즉시 Auto Pause로 들어가는 현상 방지
- 거리, route, split 데이터는 Auto Pause 토글 시 초기화하지 않음
- 인증샷 1KM 구간 체크박스는 우측 1KM SPLITS 텍스트 패널 표시 여부만 제어
- 체크박스를 꺼도 Route 위 1K / 2K / 3K ... 마커는 항상 유지
- 평균 Pace/Speed, 식단, Calendar, Today 저장 로직은 변경하지 않음

주의: iOS PWA가 카메라/다른 앱 사용 중 실제로 suspend되면 그 시간 동안 연속 GPS 좌표 자체를 받을 수 없습니다. 이 패치는 복귀 시 Auto Pause 오판과 상태 초기화 문제를 방지하지만, iOS가 제공하지 않은 곡선 경로를 임의로 생성하지는 않습니다.
