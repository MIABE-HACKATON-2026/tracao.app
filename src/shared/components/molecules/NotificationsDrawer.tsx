import React from "react";
import { CheckIcon, CloseIcon, BellIcon } from "../icons";
import { useNotificationsStore } from "../../../features-by-actors/stores/stores/notifications.store";

interface NotificationsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
    const { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead } = useNotificationsStore();

    React.useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen, fetchNotifications]);

    const groupedByDate = notifications.reduce<Record<string, typeof notifications>>((acc, n) => {
        const date = new Date(n.created_at).toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric"
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(n);
        return acc;
    }, {});

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 z-[60]" onClick={onClose} />
            )}

            <div className={`fixed top-0 right-0 h-full w-[420px] bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="p-6 flex justify-between items-center border-b border-cocoa-5">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-[18px] font-medium text-cocoa">Notifications</h2>
                        <span className="text-[12px] text-cocoa-40">
                            {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}` : 'Tout est à jour'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-[11px] text-cocoa-40 underline underline-offset-4 decoration-cocoa-10 hover:text-cocoa transition-colors cursor-pointer"
                            >
                                Tout marquer lu
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-cocoa-5 rounded-full transition-colors cursor-pointer">
                            <CloseIcon className="h-5 w-5 text-cocoa-40" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40 text-[13px] text-cocoa-40">
                            Chargement...
                        </div>
                    ) : !notifications || notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-2">
                            <BellIcon className="h-8 w-8 text-cocoa-20" />
                            <span className="text-[13px] text-cocoa-40">Aucune notification</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {Object.entries(groupedByDate).map(([date, notifs]) => (
                                <div key={date} className="flex flex-col gap-3">
                                    <span className="text-[12px] text-cocoa-40 font-medium underline underline-offset-4 decoration-cocoa-10">{date}</span>
                                    {notifs.map((n) => (
                                        <div
                                            key={n.id}
                                            onClick={() => !n.read && markAsRead(n.id)}
                                            className={`rounded-[12px] p-4 flex flex-col gap-2 transition-colors cursor-pointer ${n.read ? 'bg-cocoa-5/50' : 'bg-cocoa-5 border border-cocoa-10'}`}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <span className={`text-[13px] ${n.read ? 'text-cocoa-40' : 'text-cocoa font-medium'}`}>
                                                    {n.message}
                                                </span>
                                                {!n.read && <div className="h-2 w-2 rounded-full bg-cocoa mt-1 flex-shrink-0"></div>}
                                            </div>
                                            <span className="text-[10px] text-cocoa-20">
                                                {new Date(n.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NotificationsDrawer;
