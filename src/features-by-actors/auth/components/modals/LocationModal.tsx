import { useState } from "react";



import ModalsLayout from "../../../../shared/layouts/ModalsLayout";
import type { LocationValue } from "../../../../shared/components/atomes/Input";
import Input from "../../../../shared/components/atomes/Input";

const LocationModal = ({
    close,
    onSubmit,
}: {
    close: () => void;

    onSubmit: (
        value: LocationValue
    ) => void;
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const submitLocation = () => {
        onSubmit({
            city: "",
            country: searchQuery,
        });
    };

    return (
        <ModalsLayout toggleModal={close}>
            <div className="w-[329px] rounded-[12px] p-4 flex flex-col gap-4 bg-white">
                <div className="flex flex-col gap-1">
                    <div className="text-[12px] text-cocoa">
                        Définissez votre localisation
                    </div>

                </div>

                <div className="w-full flex flex-col gap-4">
                    <Input
                        variant="search"
                        placeholder="Rechercher un pays..."
                        value={searchQuery}
                        onChange={(e: any) =>
                            setSearchQuery(e.target.value)
                        }
                    />

                    <div className="w-full h-[120px] rounded-[9px] overflow-hidden bg-black-5 p-1">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            className="rounded-[12px]"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(searchQuery || 'Monde')}&t=&z=4&ie=UTF8&iwloc=&output=embed`}
                            allowFullScreen
                        />
                    </div>
                </div>

                <div className="w-full flex items-center justify-end">
                    <div
                        onClick={
                            submitLocation
                        }
                        className="px-4 h-11 rounded-[28px] bg-black text-white flex items-center justify-center text-[14px] leading-[20px] cursor-pointer"
                    >
                        Définir la localisation
                    </div>
                </div>
            </div>
        </ModalsLayout>
    );
};

export default LocationModal;