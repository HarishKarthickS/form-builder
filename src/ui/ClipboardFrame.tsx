import type { ReactNode } from "react";

type ClipboardFrameProps = {
  children: ReactNode;
  onReset: () => void;
};

export function ClipboardFrame({ children, onReset }: ClipboardFrameProps) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="mark" aria-hidden="true" />
          <div>
            <h1>form-builder</h1>
            <p className="tag">Fields, live preview, and responses.</p>
          </div>
        </div>
        <button type="button" className="reset" onClick={onReset}>
          Restore seed form
        </button>
      </header>
      <main className="workspace">{children}</main>
    </div>
  );
}
