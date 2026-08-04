# ELDYN Apple Watch 화면 테스트

## 이번 패치에서 되는 것
- 실제 Apple Watch 또는 watchOS Simulator에 ELDYN 러닝 테스트 화면 표시
- 거리, 시간, 페이스 표시
- START / PAUSE / RESET 버튼
- 테스트용 거리와 시간이 자동 증가

## 이번 패치에서 하지 않는 것
- PWA와 실시간 연결
- 실제 GPS·심박수·Apple Health 데이터 수집
- 잠금 화면 Live Activity

## 실행 순서
1. Mac에서 Xcode를 설치합니다.
2. `apple-watch-test/generate-project.command`를 더블클릭합니다.
3. 처음 실행 시 XcodeGen이 필요하며, 스크립트가 Homebrew를 통해 설치를 시도합니다.
4. Xcode 상단 실행 기기를 Apple Watch Simulator 또는 연결된 Apple Watch로 선택합니다.
5. ▶ Run을 누릅니다.
6. 워치에서 ELDYN 화면과 버튼 동작을 확인합니다.

## 서명 오류가 날 때
Xcode의 프로젝트 설정에서 `ELDYNWatchTest` 타깃 → Signing & Capabilities → Team에 본인의 Apple ID 팀을 선택합니다.

이 폴더는 UI 테스트용 별도 watchOS 프로젝트입니다. GitHub/Vercel에 올려도 PWA 배포에는 영향을 주지 않습니다.
