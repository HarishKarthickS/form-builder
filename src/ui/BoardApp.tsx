"use client";

import { useState } from "react";
import { ClipboardFrame } from "./ClipboardFrame";
import { SheetTabs, type SheetName } from "./SheetTabs";

export function BoardApp() {
  const [sheet, setSheet] = useState<SheetName>("clip");

  return (
    <ClipboardFrame onReset={() => undefined}>
      <SheetTabs sheet={sheet} onChange={setSheet} />
      <section className="board-grid">
        <aside>
          <p className="placeholder-copy">Stamps will live on this rail.</p>
        </aside>
        <div>
          <p className="placeholder-copy">
            {sheet === "clip" && "The form paper is clipped. Fields arrive next."}
            {sheet === "fill" && "Preview and fill land on this sheet."}
            {sheet === "copies" && "Submitted copies will stack here."}
          </p>
        </div>
        <aside>
          <p className="placeholder-copy">Select a field to edit the label.</p>
        </aside>
      </section>
    </ClipboardFrame>
  );
}
