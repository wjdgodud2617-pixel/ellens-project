# ELDYN v1.2.22

- Progress의 최근 러닝 목록을 최신 3개로 제한했습니다.
- 전체 기록은 별도 Running History 창에서 DB/동기화된 전체 러닝 기록을 불러옵니다.
- 러닝 변화 그래프는 기존처럼 전체 기록 데이터를 사용합니다.
- Daily Nutrition 표시가 foodItems 기반 상세 로그와 기존/신규 aggregate 영양 로그를 함께 안전하게 인식하도록 보완했습니다.
- 상세 음식 로그가 없는 날짜에도 저장된 calories/protein/carbs/fat 값이 0으로 보이지 않도록 수정했습니다.
