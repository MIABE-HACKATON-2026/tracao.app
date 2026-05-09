import { useState, useEffect } from "react";
import ModalsLayout from "../../../../shared/layouts/ModalsLayout";
import type { LocationValue } from "../../../../shared/components/atomes/Input";
import Input from "../../../../shared/components/atomes/Input";

interface Suggestion {
    name: string;
    city?: string;
    country: string;
    state?: string;
    district?: string;
    latitude: number;
    longitude: number;
    type?: string;
}

const LocationModal = ({
    close,
    onSubmit,
}: {
    close: () => void;
    onSubmit: (value: LocationValue) => void;
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<LocationValue | null>(null);

    // Recherche via l'API Photon (OpenStreetMap)
    useEffect(() => {
        // Ne pas chercher si on vient de sélectionner une suggestion
        if (selectedLocation && searchQuery === selectedLocation.address) {
            return;
        }

        if (searchQuery.length < 3) {
            setSuggestions([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            try {
                // Focus sur les résultats pertinents pour l'Afrique/monde francophone si possible, ou recherche globale
                const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(searchQuery)}&limit=5`);
                const data = await res.json();
                
                const formattedSuggestions: Suggestion[] = data.features.map((f: any) => ({
                    name: f.properties.name,
                    city: f.properties.city || f.properties.town || f.properties.village,
                    country: f.properties.country,
                    state: f.properties.state,
                    district: f.properties.district,
                    latitude: f.geometry.coordinates[1],
                    longitude: f.geometry.coordinates[0],
                    type: f.properties.type
                }));
                
                setSuggestions(formattedSuggestions);
            } catch (err) {
                console.error("Erreur lors de la recherche de localisation", err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, selectedLocation]);

    const handleSelect = (sug: Suggestion) => {
        const displayName = [sug.name, sug.city, sug.country].filter(Boolean).join(", ");
        
        let zoomLevel = 5; // Par défaut pays
        if (sug.type === 'city' || sug.city) zoomLevel = 12;
        if (sug.district || sug.type === 'street') zoomLevel = 16;
        
        const newLocation: LocationValue = {
            city: sug.city || sug.name, // Fallback si city n'est pas défini
            country: sug.country || "Non défini",
            district: sug.district || sug.state,
            address: displayName,
            latitude: sug.latitude,
            longitude: sug.longitude,
            zoomLevel: zoomLevel
        };

        setSelectedLocation(newLocation);
        setSearchQuery(displayName);
        setSuggestions([]);
    };

    const submitLocation = () => {
        if (selectedLocation) {
            onSubmit(selectedLocation);
        } else {
            // Fallback rudimentaire si l'utilisateur n'a pas cliqué sur une suggestion
            onSubmit({
                city: "",
                country: searchQuery,
            });
        }
    };

    const mapUrl = selectedLocation 
        ? `https://maps.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}&t=&z=${selectedLocation.zoomLevel || 4}&ie=UTF8&iwloc=&output=embed`
        : `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery || 'Afrique')}&t=&z=4&ie=UTF8&iwloc=&output=embed`;

    return (
        <ModalsLayout toggleModal={close}>
            <div className="w-[329px] rounded-[12px] p-4 flex flex-col gap-4 bg-white relative">
                <div className="flex flex-col gap-1">
                    <div className="text-[12px] text-cocoa">
                        Définissez votre localisation
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 relative">
                    <Input
                        variant="search"
                        placeholder="Rechercher pays, ville, quartier..."
                        value={searchQuery}
                        onChange={(e: any) => {
                            setSearchQuery(e.target.value);
                            setSelectedLocation(null); // Reset selection if user types
                        }}
                    />
                    
                    {/* Boîte de suggestions */}
                    {searchQuery.length >= 3 && !selectedLocation && (
                        <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-[8px] border border-cocoa-10 z-50 overflow-hidden max-h-[200px] overflow-y-auto">
                            {loading ? (
                                <div className="p-3 text-center text-cocoa-40 text-[12px]">Recherche en cours...</div>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((sug, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => handleSelect(sug)}
                                        className="p-3 hover:bg-cocoa-5 cursor-pointer border-b border-cocoa-5 last:border-0 flex flex-col"
                                    >
                                        <span className="text-[14px] text-black font-medium">{sug.name}</span>
                                        <span className="text-[12px] text-cocoa-60">
                                            {[sug.district, sug.city, sug.country].filter(Boolean).join(", ")}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-3 text-center text-cocoa-40 text-[12px]">Aucun résultat trouvé</div>
                            )}
                        </div>
                    )}

                    <div className="w-full h-[180px] rounded-[9px] overflow-hidden bg-black-5 p-1 mt-2">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            className="rounded-[12px]"
                            style={{ border: 0 }}
                            src={mapUrl}
                            allowFullScreen
                        />
                    </div>
                </div>

                <div className="w-full flex items-center justify-end">
                    <button
                        onClick={submitLocation}
                        disabled={!selectedLocation}
                        className={`px-4 h-11 rounded-[28px] ${selectedLocation ? 'bg-black text-white hover:bg-black/90' : 'bg-cocoa-10 text-cocoa-40'} flex items-center justify-center text-[14px] leading-[20px] transition-colors`}
                    >
                        Définir la localisation
                    </button>
                </div>
            </div>
        </ModalsLayout>
    );
};

export default LocationModal;