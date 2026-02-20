import {
  Home,
  Table,
  Terminal,
  Database,
  History,
  Settings,
} from "lucide-react";

const sidebarIcons = [
  { icon: <Home size={20} />, label: "Home" },
  { icon: <Table size={20} />, label: "Table Editor" },
  { icon: <Terminal size={20} />, label: "SQL Editor" },
  { icon: <Database size={20} />, label: "Database" },
  { icon: <History size={20} />, label: "Logs" },
  { icon: <Settings size={20} />, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        group
        absolute top-0 left-0
        w-14 hover:w-40
        h-full
        bg-background
        border-r border-black
        transition-all duration-300
        cursor-pointer
        overflow-hidden
        z-50
      "
    >
      <div className="flex flex-col gap-2 p-2">
        {sidebarIcons.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-primary/10 cursor-pointer"
          >
            <div className="flex-shrink-0">{item.icon}</div>

            <p
              className="
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                whitespace-nowrap text-base font-medium
              "
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
