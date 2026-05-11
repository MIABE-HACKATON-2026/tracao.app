import React from "react";
import DashboardSidebar from "../components/molecules/DashboardSidebar";
import { useSession } from "../../features-by-actors/auth/stores/session.store";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useSession();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar role={user?.role || "farmer"} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">
            Tableau de Bord - {user?.role}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user?.first_name} {user?.last_name}</span>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
               {user?.first_name?.[0]}
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
