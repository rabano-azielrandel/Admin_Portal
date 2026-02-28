import {
  Home,
  Table2,
  Terminal,
  Database,
  History,
  Settings,
} from "lucide-react";
import Link from "next/link";

const sidebarIcons = [
  { icon: <Home size={20} />, label: "Home", href: "/dashboard" },
  { icon: <Table2 size={20} />, label: "Data Input", href: "/data-input" },
  { icon: <Terminal size={20} />, label: "SQL Editor", href: "/sql-editor" },
  { icon: <Database size={20} />, label: "Database", href: "/dashboard" },
  { icon: <History size={20} />, label: "Logs", href: "/dashboard" },
  { icon: <Settings size={20} />, label: "Settings", href: "/dashboard" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        group
        fixed top-16 left-0
        w-14 hover:w-40
        h-full
        bg-background
        border-r border-black
        transition-all duration-300
        cursor-pointer
        overflow-hidden
        z-10
      "
    >
      <div className="flex flex-col gap-2 p-2">
        {sidebarIcons.map((item, index) => (
          <Link
            key={index}
            href={item.href}
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
          </Link>
        ))}
      </div>
    </aside>
  );
}
