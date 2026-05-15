import React, { useState, useRef, useCallback } from "react";
import { UndoIcon, RedoIcon, UploadImageIcon } from "../../../shared/components/icons";

interface Point {
    x: number;
    y: number;
}

const FarmersParcelsNew: React.FC = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [history, setHistory] = useState<Point[][]>([]);
    const [redoStack, setRedoStack] = useState<Point[][]>([]);
    const [mousePos, setMousePos] = useState<Point | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calcul de la surface (Shoelace formula) simplifiée pour le design
    const calculateArea = (pts: Point[]) => {
        if (pts.length < 3) return 0;
        let area = 0;
        for (let i = 0; i < pts.length; i++) {
            const j = (i + 1) % pts.length;
            area += pts[i].x * pts[j].y;
            area -= pts[j].x * pts[i].y;
        }
        // Facteur de conversion arbitraire pour transformer les pixels en hectares pour la démo
        return Math.abs(area / 2) / 100;
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newPoint = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        setHistory([...history, points]);
        setPoints([...points, newPoint]);
        setRedoStack([]); // On vide le redo après une nouvelle action
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const undo = useCallback(() => {
        if (history.length === 0) return;
        const previous = history[history.length - 1];
        setRedoStack([...redoStack, points]);
        setPoints(previous);
        setHistory(history.slice(0, -1));
    }, [history, points, redoStack]);

    const redo = useCallback(() => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setHistory([...history, points]);
        setPoints(next);
        setRedoStack(redoStack.slice(0, -1));
    }, [redoStack, history, points]);

    const area = calculateArea(points);

    return (
        <div className="w-full h-full flex flex-col gap-5">
            {/* Header de la page */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-[16px] leading-[16px] font-normal text-cocoa">Créer parcelles - Dessin carte</h1>
                    <p className="text-[12px] leading-[16px] text-cocoa-60">Déssiné un polygone manuellement représentant votre parcelles</p>
                </div>

                <div className="flex gap-2">
                    <div className="h-[34px] bg-cocoa-5 rounded-[8px] flex items-center overflow-hidden">
                        <button 
                            onClick={undo}
                            disabled={history.length === 0}
                            className="h-[34px] w-[34px] flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors border-r border-r-[0.4px] border-r-cocoa-20 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <UndoIcon className="h-[18px] w-[18px] text-cocoa-80 rotate-x-180" />
                        </button>
                        <button 
                            onClick={redo}
                            disabled={redoStack.length === 0}
                            className="h-[34px] w-[34px] flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <RedoIcon className="h-[18px] w-[18px] text-cocoa-80 rotate-x-180" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Zone de dessin (Carte) */}
            <div 
                ref={containerRef}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePos(null)}
                className="flex-1 w-full rounded-[16px] bg-[#F7F6F5] relative overflow-hidden border border-cocoa-5 cursor-crosshair" 
                style={{ backgroundImage: 'radial-gradient(#D9D9D9 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            >
                
                {/* Infos sur la parcelle (Overlay haut) */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none z-10">
                    <span className="text-[14px] leading-[16px] text-cocoa-20 font-normal">Brouillion</span>
                    <div className="flex flex-col items-end">
                        <span className="text-[14px] leading-[16px] text-cocoa-80 font-normal mb-2">Nom de la parcelle</span>
                        <span className="text-[32px] leading-[32px] text-cocoa-40 font-medium transition-all">
                            {area.toFixed(2).replace('.', ',')} <span className="text-[20px]">ha</span>
                        </span>
                    </div>
                </div>

                {/* Rendu du polygone SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {points.length > 0 && (
                        <>
                            {/* Polygone plein */}
                            <path 
                                d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')} ${points.length > 2 ? 'Z' : ''}`} 
                                fill="white" 
                                fillOpacity="0.3"
                                stroke="#D1C7BD" 
                                strokeWidth="1"
                                strokeDasharray={points.length > 2 ? "0" : "4 2"}
                            />
                            
                            {/* Ligne temporaire vers la souris */}
                            {mousePos && points.length > 0 && (
                                <line 
                                    x1={points[points.length - 1].x} 
                                    y1={points[points.length - 1].y} 
                                    x2={mousePos.x} 
                                    y2={mousePos.y} 
                                    stroke="#D1C7BD" 
                                    strokeWidth="1" 
                                    strokeDasharray="4 2" 
                                />
                            )}

                            {/* Points et numéros */}
                            {points.map((p, i) => (
                                <g key={i}>
                                    <circle cx={p.x} cy={p.y} r="3" fill="#432818" />
                                    <text 
                                        x={p.x - 12} 
                                        y={p.y - 8} 
                                        className="text-[12px] fill-cocoa select-none font-medium"
                                    >
                                        {(i + 1).toString().padStart(2, '0')}
                                    </text>
                                </g>
                            ))}
                        </>
                    )}
                </svg>

                {/* Aide visuelle si aucun point */}
                {points.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-cocoa-20 text-[14px]">Cliquez n'importe où pour commencer le tracé</p>
                    </div>
                )}

                {/* Bouton d'importation bas droite */}
                <div className="absolute bottom-6 right-6">
                    <button className="h-[34px] w-[34px] rounded-[8px] bg-cocoa-5 flex items-center justify-center cursor-pointer hover:bg-cocoa-10 transition-colors shadow-sm">
                        <UploadImageIcon className="h-[18px] w-18px] fill-cocoa-40" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FarmersParcelsNew;
