export const NAV_POSITION = {
  STATIC: "static",
  FIXED: "fixed",
  STICKY: "sticky",
};

export const SUB_MENU_STYLE = {
  PARTIAL: "partial",
  FULL: "full",
};

export const HAMBURGER_DISPLAY = {
  NEVER: "never",
  MOBILE_ONLY: "mobile-only",
  ALWAYS: "always",
};

export const MENUS = [
  {
    id: "home",
    label: "홈",
    href: "/",
  },
  {
    id: "about",
    label: "소개",
    href: "/about",
    subMenu: [
      { id: "company", label: "회사 소개", href: "/about/company" },
      // { id: "team", label: "팀 소개", href: "/about/team" },
    ],
  },
  {
    id: "services",
    label: "서비스",
    href: "/services",
    subMenu: [
      { id: "service1", label: "서비스 1", href: "/services/1" },
      { id: "service2", label: "서비스 2", href: "/services/2" },
    ],
  },
  {
    id: "contact",
    label: "문의",
    href: "/contact",
  },
];
