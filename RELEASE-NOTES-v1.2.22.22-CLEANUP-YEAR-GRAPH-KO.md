# ELDYN v1.2.22.22 — CLEANUP + 1Y RUN GRAPH

- 임시 RECOVERY CHECK / 진단 UI와 관련 진단 코드를 제거했습니다.
- 완료 러닝 유실 방지용 IndexedDB Run Vault는 유지합니다.
- 2026-08-23 수동 복구 러닝 기록과 인증샷용 경로는 유지합니다.
- Progress 러닝 그래프 기간을 1M / 3M / 6M / 1Y로 정리했습니다.
- 그래프 기간과 하단 MONTH 기록 필터를 완전히 분리했습니다.
- 1Y 선택 시 최근 365일 러닝 추이를 표시합니다.
- 하단 기록 목록은 기존처럼 선택한 월만 표시합니다.
- GPS / Split / Pace / 식단 / 종료 / Cloud sync 계산 로직은 변경하지 않았습니다.
