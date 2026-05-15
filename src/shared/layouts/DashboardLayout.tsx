import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/molecules/DashboardSidebar";
import { useSession } from "../../features-by-actors/auth/stores/session.store";
import { TopbarCropSidebarIcon, TopbarBellIcon, TopbarUserIcon, TopbarKycRedIcon, TopbarKycGreenIcon, TopbarKycOrangeIcon, SearchIcon } from "../components/icons";
import NotificationsDrawer from "../components/molecules/NotificationsDrawer";
import { cn } from "../../shared/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

import { useNotificationsStore } from "../../features-by-actors/stores/stores/notifications.store";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useSession();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { fetchNotifications, unreadCount } = useNotificationsStore();

  React.useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        role={
          user?.role === 'admin' ?
            (user.sub_role === 'gouvernement' ? 'admin-gouvernement' :
              user.sub_role === 'certificateur' ? 'admin-certificateur' :
                'admin') :
            user?.role === 'store' && user.sub_role === 'inspector' ? 'store-inspector' :
              user?.role === 'buyer' && user.sub_role === 'importateur' ? 'buyer-importateur' :
                user?.role || "farmer"
        }
        subRole={user?.sub_role}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 h-full flex-col overflow-y-auto px-4 pb-4 pt-2 gap-5">
        <header className="w-full h-10 flex items-center justify-between">
          <div className="h-7 w-7 rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer">
            <TopbarCropSidebarIcon />
          </div>
          <div className="flex items-center gap-2">
            {user?.role !== 'store' && (
              <Link 
                to={user?.role === 'admin' ? '/admin/kyc' : `/${user?.role || "farmer"}s/kyc`} 
                className="h-7 w-7 rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: user?.kyc_status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 
                                   user?.kyc_status === 'pending' ? 'rgba(255, 152, 0, 0.1)' : 
                                   'rgba(244, 67, 54, 0.1)' 
                }}
              >
                {user?.kyc_status === 'approved' ? <TopbarKycGreenIcon /> : 
                 user?.kyc_status === 'pending' ? <TopbarKycOrangeIcon /> : 
                 <TopbarKycRedIcon />}
              </Link>
            )}
            <div 
              className="h-7 w-7 rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors relative"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <TopbarBellIcon />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-[7px] text-white font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
                </div>
              )}
            </div>
            <Link 
              to={user?.role === 'admin' ? '/admin/profile' : `/${user?.role || "farmer"}s/profile`} 
              className="h-7 w-7 rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors"
            >
              <TopbarUserIcon />
            </Link>
          </div>
        </header>

        <main className="h-full w-full">
          {children}
        </main>
      </div>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;
