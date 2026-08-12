# ELDYN v1.2.21.1 Recovery

기준 버전: v1.2.21 PROGRESS RUN TREND

이번 버전은 v1.2.22/v1.2.23을 기반으로 하지 않습니다. 정상 기준점인 v1.2.21에서 식단 합계만 수정했습니다.

## 수정
- 식단 `foodItems`의 `kcal` 및 `calories` 저장 형식을 모두 인식합니다.
- `carbs`, `carb`, `carbohydrates` 등 기존/신규 필드명을 정규화합니다.
- AI/신규 로그에서 `nutrition` 또는 `macros` 내부에 저장된 영양값도 합산합니다.
- foodItems가 없는 구형 식사 로그는 식사 단위 영양값을 확인합니다.
- 구조화된 식단 영양값이 전혀 없는 과거 로그는 기존 일일 합계를 보존합니다.
- 구조화된 식단이 존재하면 Daily Nutrition의 kcal/P/C/F를 해당 식단 전체 합계로 다시 계산합니다.

## 의도적으로 변경하지 않은 부분
- 탭/그래프 클릭 이벤트
- 러닝 변화 그래프
- 최근 러닝 UI
- GPS 및 러닝/걷기 세션
- 인증샷 편집기

v1.2.22/v1.2.23에서 추가된 Running History UI는 이번 Recovery 버전에 포함하지 않았습니다. 식단 합계 안정화 후 별도로 다시 적용합니다.
