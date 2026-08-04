import SwiftUI

struct WatchRunView: View {
    @State private var isRunning = false
    @State private var elapsedSeconds = 0
    @State private var distanceKm = 0.00

    private let simulatedSpeedKmh = 10.0
    private let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
    private let neon = Color(red: 0.55, green: 1.0, blue: 0.10)

    private var timeText: String {
        let hours = elapsedSeconds / 3600
        let minutes = (elapsedSeconds % 3600) / 60
        let seconds = elapsedSeconds % 60
        return hours > 0
            ? String(format: "%02d:%02d:%02d", hours, minutes, seconds)
            : String(format: "%02d:%02d", minutes, seconds)
    }

    private var paceText: String {
        guard distanceKm > 0.001 else { return "--'--\"" }
        let paceSeconds = Double(elapsedSeconds) / distanceKm
        let minutes = Int(paceSeconds) / 60
        let seconds = Int(paceSeconds) % 60
        return String(format: "%d'%02d\"", minutes, seconds)
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 7) {
                HStack(spacing: 5) {
                    Text("ELDYN")
                        .font(.system(size: 15, weight: .black, design: .rounded))
                        .foregroundStyle(neon)
                    Text("TEST")
                        .font(.system(size: 8, weight: .bold))
                        .foregroundStyle(.black)
                        .padding(.horizontal, 5)
                        .padding(.vertical, 2)
                        .background(neon, in: Capsule())
                }

                Text(isRunning ? "RUNNING" : "READY")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(.secondary)

                Text(String(format: "%.2f", distanceKm))
                    .font(.system(size: 34, weight: .black, design: .rounded))
                    .foregroundStyle(neon)
                    .monospacedDigit()
                Text("KM")
                    .font(.system(size: 9, weight: .bold))
                    .foregroundStyle(.secondary)
                    .offset(y: -7)

                HStack(spacing: 13) {
                    metric(title: "TIME", value: timeText)
                    metric(title: "PACE", value: paceText)
                }

                HStack(spacing: 8) {
                    Button(isRunning ? "PAUSE" : "START") {
                        isRunning.toggle()
                    }
                    .tint(neon)

                    Button("RESET", role: .destructive) {
                        isRunning = false
                        elapsedSeconds = 0
                        distanceKm = 0
                    }
                }
                .font(.system(size: 10, weight: .bold))
            }
            .padding(.horizontal, 6)
        }
        .background(Color.black)
        .onReceive(timer) { _ in
            guard isRunning else { return }
            elapsedSeconds += 1
            distanceKm += simulatedSpeedKmh / 3600.0
        }
    }

    private func metric(title: String, value: String) -> some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: 14, weight: .bold, design: .rounded))
                .monospacedDigit()
                .foregroundStyle(.white)
            Text(title)
                .font(.system(size: 8, weight: .semibold))
                .foregroundStyle(.secondary)
        }
    }
}

#Preview {
    WatchRunView()
}
