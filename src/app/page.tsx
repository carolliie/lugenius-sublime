"use client";

import React, { useState } from "react";
import { BodyPartSelector } from "@/components/BodyPartSelector";
import { ProceduresList } from "@/components/ProceduresList";
import { BodyArea } from "@/types/procedures";
import { ConfirmedProceduresList } from "@/components/ConfirmedProceduresList";

const bodyAreas: BodyArea[] = [
  {
    id: "face",
    name: "Gesicht",
    procedures: [
      { id: "doppelkinn", name: "Doppelkinn", price: 1400, area: "Gesicht" }
    ]
  },
  {
    id: "arms",
    name: "Arme",
    procedures: [
      { id: "arme", name: "Arme", price: 1400, area: "Arme" }
    ]
  },
  {
    id: "abdomen",
    name: "Abdomen",
    procedures: [
      { id: "bauch", name: "Bauch", price: 1400, area: "Abdomen" },
      { id: "taille", name: "Taille", price: 1400, area: "Abdomen" },
      { id: "rucken", name: "Rücken", price: 1400, area: "Abdomen" },
      { id: "venushugel", name: "Venushügel", price: 1400, area: "Abdomen" }
    ]
  },
  {
    id: "hip",
    name: "Hüfte",
    procedures: [
      { id: "hufte", name: "Hüfte", price: 1400, area: "Hüfte" }
    ]
  },
  {
    id: "thighs",
    name: "Schenkel",
    procedures: [
      { id: "beineHinten", name: "Beine hinten", price: 1400, area: "Schenkel" },
      { id: "beineVorne", name: "Beine vorne", price: 1400, area: "Schenkel" },
      { id: "innenschenkel", name: "Innenschenkel", price: 1400, area: "Schenkel" },
      { id: "reiterhosen", name: "Reiterhosen", price: 1400, area: "Schenkel" }
    ]
  },
  {
    id: "calf",
    name: "Waden",
    procedures: [
      { id: "waden", name: "Waden", price: 1400, area: "Waden" }
    ]
  }
];

export default function OrcamentoPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
  };

  const handleToggleProcedure = (procedureId: string) => {
    setSelectedProcedures((prev) =>
      prev.includes(procedureId)
        ? prev.filter((id) => id !== procedureId)
        : [...prev, procedureId]
    );
  };

  const selectedAreaProcedures = bodyAreas.find((area) => area.id === selectedArea)?.procedures || [];

  const totalPrice = bodyAreas
    .flatMap((area) => area.procedures)
    .filter((procedure) => selectedProcedures.includes(procedure.id))
    .reduce((acc, procedure) => acc + procedure.price, 0);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-2xl text-center font-bold mb-6">Verfahrensbudget</h1>

      <div className="relative w-full flex flex-col xl:flex-row items-start justify-center xl:items-start xl:justify-center transition-all duration-500 ease-in-out">
        <div className={`transition-all duration-500 transform flex justify-center w-full xl:w-auto ${selectedArea ? "xl:-translate-x-32" : "xl:translate-x-0"}`}>
          <BodyPartSelector selectedArea={selectedArea} onSelectArea={handleSelectArea} />
        </div>

        <div className={`w-full mt-10 xl:mt-0 xl:ml-10 transition-all duration-500 ease-in-out ${selectedArea ? "opacity-100 max-w-[500px]" : "opacity-0 max-w-[0px]"}`}>
          {selectedArea && (
            <>
              <h3 className="text-lg text-center font-semibold py-4">
                Wählen Sie Verfahren zu <strong>{bodyAreas.find((area) => area.id === selectedArea)?.name}</strong>
              </h3>
              <ProceduresList
                procedures={selectedAreaProcedures}
                selectedProcedures={selectedProcedures}
                onToggleProcedure={handleToggleProcedure}
              />
            </>
          )}

          {totalPrice > 0 && (
            <div className="mt-6 text-center">
              <ConfirmedProceduresList
                procedures={bodyAreas.flatMap((area) => area.procedures).filter((proc) => selectedProcedures.includes(proc.id))}
                selectedProcedures={selectedProcedures}
                onToggleProcedure={handleToggleProcedure}
              />
              <h3 className="text-lg font-semibold py-4">Gesamtwert:</h3>
              <h2 className="text-lg text-center font-bold py-2 px-4 bg-[#AEFAFC] border border-[#128385] rounded-lg">
                CHF {totalPrice.toLocaleString("de-CH")}
              </h2>
              <a href="https://sublimesite.lugenix.com/#beratung-buchen">
                <button className="mt-4 px-6 py-2 bg-[#128385] text-white rounded-lg hover:bg-[#145758]">
                  Budget bestätigen
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
