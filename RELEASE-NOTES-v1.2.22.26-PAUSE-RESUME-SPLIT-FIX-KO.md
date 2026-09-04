# ELDYN v1.2.22.26 — Pause/Resume + 1km Split Fix

- GPS 거리 반영 정확도 기준을 30m 이내로 강화했습니다.
- 수동 일시정지 후 재시작 시 첫 정상 GPS fix는 새 기준점으로만 사용하며, 정지 중 위치 변화는 거리/구간 기록에 연결하지 않습니다.
- 1km split 보간 시간은 GPS wall-clock 간격 대신 일시정지 시간이 제외된 운동 경과시간 기준으로 계산합니다.
- accepted GPS point마다 운동시계 기준점을 저장하여 재시작 이후 3km/4km split이 느려지는 현상을 방지합니다.
- 기존 인증샷 커스터마이징 UI는 유지합니다.
