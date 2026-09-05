export type SheetName = "clip" | "fill" | "copies";

const TABS: { id: SheetName; label: string }[] = [
  { id: "clip", label: "Type fields" },
  { id: "fill", label: "Fill original" },
  { id: "copies", label: "Filed copies" },
];

type SheetTabsProps = {
  sheet: SheetName;
  onChange: (sheet: SheetName) => void;
};

export function SheetTabs({ sheet, onChange }: SheetTabsProps) {
  return (
    <nav className="sheet-tabs" aria-label="NCR plies">
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
