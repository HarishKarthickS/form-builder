export type SheetName = "clip" | "fill" | "copies";

const TABS: { id: SheetName; label: string }[] = [
  { id: "clip", label: "Clip fields" },
  { id: "fill", label: "Fill it in" },
  { id: "copies", label: "Carbon copies" },
];

type SheetTabsProps = {
  sheet: SheetName;
  onChange: (sheet: SheetName) => void;
};

export function SheetTabs({ sheet, onChange }: SheetTabsProps) {
  return (
    <nav className="sheet-tabs" aria-label="Clipboard sheets">
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
