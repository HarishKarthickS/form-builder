import { createField, emptyForm, newId, nowIso } from "@/domain";
import type { FormDefinition, FormResponse } from "@/domain";

export function seedRequisition(): FormDefinition {
  const form = emptyForm("Desk supply requisition");
  form.subtitle = "Fill this out, clip it to the board, and leave it for supplies.";
  form.fields = [
    { ...createField("short_text", "Name on the door"), required: true, placeholder: "Last name, first" },
    { ...createField("email", "Office mail"), required: true, placeholder: "you@theoffice.local" },
    {
      ...createField("choice", "Floor"),
      required: true,
      options: ["2nd — filing", "3rd — accounts", "4th — the loud printers"],
    },
    { ...createField("number", "How many clipboards"), required: true, placeholder: "0" },
    {
      ...createField("checkboxes", "Stock to pull"),
      required: true,
      options: ["Manila folders", "Carbon paper", "Red ink pads", "Brass fasteners"],
    },
    { ...createField("date", "Needed by"), required: true },
    { ...createField("yes_no", "Charge the department?"), required: true },
    {
      ...createField("long_text", "Why this cannot wait"),
      required: false,
      placeholder: "Keep it short. The clerk is busy.",
    },
  ];
  form.updatedAt = nowIso();
  return form;
}

export function seedResponses(form: FormDefinition): FormResponse[] {
  const [name, mail, floor, qty, stock, needed, charge, why] = form.fields;
  return [
    {
      id: newId("rsp"),
      formId: form.id,
      submittedAt: "2026-08-28T14:10:00.000Z",
      answers: {
        [name.id]: "Patterson, June",
        [mail.id]: "june.p@theoffice.local",
        [floor.id]: "3rd — accounts",
        [qty.id]: "4",
        [stock.id]: ["Manila folders", "Brass fasteners"],
        [needed.id]: "2026-09-08",
        [charge.id]: "yes",
        [why.id]: "Audit week. The hanging files are gone.",
      },
    },
    {
      id: newId("rsp"),
      formId: form.id,
      submittedAt: "2026-09-02T09:41:00.000Z",
      answers: {
        [name.id]: "Okafor, Ben",
        [mail.id]: "ben.o@theoffice.local",
        [floor.id]: "4th — the loud printers",
        [qty.id]: "1",
        [stock.id]: ["Carbon paper", "Red ink pads"],
        [needed.id]: "2026-09-12",
        [charge.id]: "no",
        [why.id]: "",
      },
    },
  ];
}
