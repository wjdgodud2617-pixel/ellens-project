# ELDYN v1.2.18 — 러닝/걷기 인증샷 편집 안정화

- Distance / Pace / Time / Caption 크기 슬라이더를 각각 분리했습니다.
- 하나의 공용 텍스트 크기 슬라이더가 첫 항목에만 적용되던 문제를 제거했습니다.
- 캔버스를 드래그할 때 매 프레임 canvas width/height를 다시 설정해 포인터 캡처가 끊길 수 있던 문제를 수정했습니다.
- 드래그 추적을 canvas 내부가 아니라 window pointermove/up으로 이어 받아 iPhone에서 손가락이 요소 밖으로 나가도 이동이 계속됩니다.
- Distance / Pace / Time / Caption / Logo / Route의 터치 판정 영역을 넓혔습니다.
- 자동 선택 모드에서 실제 터치한 요소를 이동 대상으로 자동 전환합니다.
- v1.2.17 이전의 GPS/세션 복구/AI/운동 기능은 유지합니다.
