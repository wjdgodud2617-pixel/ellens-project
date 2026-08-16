# ELDYN v1.2.22.3 — 평균 페이스/평균속도 계산 수정

- 평균 페이스와 평균속도를 동일한 기준 시간으로 계산하도록 통일
- Auto Pause OFF: 최종 거리 ÷ 실제 운동시간 기준
- Auto Pause ON: 최종 거리 ÷ 이동시간 기준
- 실시간 AVG PACE, 기록 목록, 캘린더, Progress, 인증샷, Latest Run Analysis 모두 동일 산식 사용
- 기존 기록도 화면 표시 시 현재 산식으로 재계산
- 평균속도는 평균 페이스의 역산값(3600 / sec per km)으로 일치
- GPS 거리 계산, 1KM Split, 식단, 캘린더 데이터 로직은 변경하지 않음
