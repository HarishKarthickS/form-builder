import type { FieldKind, FormField } from "./types";
import { newId } from "./ids";

export type FieldStamp = {
  kind: FieldKind;
  stamp: string;
  caption: string;
  hint: string;
};

export const FIELD_STAMPS: FieldStamp[] = [
  { kind: "short_text", stamp: "LINE", caption: "Short line", hint: "Name, desk, one-liner" },
  { kind: "long_text", stamp: "MEMO", caption: "Memo block", hint: "Notes that run long" },
  { kind: "email", stamp: "MAIL", caption: "Office mail", hint: "Needs an @ in it" },
  { kind: "number", stamp: "QTY", caption: "Quantity", hint: "Plain number" },
  { kind: "choice", stamp: "PICK", caption: "Pick one", hint: "Radio choices" },
  { kind: "checkboxes", stamp: "TICK", caption: "Tick several", hint: "Boxes you can stack" },
  { kind: "date", stamp: "DATE", caption: "Calendar", hint: "A single day" },
  { kind: "yes_no", stamp: "Y/N", caption: "Yes or no", hint: "Rubber-stamp binary" },
];

const DEFAULT_OPTIONS: Partial<Record<FieldKind, string[]>> = {
  choice: ["Option A", "Option B", "Option C"],
  checkboxes: ["First", "Second", "Third"],
};

export function createField(kind: FieldKind, label?: string): FormField {
  const stamp = FIELD_STAMPS.find((item) => item.kind === kind);
  return {
    id: newId("fld"),
    kind,
    label: label ?? stamp?.caption ?? "Untitled field",
    help: "",
    required: kind === "short_text" || kind === "email",
    placeholder: kind === "short_text" ? "Write on the line" : "",
    options: [...(DEFAULT_OPTIONS[kind] ?? [])],
  };
}

export function fieldNeedsOptions(kind: FieldKind): boolean {
  return kind === "choice" || kind === "checkboxes";
}

export function emptyForm(title = "Untitled requisition"): import("./types").FormDefinition {
  return {
    id: newId("frm"),
    title,
    subtitle: "Clip fields to the board, then send it around the office.",
    fields: [],
    updatedAt: new Date().toISOString(),
  };
}
