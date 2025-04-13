"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminMenuItems = [
  {
    title: "대시보드",
    href: "/admin",
    icon: "📊",
  },
  {
    title: "사용자 관리",
    href: "/admin/users",
    icon: "👥",
  },
  {
    title: "게시물 관리",
    href: "/admin/posts",
    icon: "📝",
  },
  {
    title: "설정",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">관리자</h1>
      <nav>
        <ul className="space-y-2">
          {adminMenuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 ${
                  pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
