import type { ReactNode } from "react";

type ClipboardFrameProps = {
  children: ReactNode;
  onReset: () => void;
};

export function ClipboardFrame({ children, onReset }: ClipboardFrameProps) {
  return (
    <div className="desk">
      <header className="mast">
        <div>
          <h1>form-builder</h1>
          <p>The clipboard on the supply closet door.</p>
        </div>
        <button type="button" className="reset" onClick={onReset}>
          Restore seed form
        </button>
      </header>
      <div className="clipboard">
        <div className="clip-bar">
          <div className="clip" aria-hidden="true" />
        </div>
        <div className="paper">
          <div className="holes" aria-hidden="true">
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
