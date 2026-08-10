# ELDYN v1.2.19 러닝·걷기 인증샷 터치 편집 수정

- 캔버스에서 직접 터치한 Distance / Pace / Time / Caption / Logo / Route가 드롭다운 선택보다 우선하도록 수정
- iPhone에서 드래그 중 포인터가 끊기지 않도록 pointer capture 적용
- 캔버스 + window fallback으로 드래그 추적 보강
- 드래그 중 과도한 재렌더링을 requestAnimationFrame으로 제한해 움직임 안정화
- Distance / Pace / Time / Caption 개별 크기 슬라이더를 각 오브젝트에 직접 연결
- 개별 크기 변경값 저장 보강
- v1.2.18 이전 GPS/세션 복구 및 기존 기능 유지
