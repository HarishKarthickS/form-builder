"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createField,
  newId,
  nowIso,
  type FieldKind,
  type FormDefinition,
  type FormField,
  type FormResponse,
} from "@/domain";
import {
  appendResponse,
  clearResponses,
  loadForm,
  loadResponses,
  resetToSeed,
  saveForm,
} from "@/data";

export function useFormBoard() {
  const [form, setForm] = useState<FormDefinition | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const next = loadForm();
      setForm(next);
      setResponses(loadResponses(next.id));
      setSelectedId(next.fields[0]?.id ?? null);
    } catch {
      setLoadError("Could not load the form. Reload the page or restore the seed.");
    }
  }, []);

  const persist = useCallback((next: FormDefinition) => {
    const stamped = { ...next, updatedAt: nowIso() };
    setForm(stamped);
    saveForm(stamped);
  }, []);

  const addField = useCallback(
    (kind: FieldKind, atIndex?: number) => {
      if (!form) return;
      const field = createField(kind);
      const fields = [...form.fields];
      const index = atIndex ?? fields.length;
      fields.splice(index, 0, field);
      persist({ ...form, fields });
      setSelectedId(field.id);
    },
    [form, persist],
  );

  const moveField = useCallback(
    (fromId: string, toIndex: number) => {
      if (!form) return;
      const from = form.fields.findIndex((field) => field.id === fromId);
      if (from < 0) return;
      const fields = [...form.fields];
      const [item] = fields.splice(from, 1);
      const clamped = Math.max(0, Math.min(toIndex, fields.length));
      fields.splice(clamped, 0, item);
      persist({ ...form, fields });
    },
    [form, persist],
  );

  const updateField = useCallback(
    (id: string, patch: Partial<FormField>) => {
      if (!form) return;
      persist({
        ...form,
        fields: form.fields.map((field) => (field.id === id ? { ...field, ...patch } : field)),
      });
    },
    [form, persist],
  );

  const removeField = useCallback(
    (id: string) => {
      if (!form) return;
      const fields = form.fields.filter((field) => field.id !== id);
      persist({ ...form, fields });
      setSelectedId(fields[0]?.id ?? null);
    },
    [form, persist],
  );

  const updateMeta = useCallback(
    (patch: Partial<Pick<FormDefinition, "title" | "subtitle">>) => {
      if (!form) return;
      persist({ ...form, ...patch });
    },
    [form, persist],
  );

  const submitResponse = useCallback(
    (answers: FormResponse["answers"]) => {
      if (!form) return;
      const row: FormResponse = {
        id: newId("rsp"),
        formId: form.id,
        submittedAt: nowIso(),
        answers,
      };
      setResponses(appendResponse(row));
    },
    [form],
  );

  const wipeCopies = useCallback(() => {
    if (!form) return;
    setResponses(clearResponses(form.id));
  }, [form]);

  const restoreSeed = useCallback(() => {
    const { form: next, responses: rows } = resetToSeed();
    setForm(next);
    setResponses(rows);
    setSelectedId(next.fields[0]?.id ?? null);
    setLoadError(null);
  }, []);

  const selected = useMemo(
    () => form?.fields.find((field) => field.id === selectedId) ?? null,
    [form, selectedId],
  );

  return {
    form,
    responses,
    selected,
    selectedId,
    loadError,
    setSelectedId,
    addField,
    moveField,
    updateField,
    removeField,
    updateMeta,
    submitResponse,
    wipeCopies,
    restoreSeed,
  };
}
