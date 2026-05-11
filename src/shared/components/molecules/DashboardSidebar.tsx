import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD_NAV_ITEMS } from "../../constants/dashboard-nav";
import { cn } from "../../lib/utils";

interface DashboardSidebarProps {
  role: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const location = useLocation();
  const navItems = DASHBOARD_NAV_ITEMS[role] || [];

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <span className="text-xl font-bold text-primary">TRACAO</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-6 w-6 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
