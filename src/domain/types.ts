export type FieldKind =
  | "short_text"
  | "long_text"
  | "email"
  | "number"
  | "choice"
  | "checkboxes"
  | "date"
  | "yes_no";

export type FormField = {
  id: string;
  kind: FieldKind;
  label: string;
  help: string;
  required: boolean;
  placeholder: string;
  options: string[];
};

export type FormDefinition = {
  id: string;
  title: string;
  subtitle: string;
  fields: FormField[];
  updatedAt: string;
};

export type FormAnswer = string | string[] | boolean | number | "";

export type FormResponse = {
  id: string;
  formId: string;
  submittedAt: string;
  answers: Record<string, FormAnswer>;
};

export type FieldError = {
  fieldId: string;
  message: string;
};
