import React from "react";

interface FilterOption {
    label: string;
    value: string;
}

interface FilterPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    filters: {
        label: string;
        key: string;
        options: FilterOption[];
    }[];
    activeFilters: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ 
    isOpen, 
    onClose, 
    filters, 
    activeFilters, 
    onFilterChange 
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute top-[45px] right-0 w-[240px] bg-white rounded-[16px] shadow-xl border border-cocoa-10 z-50 p-5 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-medium text-cocoa">Filtrer par</span>
                    <div className="h-[1px] w-full bg-cocoa-5 mt-1" />
                </div>
                
                {filters.map((group) => (
                    <div key={group.key} className="flex flex-col gap-2">
                        <span className="text-[11px] uppercase font-bold text-cocoa-40 tracking-wider">{group.label}</span>
                        <div className="flex flex-wrap gap-2">
                            {group.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => onFilterChange(group.key, opt.value)}
                                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                                        activeFilters[group.key] === opt.value
                                            ? 'bg-cocoa text-white'
                                            : 'bg-cocoa-5 text-cocoa-60 hover:bg-cocoa-10'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="flex justify-between items-center mt-2 pt-4 border-t border-cocoa-5">
                    <button 
                        onClick={() => {
                            Object.keys(activeFilters).forEach(key => onFilterChange(key, "all"));
                            onClose();
                        }}
                        className="text-[11px] text-red-500 font-medium hover:underline"
                    >
                        Réinitialiser
                    </button>
                    <button 
                        onClick={onClose}
                        className="h-[28px] px-4 rounded-full bg-cocoa text-white text-[11px] font-medium hover:opacity-90"
                    >
                        Appliquer
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterPopover;
