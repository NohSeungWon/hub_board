"use client";

import { SUB_MENU_STYLE } from "../../constants/nav";
import { DesktopPartialNav } from "./desktop_partial_nav";
import { DesktopFullNav } from "./desktop_full_nav";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  subMenu?: MenuItem[];
}

export function DesktopNav({
  subMenuStyle,
  menus,
  onOverlayChange,
}: {
  subMenuStyle: (typeof SUB_MENU_STYLE)[keyof typeof SUB_MENU_STYLE];
  menus: MenuItem[];
  onOverlayChange?: (isVisible: boolean) => void;
}) {
  if (subMenuStyle === SUB_MENU_STYLE.PARTIAL) {
    return (
      <DesktopPartialNav menus={menus} onOverlayChange={onOverlayChange} />
    );
  }

  return <DesktopFullNav menus={menus} onOverlayChange={onOverlayChange} />;
}
