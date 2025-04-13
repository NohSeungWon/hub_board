"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// 메뉴 인터페이스 정의
interface MenuItem {
  id: string;
  label: string;
  href: string;
  subMenu?: MenuItem[];
}

export default function MobileNav({
  isMenuOpen,
  toggleMenu,
  menus,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menus: MenuItem[];
}) {
  const [activeSubMenus, setActiveSubMenus] = useState<Set<string>>(new Set());

  const toggleSubMenu = (menuId: string) => {
    const newActiveSubMenus = new Set(activeSubMenus);
    if (newActiveSubMenus.has(menuId)) {
      newActiveSubMenus.delete(menuId);
    } else {
      newActiveSubMenus.add(menuId);
    }
    setActiveSubMenus(newActiveSubMenus);
  };

  return (
    <>
      <div
        className={cn(
          "absolute top-16 left-0 right-0 w-full bg-white shadow-lg z-50",
          "transition-all duration-300",
          isMenuOpen
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col w-full text-center">
          {menus.map((menu) => (
            <div key={menu.id} className="relative">
              <Link
                href={menu.href}
                className="block px-3 py-2 w-full hover:text-blue-600"
                onClick={(e) => {
                  if (menu.subMenu) {
                    e.preventDefault();
                    toggleSubMenu(menu.id);
                  }
                }}
              >
                <span className="flex items-center justify-center">
                  {menu.label}
                </span>
              </Link>

              {/* 모바일 서브메뉴 */}
              {menu.subMenu && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 bg-gray-50",
                    activeSubMenus.has(menu.id) ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="flex flex-col">
                    {menu.subMenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="px-4 py-2 hover:bg-gray-100 text-center"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
