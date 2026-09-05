"use client";

import { useState } from "react";
import { BuilderCanvas } from "./BuilderCanvas";
import { ClipboardFrame } from "./ClipboardFrame";
import { FieldInspector } from "./FieldInspector";
import { FieldPalette } from "./FieldPalette";
import { SheetTabs, type SheetName } from "./SheetTabs";
import { useFormBoard } from "./useFormBoard";

export function BoardApp() {
  const board = useFormBoard();
  const [sheet, setSheet] = useState<SheetName>("clip");

  if (!board.form) {
    return (
      <ClipboardFrame onReset={board.restoreSeed}>
        <p className="placeholder-copy">Opening the drawer…</p>
      </ClipboardFrame>
    );
  }

  return (
    <ClipboardFrame onReset={board.restoreSeed}>
      <SheetTabs sheet={sheet} onChange={setSheet} />
      {sheet === "clip" ? (
        <section className="board-grid">
          <FieldPalette onAdd={(kind) => board.addField(kind)} />
          <BuilderCanvas
            form={board.form}
            selectedId={board.selectedId}
            onSelect={board.setSelectedId}
            onMeta={board.updateMeta}
            onAdd={board.addField}
            onMove={board.moveField}
            onRemove={board.removeField}
          />
          <FieldInspector field={board.selected} onChange={board.updateField} />
        </section>
      ) : (
        <p className="placeholder-copy">
          {sheet === "fill"
            ? "Preview and fill land on the next sheet."
            : "Submitted copies will stack here."}
        </p>
      )}
    </ClipboardFrame>
  );
}
