import UserIcon from "../components/icons/UserIcon";

export interface NavItem {
  name: string;
  path: string;
  icon: any;
}

export const DASHBOARD_NAV_ITEMS: Record<string, NavItem[]> = {
  farmer: [
    { name: "Vue d'ensemble", path: "/farmer/dashboard", icon: UserIcon },
    { name: "Mes Exploitations", path: "/farmer/parcels", icon: UserIcon },
    { name: "Récoltes", path: "/farmer/harvests", icon: UserIcon },
    { name: "Paramètres", path: "/farmer/settings", icon: UserIcon },
  ],
  buyer: [
    { name: "Dashboard", path: "/buyer/dashboard", icon: UserIcon },
    { name: "Mes Achats", path: "/buyer/purchases", icon: UserIcon },
    { name: "Fournisseurs", path: "/buyer/suppliers", icon: UserIcon },
    { name: "Paramètres", path: "/buyer/settings", icon: UserIcon },
  ],
  store: [
    { name: "Dashboard", path: "/store/dashboard", icon: UserIcon },
    { name: "Stocks", path: "/store/inventory", icon: UserIcon },
    { name: "Ventes", path: "/store/sales", icon: UserIcon },
    { name: "Paramètres", path: "/store/settings", icon: UserIcon },
  ],
  processor: [
    { name: "Dashboard", path: "/processor/dashboard", icon: UserIcon },
    { name: "Transformations", path: "/processor/processing", icon: UserIcon },
    { name: "Stocks", path: "/processor/inventory", icon: UserIcon },
  ],
  transporter: [
    { name: "Dashboard", path: "/transporter/dashboard", icon: UserIcon },
    { name: "Livraisons", path: "/transporter/shipments", icon: UserIcon },
    { name: "Véhicules", path: "/transporter/fleet", icon: UserIcon },
  ],
  agent: [
    { name: "Dashboard", path: "/agent/dashboard", icon: UserIcon },
    { name: "Collectes", path: "/agent/collections", icon: UserIcon },
    { name: "Synchronisation", path: "/agent/sync", icon: UserIcon },
  ],
};
