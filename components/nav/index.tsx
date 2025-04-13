"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NAV_POSITION,
  SUB_MENU_STYLE,
  HAMBURGER_DISPLAY,
  MENUS,
} from "../../constants/nav";
import { DesktopNav } from "./desktop_nav";
import MobileNav from "./mobile_nav";

interface NavProps {
  position?: (typeof NAV_POSITION)[keyof typeof NAV_POSITION];
  hamburgerDisplay?: (typeof HAMBURGER_DISPLAY)[keyof typeof HAMBURGER_DISPLAY];
}

const getPositionClasses = (
  position: (typeof NAV_POSITION)[keyof typeof NAV_POSITION],
  isOverlayVisible: boolean
) => {
  switch (position) {
    case NAV_POSITION.FIXED:
      return cn(
        "fixed inset-x-0 top-0 max-w-3xl mx-auto",
        isOverlayVisible && "bg-white shadow-md"
      );
    case NAV_POSITION.STICKY:
      return "sticky top-0 left-0 right-0 bg-white shadow-md";
    default:
      return "";
  }
};

export default function Nav({
  position = NAV_POSITION.STICKY,
  hamburgerDisplay = HAMBURGER_DISPLAY.MOBILE_ONLY,
}: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const desktopNavClasses = cn(
    "hidden",
    hamburgerDisplay === HAMBURGER_DISPLAY.NEVER ? "block" : "lg:block",
    hamburgerDisplay === HAMBURGER_DISPLAY.ALWAYS ? "lg:hidden" : ""
  );

  const hamburgerClasses = cn(
    "p-2 focus:outline-none",
    hamburgerDisplay === HAMBURGER_DISPLAY.ALWAYS ? "block" : "block lg:hidden"
  );

  return (
    <nav
      className={cn(
        "w-full mx-auto z-40 md:px-12 px-4",
        getPositionClasses(position, isOverlayVisible),
        "duration-150 ease-out"
      )}
    >
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className={desktopNavClasses}>
            <DesktopNav
              subMenuStyle={SUB_MENU_STYLE.PARTIAL}
              menus={MENUS}
              onOverlayChange={setIsOverlayVisible}
            />
          </div>

          {hamburgerDisplay !== HAMBURGER_DISPLAY.NEVER && (
            <button
              className={hamburgerClasses}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 토글"
            >
              <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </button>
          )}
        </div>
      </div>

      <MobileNav
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        menus={MENUS}
      />
    </nav>
  );
}
