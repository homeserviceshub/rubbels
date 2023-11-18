export const menuItems = [
  {
    title: "Home",
    url: "/services", // Add a leading slash ("/") to indicate the root-relative URL
    cName: "nav-links",
  },
  {
    title: "New Drop",
    url: "/",
    cName: "nav-links",
  },
  {
    title: "Shop",
    url: "/ace",
    cName: "nav-links",
    submenu: [
      "Anime T-Shirts",
      "Marvel T-Shirts",
      "DC T-Shirts",
      "Premium T-Shirts",
    ],
  },
];
