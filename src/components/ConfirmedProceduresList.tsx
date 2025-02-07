"use client"

import React from "react"
import { Procedure } from "@/types/procedures"

interface ProceduresListProps {
    procedures: Procedure[];
    selectedProcedures: string[];
    onToggleProcedure: (procedureId: string) => void;
}

export const ConfirmedProceduresList: React.FC<ProceduresListProps> = ({
    procedures,
    selectedProcedures,
    onToggleProcedure,
}) => {
    return (
        <div className={`flex flex-col gap-4 transition-all duration-500 ease-in-out transform ${procedures.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
            <h3 className="text-lg text-center font-semibold pt-4">Selecione os procedimentos que deseja <strong>CONFIRMAR</strong></h3>
            <ul>
                {procedures.map((procedure) => (
                    <li
                        key={procedure.id}
                        className={`${selectedProcedures.includes(procedure.id) ? "flex" : "hidden" } relative flex items-center justify-between border border-[#54B5B6] bg-white rounded-lg mb-4 px-4 py-2 background w-full bg-gradient-to-r from-[#FFFFFF] via-[#E0FFFF] to-[#FFFFFF] transition-transform duration-300 ease-in-out hover:scale-105`}
                    >
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedProcedures.includes(procedure.id)}
                                onChange={() => onToggleProcedure(procedure.id)} className="hidden"
                            />
                            <span
                                className={`w-5 h-5 flex items-center justify-center border-2 rounded-md transition-all duration-300 ${selectedProcedures.includes(procedure.id)
                                        ? "bg-[#128385] border-[#128385] text-white"
                                        : "bg-white border-gray-300"
                                    }`}
                            >
                                {selectedProcedures.includes(procedure.id) && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </span>
                            {procedure.name} ({procedure.area})
                        </label>
                        <span className="text-sm text-gray-600 font-semibold">R$ {procedure.price}</span>
                    </li>

                ))}
            </ul>
        </div>
    )
}