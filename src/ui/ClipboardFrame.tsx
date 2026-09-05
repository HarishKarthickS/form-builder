import type { ReactNode } from "react";

type ClipboardFrameProps = {
  children: ReactNode;
  onReset: () => void;
};

export function ClipboardFrame({ children, onReset }: ClipboardFrameProps) {
  return (
    <div className="cubicle">
      <div className="fluoro-bar" aria-hidden="true">
        <span className="tube" />
        <span className="tube" />
        <span className="tube" />
      </div>
      <header className="mast">
        <div>
          <p className="dept">FAC-CTRL · PAD 3NCR · CUBICLE 12B</p>
          <h1>form-builder</h1>
          <p className="tag">White original, canary file, pink audit — under the tubes.</p>
        </div>
        <button type="button" className="reset" onClick={onReset}>
          Restore seed form
        </button>
      </header>
      <div className="ncr-stack">
        <div className="ply ply-pink" aria-hidden="true" />
        <div className="ply ply-canary" aria-hidden="true" />
        <div className="ply ply-white">
          <div className="perf" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
