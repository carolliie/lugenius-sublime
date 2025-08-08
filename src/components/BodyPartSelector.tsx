"use client"

import React from "react"
import Image from "next/image";

interface BodyPartSelectorProps {
    selectedArea: string | null;
    onSelectArea: (areaId: string) => void;
}

export const BodyPartSelector: React.FC<BodyPartSelectorProps> = ({
    selectedArea,
    onSelectArea,
}) => {
    const bodyAreas = [
        //{ id: "face", name: "Gesicht", top: "10%", left: "75%" },
        { id: "abdomen", name: "Abdomen", top: "38%", left: "15%" },
        //{ id: "breast", name: "Brüste", top: "25%", left: "75%" },
        { id: "hip", name: "Hüfte", top: "48%", left: "80%" },
        { id: "thighs", name: "Schenkel", top: "56%", left: "10%" },
        { id: "calf", name: "Wade", top: "72%", left: "90%" },
    ];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Wählen Sie einen Bereich des Körpers aus</h2>
            <div className="relative w-[300px] h-[500px]">
                <Image
                    alt="womans body"
                    src="/body.webp"
                    layout="fill"
                    objectFit="contain"
                />

                {bodyAreas.map((area) => (
                    <div
                        key={area.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${selectedArea === area.id ? "opacity-100 scale-100" : "opacity-90 scale-90"
                            }`}
                        style={{ top: area.top, left: area.left }}
                    >
                        <button
                            className={`px-2 py-1 text-sm border border-[#128385] rounded-lg ${selectedArea === area.id
                                ? "bg-[#128385] text-white"
                                : "bg-[#E2FEFF] text-black"
                                }`}
                            onClick={() => onSelectArea(area.id)}
                        >
                            {area.name}
                        </button>
                        <div className={`flex justify-center transform ${area.left <= "50%"
                            ? "scale-x-[-1] translate-x-1/2"
                            : "-translate-x-1/2"
                            }`}>
                            <Image
                                alt="line"
                                src="/linha.svg"
                                width={80}
                                height={80}
                            />
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}