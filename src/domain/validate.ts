import type { FieldError, FormAnswer, FormDefinition, FormField } from "./types";

function asText(value: FormAnswer | undefined): string {
  if (value === undefined || value === false) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "yes" : "";
  return String(value).trim();
}

export function isFieldEmpty(field: FormField, value: FormAnswer | undefined): boolean {
  if (field.kind === "checkboxes") {
    return !Array.isArray(value) || value.length === 0;
  }
  if (field.kind === "yes_no") {
    return value !== true && value !== false && value !== "yes" && value !== "no";
  }
  return asText(value) === "";
}

export function validateAnswers(
  form: FormDefinition,
  answers: Record<string, FormAnswer>,
): FieldError[] {
  const errors: FieldError[] = [];

  for (const field of form.fields) {
    const value = answers[field.id];
    if (field.required && isFieldEmpty(field, value)) {
      errors.push({ fieldId: field.id, message: "This line is required." });
      continue;
    }
    if (field.kind === "email" && !isFieldEmpty(field, value)) {
      const text = asText(value);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        errors.push({ fieldId: field.id, message: "That does not look like office mail." });
      }
    }
    if (field.kind === "number" && !isFieldEmpty(field, value)) {
      if (Number.isNaN(Number(asText(value)))) {
        errors.push({ fieldId: field.id, message: "Put a number in the qty box." });
      }
    }
  }

  return errors;
}

export function blankAnswers(form: FormDefinition): Record<string, FormAnswer> {
  const answers: Record<string, FormAnswer> = {};
  for (const field of form.fields) {
    answers[field.id] = field.kind === "checkboxes" ? [] : "";
  }
  return answers;
}
