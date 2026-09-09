export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4">
      {/* 프로필 카드 */}
      <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
        {/* 아바타 */}
        <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-4xl select-none">
          🧑‍💻
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">주승현</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-700" />

        {/* 링크 목록 플레이스홀더 */}
        <div className="w-full flex flex-col gap-3">
          <a
            href="#"
            className="w-full py-3 px-5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            🔗 링크 추가하기
          </a>
        </div>
      </div>
    </main>
  );
}
