"use client";

import { useState } from "react";
import { BuilderCanvas } from "./BuilderCanvas";
import { ClipboardFrame } from "./ClipboardFrame";
import { CopiesSheet } from "./CopiesSheet";
import { EmptyState, ErrorBanner } from "./EmptyState";
import { FieldInspector } from "./FieldInspector";
import { FieldPalette } from "./FieldPalette";
import { FillSheet } from "./FillSheet";
import { SheetTabs, type SheetName } from "./SheetTabs";
import { useFormBoard } from "./useFormBoard";

export function BoardApp() {
  const board = useFormBoard();
  const [sheet, setSheet] = useState<SheetName>("clip");

  if (board.loadError) {
    return (
      <ClipboardFrame onReset={board.restoreSeed}>
        <ErrorBanner message={board.loadError} onRetry={board.restoreSeed} />
      </ClipboardFrame>
    );
  }

  if (!board.form) {
    return (
      <ClipboardFrame onReset={board.restoreSeed}>
        <EmptyState title="Loading form" body="Your form will appear here in a moment." />
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
      ) : null}
      {sheet === "fill" ? (
        board.form.fields.length === 0 ? (
          <EmptyState
            title="No fields yet"
            body="Add at least one field before you can preview this form."
          />
        ) : (
          <FillSheet key={board.form.id} form={board.form} onSubmit={board.submitResponse} />
        )
      ) : null}
      {sheet === "copies" ? (
        <CopiesSheet form={board.form} responses={board.responses} onWipe={board.wipeCopies} />
      ) : null}
    </ClipboardFrame>
  );
}
