"use client";

import { fieldNeedsOptions, type FormField } from "@/domain";

type FieldInspectorProps = {
  field: FormField | null;
  onChange: (id: string, patch: Partial<FormField>) => void;
};

export function FieldInspector({ field, onChange }: FieldInspectorProps) {
  if (!field) {
    return (
      <aside className="inspector">
        <p className="rail-label">Pink ply notes</p>
        <p className="rail-help">Select a typed line to retitle it on all three copies.</p>
      </aside>
    );
  }

  return (
    <aside className="inspector">
      <p className="rail-label">Pink ply notes</p>
      <label>
        Label
        <input value={field.label} onChange={(event) => onChange(field.id, { label: event.target.value })} />
      </label>
      <label>
        Help text
        <input value={field.help} onChange={(event) => onChange(field.id, { help: event.target.value })} />
      </label>
      <label>
        Placeholder
        <input
          value={field.placeholder}
          onChange={(event) => onChange(field.id, { placeholder: event.target.value })}
        />
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(event) => onChange(field.id, { required: event.target.checked })}
        />
        Required on original
      </label>
      {fieldNeedsOptions(field.kind) ? (
        <label>
          Choices (one per line)
          <textarea
            rows={5}
            value={field.options.join("\n")}
            onChange={(event) =>
              onChange(field.id, {
                options: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
              })
            }
          />
        </label>
      ) : null}
    </aside>
  );
}
