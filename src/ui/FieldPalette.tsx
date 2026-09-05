"use client";

import { FIELD_STAMPS, type FieldKind } from "@/domain";

type FieldPaletteProps = {
  onAdd: (kind: FieldKind) => void;
};

export function FieldPalette({ onAdd }: FieldPaletteProps) {
  return (
    <aside className="palette">
      <p className="rail-label">Add a field</p>
      <p className="rail-help">Click to insert, or drag onto the form.</p>
      <ul>
        {FIELD_STAMPS.map((stamp) => (
          <li key={stamp.kind}>
            <button
              type="button"
              className="stamp"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("text/field-kind", stamp.kind);
                event.dataTransfer.effectAllowed = "copy";
              }}
              onClick={() => onAdd(stamp.kind)}
            >
              <span className="stamp-mark">{stamp.stamp}</span>
              <span>
                <strong>{stamp.caption}</strong>
                <em>{stamp.hint}</em>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
