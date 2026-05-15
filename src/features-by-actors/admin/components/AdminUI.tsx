import React from "react";
import { cn } from "../../../shared/lib/utils";
import { FilterIcon, ChevronDownIcon } from "../../../shared/components/icons";

export const AdminCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={cn("w-full rounded-[16px] bg-cocoa-5 p-4 overflow-hidden flex flex-col", className)}>
        {children}
    </div>
);

export const AdminTableHeader: React.FC<{ headers: string[], className?: string }> = ({ headers, className }) => (
    <div className={cn("w-full bg-[#E5E1DE] rounded-t-[12px] flex items-center h-[44px] px-6", className)}>
        {headers.map((h, i) => (
            <div key={i} className="flex-1 text-[11px] font-medium text-cocoa-60 leading-[16px]">
                {h}
            </div>
        ))}
    </div>
);

export const AdminTableRow: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => (
    <div 
        onClick={onClick}
        className={cn(
            "h-[52px] bg-white/40 rounded-[8px] flex items-center px-6 hover:bg-white/60 border border-white/20 transition-all cursor-pointer relative", 
            className
        )}
    >
        {children}
    </div>
);

export const AdminTableCell: React.FC<{ children: React.ReactNode, className?: string, width?: string }> = ({ children, className, width }) => (
    <div className={cn("text-[12px] text-cocoa font-medium truncate", width || "flex-1", className)}>
        {children}
    </div>
);

export const AdminBadge: React.FC<{ label: string, variant: 'success' | 'warning' | 'error' | 'neutral', className?: string }> = ({ label, variant, className }) => {
    const styles = {
        success: "bg-[#E8F5E9] text-[#4CAF50] border-[#C8E6C9]",
        warning: "bg-[#FFF8E1] text-[#FFB300] border-[#FFECB3]",
        error: "bg-[#FFEBEE] text-[#F44336] border-[#FFCDD2]",
        neutral: "bg-cocoa-10 text-cocoa-60 border-cocoa-10",
    };
    
    const dots = {
        success: "bg-[#4CAF50]",
        warning: "bg-[#FFB300]",
        error: "bg-[#F44336]",
        neutral: "bg-cocoa-40",
    };

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border",
            styles[variant],
            className
        )}>
            <div className={cn("h-1.5 w-1.5 rounded-full", dots[variant])}></div>
            {label}
        </div>
    );
};

export const AdminButton: React.FC<{ 
    children: React.ReactNode, 
    onClick?: () => void, 
    variant?: 'primary' | 'secondary' | 'outline',
    className?: string,
    size?: 'sm' | 'md' | 'lg',
    disabled?: boolean
}> = ({ children, onClick, variant = 'primary', className, size = 'md', disabled }) => {
    const base = "inline-flex items-center justify-center rounded-full font-medium transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-cocoa text-white hover:opacity-90 shadow-sm",
        secondary: "bg-cocoa-5 text-cocoa hover:bg-cocoa-10",
        outline: "bg-transparent border border-cocoa-10 text-cocoa hover:bg-cocoa-5",
    };

    const sizes = {
        sm: "h-[34px] px-4 text-[12px]",
        md: "h-[44px] px-6 text-[13px]",
        lg: "h-[48px] px-8 text-[14px]",
    };

    return (
        <button onClick={onClick} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled}>
            {children}
        </button>
    );
};

export const AdminFilterBtn: React.FC<{ active?: boolean, onClick: () => void, className?: string }> = ({ active, onClick, className }) => (
    <button 
        onClick={onClick}
        className={cn(
            "h-[34px] px-4 rounded-full flex items-center gap-2 transition-all border",
            active ? "bg-cocoa text-white border-cocoa" : "bg-cocoa-5 text-cocoa border-transparent hover:bg-cocoa-10",
            className
        )}
    >
        <FilterIcon className={cn("h-[16px] w-[16px]", active ? "fill-white" : "fill-cocoa-40")} />
        <span className="text-[12px] font-medium">Filtrer</span>
        <ChevronDownIcon className={cn("h-3 w-3 opacity-40 transition-transform", active && "rotate-180")} />
    </button>
);
