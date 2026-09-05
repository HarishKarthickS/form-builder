"use client";

import { EmptyState } from "./EmptyState";
import { responsesToCsv, type FormAnswer, type FormDefinition, type FormResponse } from "@/domain";

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

function downloadCsv(form: FormDefinition, responses: FormResponse[]) {
  const csv = responsesToCsv(form, responses);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "form";
  link.href = url;
  link.download = `${slug}-responses.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function CopiesSheet({ form, responses, onWipe }: CopiesSheetProps) {
  return (
    <section className="copies">
      <header className="copies-head">
        <div>
          <h2>Responses</h2>
          <p>
            {responses.length} {responses.length === 1 ? "response" : "responses"}
          </p>
        </div>
        <div className="copy-actions">
          <button
            type="button"
            className="wipe"
            onClick={() => downloadCsv(form, responses)}
            disabled={responses.length === 0}
          >
            Export CSV
          </button>
          <button type="button" className="wipe" onClick={onWipe} disabled={responses.length === 0}>
            Clear responses
          </button>
        </div>
      </header>

      {responses.length === 0 ? (
        <EmptyState
          title="No responses yet"
          body="Submit the form from Preview. Seed replies return if you restore the sample form."
        />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Submitted</th>
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
      )}
    </section>
  );
}
