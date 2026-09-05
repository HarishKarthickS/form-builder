import type { FormDefinition, FormResponse } from "@/domain";
import { seedRequisition, seedResponses } from "./seed";

const FORM_KEY = "form-builder:form";
const RESPONSES_KEY = "form-builder:responses";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadForm(): FormDefinition {
  const stored = readJson<FormDefinition>(FORM_KEY);
  if (stored?.id && Array.isArray(stored.fields)) {
    return stored;
  }
  const seed = seedRequisition();
  writeJson(FORM_KEY, seed);
  const replies = seedResponses(seed);
  writeJson(RESPONSES_KEY, replies);
  return seed;
}

export function saveForm(form: FormDefinition): void {
  writeJson(FORM_KEY, form);
}

export function loadResponses(formId: string): FormResponse[] {
  const stored = readJson<FormResponse[]>(RESPONSES_KEY);
  if (!Array.isArray(stored)) return [];
  return stored.filter((row) => row.formId === formId);
}

export function saveResponses(rows: FormResponse[]): void {
  writeJson(RESPONSES_KEY, rows);
}

export function appendResponse(row: FormResponse): FormResponse[] {
  const all = readJson<FormResponse[]>(RESPONSES_KEY) ?? [];
  const next = [row, ...all];
  writeJson(RESPONSES_KEY, next);
  return next.filter((item) => item.formId === row.formId);
}

export function clearResponses(formId: string): FormResponse[] {
  const all = readJson<FormResponse[]>(RESPONSES_KEY) ?? [];
  const kept = all.filter((row) => row.formId !== formId);
  writeJson(RESPONSES_KEY, kept);
  return [];
}

export function resetToSeed(): { form: FormDefinition; responses: FormResponse[] } {
  const form = seedRequisition();
  const responses = seedResponses(form);
  writeJson(FORM_KEY, form);
  writeJson(RESPONSES_KEY, responses);
  return { form, responses };
}
