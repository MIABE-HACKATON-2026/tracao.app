import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD_NAV_ITEMS } from "../../constants/dashboard-nav";
import { cn } from "../../lib/utils";
import { SearchIcon, FarmersLogoutIcon } from "../icons";
import Modal from "../atoms/Modal";
import { useSession } from "../../../features-by-actors/auth/stores/session.store";

interface DashboardSidebarProps {
  role: string;
  subRole?: string | null;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const location = useLocation();
  const navItems = DASHBOARD_NAV_ITEMS[role] || [];
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useSession();

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex h-full w-54 flex-col items-center bg-white border-r border-r-[0.4px] border-r-cocoa-10 p-4">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-full flex items-center justify-between ">
          <img src="/logo.svg" className="h-[17px]" alt="" />
          <SearchIcon className="rotate-y-[180deg] cursor-pointer w-[18px] h-[18px]" />
        </div>
        <div className="w-[136px] h-[0.4px] bg-cocoa-10"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-[11px] text-cocoa-40">Compte <span className="text-cocoa-80">
            {role === "farmer" ? "Agriculteur" : 
             role === "store" ? "Magasin" : 
             role === "store-inspector" ? "Inspecteur" :
             role === "processor" ? "Transformateur" : 
             role === "transporter" ? "Transporteur" : 
             role === "agent" ? "Agent terrain" : 
             role === "buyer" ? "Acheteur" : 
             role === "buyer-importateur" ? "Importateur" :
             role === "admin" ? "Super Admin" :
             role === "admin-gouvernement" ? "Gouvernement" :
             role === "admin-certificateur" ? "Certificateur" : ""}
          </span></div>
          <nav className="flex-1 flex flex-col gap-[10px] items-center">
            {navItems.map((item, index) => {
              if (item.type === 'separator') {
                return <div key={`sep-${index}`} className="w-[136px] h-[0.4px] bg-cocoa-10"></div>;
              }
              
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path || "#"}
                  className={cn(
                    "group flex items-center px-4 py-2 gap-3 text-sm font-normal text-[12px] rounded-[8px] transition-colors w-full",
                    isActive
                      ? "bg-cocoa-5 text-cocoa-80 h-[34px]"
                      : "text-cocoa-40 hover:bg-cocoa-5 hover:text-cocoa-80 h-[28px]"
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "h-[18px] w-[18px] flex-shrink-0",
                        isActive ? "text-cocoa-80" : "text-cocoa-40 group-hover:text-cocoa-80"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="w-full mt-auto">
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="group flex items-center px-4 py-2  h-[34px] gap-3 bg-cocoa-5 hover:bg-cocoa-10  font-normal text-[12px] rounded-[8px] transition-colors w-full text-cocoa-40 cursor-pointer hover:text-cocoa-80"
        >
          <FarmersLogoutIcon className="h-[18px] w-[18px] flex-shrink-0 text-cocoa-40 group-hover:text-cocoa-80" />
          Se déconnecter
        </button>
       </div>

      <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <div className="p-8 flex flex-col gap-6 max-w-[400px]">
          <h2 className="text-[20px] font-medium text-cocoa">Déconnexion</h2>
          <p className="text-[14px] text-cocoa-60">
            Voulez-vous vraiment vous déconnecter de votre compte ?
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-6 py-2 rounded-full text-cocoa font-medium text-[14px] hover:bg-cocoa-5 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full bg-cocoa text-white font-medium text-[14px] hover:opacity-90 transition-opacity cursor-pointer"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardSidebar;
