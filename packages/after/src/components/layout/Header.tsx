import { type FC, useState, useEffect } from "react";

const Header: FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
            L
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              Hanghae Company
            </p>
            <p className="text-xs text-muted-foreground">
              Design System Migration Project
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Demo User</p>
            <p className="text-xs text-muted-foreground">demo@example.com</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
            DU
          </div>
          {/* 다크모드 토글 스위치 */}
          <button
            onClick={toggleDark}
            aria-label="다크모드 토글"
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
            title="다크모드 토글">
            {isDark ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.42-1.42M6.34 6.34 4.93 4.93m12.73 0-1.41 1.41M6.34 17.66l-1.41 1.41"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
