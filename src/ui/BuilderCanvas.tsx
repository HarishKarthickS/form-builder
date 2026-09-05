"use client";

import type { DragEvent } from "react";
import { fieldNeedsOptions, type FieldKind, type FormDefinition } from "@/domain";
import { EmptyState } from "./EmptyState";

type BuilderCanvasProps = {
  form: FormDefinition;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMeta: (patch: Partial<Pick<FormDefinition, "title" | "subtitle">>) => void;
  onAdd: (kind: FieldKind, atIndex?: number) => void;
  onMove: (fromId: string, toIndex: number) => void;
  onRemove: (id: string) => void;
};

function kindFromEvent(event: DragEvent): FieldKind | null {
  const kind = event.dataTransfer.getData("text/field-kind") as FieldKind;
  return kind || null;
}

function fieldIdFromEvent(event: DragEvent): string | null {
  return event.dataTransfer.getData("text/field-id") || null;
}

export function BuilderCanvas({
  form,
  selectedId,
  onSelect,
  onMeta,
  onAdd,
  onMove,
  onRemove,
}: BuilderCanvasProps) {
  const onDropAt = (index: number) => (event: DragEvent) => {
    event.preventDefault();
    const existing = fieldIdFromEvent(event);
    if (existing) {
      onMove(existing, index);
      return;
    }
    const kind = kindFromEvent(event);
    if (kind) onAdd(kind, index);
  };

  return (
    <div className="canvas">
      <label className="meta">
        Form title
        <input value={form.title} onChange={(event) => onMeta({ title: event.target.value })} />
      </label>
      <label className="meta">
        Subtitle
        <input
          value={form.subtitle}
          onChange={(event) => onMeta({ subtitle: event.target.value })}
        />
      </label>

      {form.fields.length === 0 ? (
        <EmptyState
          title="This ply is blank"
          body="Pick a field code from the left rail, or drag one onto the white original."
        />
      ) : null}

      <ol className="field-list">
        {form.fields.map((field, index) => (
          <li
            key={field.id}
            className={selectedId === field.id ? "field-row is-selected" : "field-row"}
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDropAt(index)}
          >
            <button
              type="button"
              className="field-handle"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("text/field-id", field.id);
                event.dataTransfer.effectAllowed = "move";
              }}
              aria-label={`Drag ${field.label}`}
            >
              ≡
            </button>
            <button type="button" className="field-body" onClick={() => onSelect(field.id)}>
              <span className="field-kind">{field.kind.replaceAll("_", " ")}</span>
              <strong>{field.label || "Untitled line"}</strong>
              {field.required ? <span className="req">required</span> : null}
              {fieldNeedsOptions(field.kind) ? (
                <span className="opts">{field.options.join(" · ")}</span>
              ) : null}
            </button>
            <button type="button" className="field-x" onClick={() => onRemove(field.id)}>
              Tear
            </button>
          </li>
        ))}
      </ol>

      <div
        className="drop-well"
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDropAt(form.fields.length)}
      >
        Drop a field code here — or click one on the left rail.
      </div>
    </div>
  );
}
