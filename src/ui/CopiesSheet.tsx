"use client";

import type { FormAnswer, FormDefinition, FormResponse } from "@/domain";

type CopiesSheetProps = {
  form: FormDefinition;
  responses: FormResponse[];
  onWipe: () => void;
};

function pretty(value: FormAnswer | undefined): string {
  if (value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  return String(value);
}

export function CopiesSheet({ form, responses, onWipe }: CopiesSheetProps) {
  return (
    <section className="copies">
      <header className="copies-head">
        <div>
          <h2>Carbon copies</h2>
          <p>{responses.length} filed against this requisition.</p>
        </div>
        <button type="button" className="wipe" onClick={onWipe} disabled={responses.length === 0}>
          Dump the pile
        </button>
      </header>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Filed at</th>
              {form.fields.map((field) => (
                <th key={field.id}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((row) => (
              <tr key={row.id}>
                <td className="mono">{new Date(row.submittedAt).toLocaleString()}</td>
                {form.fields.map((field) => (
                  <td key={field.id}>{pretty(row.answers[field.id])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
