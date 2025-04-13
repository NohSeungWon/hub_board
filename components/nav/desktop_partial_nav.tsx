"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  subMenu?: MenuItem[];
}

export function DesktopPartialNav({
  menus,
  onOverlayChange,
}: {
  menus: MenuItem[];
  onOverlayChange?: (isVisible: boolean) => void;
}) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // 서브메뉴 호버 상태 변경 시 오버레이 표시 제어
  useEffect(() => {
    if (hoveredMenu !== null) {
      const menuHasSubMenu = menus.find((m) => m.id === hoveredMenu)?.subMenu;
      const newOverlayState = !!menuHasSubMenu;
      setIsOverlayVisible(newOverlayState);

      if (onOverlayChange) {
        onOverlayChange(newOverlayState);
      }
    } else {
      setIsOverlayVisible(false);

      if (onOverlayChange) {
        onOverlayChange(false);
      }
    }
  }, [hoveredMenu, menus, onOverlayChange]);

  // 메뉴 호버 이벤트 핸들러
  const handleMouseEnter = (menuId: string) => {
    setHoveredMenu(menuId);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <div className="relative w-full">
      {/* 메인 메뉴 영역 */}
      <div className="flex items-center space-x-1">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(menu.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={menu.href}
              className={cn(
                "px-6 py-2 inline-flex items-center hover:text-blue-600",
                hoveredMenu === menu.id && menu.subMenu && "text-blue-600"
              )}
            >
              {menu.label}
              {menu.subMenu && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </Link>

            {/* PARTIAL 스타일 서브메뉴 */}
            {menu.subMenu && (
              <div
                className={cn(
                  "absolute bg-white shadow-lg z-40",
                  "transition-opacity duration-200",
                  hoveredMenu === menu.id
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none",
                  "top-full left-0 min-w-[200px] whitespace-nowrap"
                )}
              >
                <div className="flex flex-col p-2">
                  {menu.subMenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className="px-6 py-1.5 hover:bg-gray-100 transition-colors rounded"
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

      {/* 배경 오버레이 */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black/20 z-30 top-16" />
      )}
    </div>
  );
}
