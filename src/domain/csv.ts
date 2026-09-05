import type { FormAnswer, FormDefinition, FormResponse } from "./types";

function cell(value: FormAnswer | undefined): string {
  if (value === undefined || value === "") return "";
  if (Array.isArray(value)) return value.join("; ");
  if (typeof value === "boolean") return value ? "yes" : "no";
  return String(value);
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function responsesToCsv(form: FormDefinition, responses: FormResponse[]): string {
  const headers = ["submitted_at", ...form.fields.map((field) => field.label || field.id)];
  const lines = [headers.map(escapeCsv).join(",")];

  for (const response of responses) {
    const row = [
      response.submittedAt,
      ...form.fields.map((field) => cell(response.answers[field.id])),
    ];
    lines.push(row.map(escapeCsv).join(","));
  }

  return `${lines.join("\n")}\n`;
}
