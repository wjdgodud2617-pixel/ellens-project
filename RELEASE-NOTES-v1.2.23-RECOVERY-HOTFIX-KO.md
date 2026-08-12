# ELDYN v1.2.23 Recovery Hotfix

- v1.2.22의 Progress 그래프 탭 터치 이벤트를 각 그룹 내부로 격리했습니다.
- 상단/하단 기간·지표 버튼의 클릭 전파를 차단해 동시에 눌리는 현상을 방지했습니다.
- Daily Nutrition 합계는 `foodItems`를 단일 기준으로 합산합니다.
- `kcal/calories`, `carb/carbs` 필드명을 모두 인식합니다.
- 상세 음식이 없는 구버전 로그에 한해서 기존 일일 aggregate 값을 fallback으로 사용합니다.
- 최근 러닝 3개 + 전체 러닝 기록 보기와 v1.2.22 이전 기능은 유지합니다.
