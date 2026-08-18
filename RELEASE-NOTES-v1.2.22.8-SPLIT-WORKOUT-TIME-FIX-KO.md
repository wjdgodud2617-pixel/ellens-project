# ELDYN v1.2.22.8 — Split / Workout Time Fix

- GPS 거리 누적 로직은 변경하지 않음.
- 최종 평균 Pace / AVG SPEED는 `최종 거리 + workoutDurationMs` 한 기준으로 계산.
- Auto Pause ON이어도 최종 평균 계산에서 movingMs로 교체하지 않음.
- 1KM Split을 `movingMs - 이전 split 합계` 방식에서 제거.
- 1km 경계를 실제 GPS 구간 안에서 보간하여 각 km 경계의 좌표·시간을 독립 저장.
- 여러 km 경계를 한 번에 통과하는 background bridge에서도 각 Split을 별도 경계로 생성.
- split 레코드에 누적 `elapsedMs`를 함께 저장해 1K/2K가 서로 보정되며 비정상적으로 쪼개지는 현상 방지.
- 기존 식단 / Calendar / Story / GPS 거리 필터는 변경하지 않음.

테스트: Apple Watch와 동시에 Start/Stop 후 거리, Workout Time, AVG Pace/Speed, 1K/2K Split 비교.
