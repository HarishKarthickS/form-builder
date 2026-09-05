"use client";

import { useMemo, useState } from "react";
import { ErrorBanner } from "./EmptyState";
import {
  blankAnswers,
  validateAnswers,
  type FieldError,
  type FormAnswer,
  type FormDefinition,
  type FormField,
} from "@/domain";

type FillSheetProps = {
  form: FormDefinition;
  onSubmit: (answers: Record<string, FormAnswer>) => void;
};

function FieldControl({
  field,
  value,
  error,
  onChange,
}: {
  field: FormField;
  value: FormAnswer;
  error?: string;
  onChange: (value: FormAnswer) => void;
}) {
  const invalid = Boolean(error);
  return (
    <div className={invalid ? "fill-field is-void" : "fill-field"}>
      <label>
        {field.label}
        {field.required ? <span className="req">required</span> : null}
      </label>
      {field.help ? <p className="help">{field.help}</p> : null}

      {field.kind === "long_text" ? (
        <textarea
          rows={4}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {field.kind === "short_text" || field.kind === "email" || field.kind === "number" ? (
        <input
          type={field.kind === "email" ? "email" : field.kind === "number" ? "number" : "text"}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {field.kind === "date" ? (
        <input type="date" value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} />
      ) : null}

      {field.kind === "choice" ? (
        <div className="choices">
          {field.options.map((option) => (
            <label key={option} className="check">
              <input
                type="radio"
                name={field.id}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      ) : null}

      {field.kind === "checkboxes" ? (
        <div className="choices">
          {field.options.map((option) => {
            const selected = Array.isArray(value) ? value : [];
            const checked = selected.includes(option);
            return (
              <label key={option} className="check">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange(
                      checked ? selected.filter((item) => item !== option) : [...selected, option],
                    )
                  }
                />
                {option}
              </label>
            );
          })}
        </div>
      ) : null}

      {field.kind === "yes_no" ? (
        <div className="choices">
          {(["yes", "no"] as const).map((option) => (
            <label key={option} className="check">
              <input
                type="radio"
                name={field.id}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {option === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
      ) : null}

      {error ? <p className="void-note">{error}</p> : null}
    </div>
  );
}

export function FillSheet({ form, onSubmit }: FillSheetProps) {
  const [answers, setAnswers] = useState(() => blankAnswers(form));
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [receipt, setReceipt] = useState<string | null>(null);

  const errorMap = useMemo(() => {
    return Object.fromEntries(errors.map((item) => [item.fieldId, item.message]));
  }, [errors]);

  return (
    <form
      className="fill-sheet"
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validateAnswers(form, answers);
        setErrors(nextErrors);
        if (nextErrors.length) {
          setReceipt(null);
          return;
        }
        onSubmit(answers);
        setAnswers(blankAnswers(form));
        setReceipt("Original collated. Canary and pink are in Filed copies.");
      }}
    >
      <header>
        <h2>{form.title}</h2>
        <p>{form.subtitle}</p>
      </header>

      {errors.length > 0 ? (
        <ErrorBanner message="VOID — a few lines did not pass control. Fix the red rows." />
      ) : null}

      {form.fields.map((field) => (
        <FieldControl
          key={field.id}
          field={field}
          value={answers[field.id]}
          error={errorMap[field.id]}
          onChange={(value) => {
            setAnswers((current) => ({ ...current, [field.id]: value }));
          }}
        />
      ))}

      <button type="submit" className="file-btn">
        File original
      </button>
      {receipt ? <p className="receipt">{receipt}</p> : null}
    </form>
  );
}
