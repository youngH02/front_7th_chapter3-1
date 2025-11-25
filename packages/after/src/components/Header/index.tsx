import { type FC } from "react";

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
            L
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">Hanghae Company</p>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
