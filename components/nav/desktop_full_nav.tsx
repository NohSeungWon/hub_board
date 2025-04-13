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

export function DesktopFullNav({
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
            </Link>
          </div>
        ))}
      </div>

      {/* 배경 오버레이 */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black/20 z-30 top-16" />
      )}

      {/* FULL 스타일 서브메뉴 */}
      {isOverlayVisible && (
        <div className="fixed left-0 right-0 bg-white shadow-lg z-40 top-16 overflow-y-auto">
          <div className="container mx-auto py-6">
            <div className="flex">
              {menus.map((menu, index) => {
                if (!menu.subMenu || menu.subMenu.length === 0) return null;

                // 메뉴 항목의 대략적인 위치에 맞춰 서브메뉴 표시
                const position = index * 150; // 각 메뉴 항목 간격 추정
                const isActive = hoveredMenu === menu.id;

                return (
                  <div
                    key={menu.id}
                    className={cn(
                      "absolute transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-75"
                    )}
                    style={{ left: `${position}px` }}
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                  >
                    <div className="flex flex-col space-y-2">
                      {menu.subMenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className={cn(
                            "px-6 py-1.5 hover:bg-gray-100 rounded transition-colors block",
                            isActive && "font-medium"
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
