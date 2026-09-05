export type SheetName = "clip" | "fill" | "copies";

const TABS: { id: SheetName; label: string }[] = [
  { id: "clip", label: "Fields" },
  { id: "fill", label: "Preview" },
  { id: "copies", label: "Responses" },
];

type SheetTabsProps = {
  sheet: SheetName;
  onChange: (sheet: SheetName) => void;
};

export function SheetTabs({ sheet, onChange }: SheetTabsProps) {
  return (
    <nav className="sheet-tabs" aria-label="Form sections">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-current={sheet === tab.id ? "page" : undefined}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
