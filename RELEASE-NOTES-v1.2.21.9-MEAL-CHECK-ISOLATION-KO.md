# ELDYN v1.2.21.9 — Meal Check Isolation

- 기준: v1.2.21.2 Emergency Restore
- 식사 체크는 선택한 meal key와 날짜에만 귀속됩니다.
- 추천 식단 체크 시 추천 문구는 유지하고 해당 식사의 guideline 영양값만 실제 섭취 합계에 반영합니다.
- 과거 패치에서 생성된 mealKey/date 없는 recommended-plan 항목은 자동 체크 및 Daily Nutrition 계산에서 제외합니다.
- 실제 음식 로그가 있는 식사는 체크 동작으로 덮어쓰지 않습니다.
- 즉시 cloud save 호출을 제거하고 기존 debounce sync 한 경로만 사용해 클릭 직후 원격 stale 상태가 재병합되는 경쟁 조건을 줄였습니다.
- 캘린더/러닝/운동 코드는 변경하지 않았습니다.
