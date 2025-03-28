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
      { id: "cleaning", name: "Hautreinigung", price: 150, area: "Gesicht" },
      { id: "peeling", name: "Peeling", price: 200, area: "Gesicht" },
    ],
  },
  {
    id: "breast",
    name: "Brüste",
    procedures: [{ id: "breastDrainage", name: "Lymphdrainage", price: 100, area: "Brüste" }],
  },
  {
    id: "hip",
    name: "Hüfte",
    procedures: [
      { id: "hipDrainage", name: "Lymphdrainage", price: 100, area: "Hüfte" },
      { id: "hipLipo", name: "Liposkulptur", price: 500, area: "Hüfte" },
      { id: "hipMassage", name: "Modellierende Massage", price: 120, area: "Hüfte" },
    ],
  },
  {
    id: "abdomen",
    name: "Abdomen",
    procedures: [
      { id: "abdomenLipo", name: "Liposkulptur", price: 500, area: "Abdomen" },
      { id: "abdomenMassage", name: "Modellierende Massage", price: 120, area: "Abdomen" },
    ],
  },
  {
    id: "thighs",
    name: "Schenkel",
    procedures: [
      { id: "thighsDrainage", name: "Lymphdrainage", price: 100, area: "Schenkel" },
      { id: "thighsVeins", name: "Behandlung von Krampfadern", price: 300, area: "Schenkel" },
      { id: "thighsCelulites", name: "Cellulite-Behandlung", price: 300, area: "Schenkel" },
    ],
  },
  {
    id: "calf",
    name: "Kalb",
    procedures: [
      { id: "calfDrainage", name: "Lymphdrainage", price: 100, area: "Kalb" },
      { id: "calfVeins", name: "Behandlung von Krampfadern", price: 300, area: "Kalb" },
    ],
  },
];

export default function OrcamentoPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]); // Armazena todos os procedimentos selecionados globalmente

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

      <BodyPartSelector selectedArea={selectedArea} onSelectArea={handleSelectArea} />

      <div className={`transition-opacity duration-500 ease-in-out ${selectedArea ? "opacity-100" : "opacity-0"}`}>
        {selectedArea && (
          <div>
            <h3 className="text-lg text-center font-semibold py-4 xl:w-[500px] md:w-[450px] sm:w-[400px]">
              Wählen Sie Verfahren zu {" "}
              <strong>{bodyAreas.find((area) => area.id === selectedArea)?.name}</strong>
            </h3>
            <ProceduresList
              procedures={selectedAreaProcedures}
              selectedProcedures={selectedProcedures}
              onToggleProcedure={handleToggleProcedure}
            />
          </div>
        )}
      </div>

      <div className={`transition-all duration-500 ease-in-out transform ${totalPrice > 0 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4"}`}>
        {totalPrice > 0 && (
          <div className="mt-6 text-center xl:w-[500px] md:w-[450px] sm:w-[400px]">
            <ConfirmedProceduresList
              procedures={bodyAreas.flatMap((area) => area.procedures).filter((proc) => selectedProcedures.includes(proc.id))}
              selectedProcedures={selectedProcedures}
              onToggleProcedure={handleToggleProcedure}
            />
            <h3 className="text-lg font-semibold py-4">Gesamtwert:</h3>
            <h2 className="text-lg text-center font-bold py-2 px-4 bg-[#AEFAFC] border border-[#128385] rounded-lg">
              € {totalPrice}
            </h2>
            <button className="mt-4 px-6 py-2 bg-[#128385] text-white rounded-lg hover:bg-[#145758]">
              Budget bestätigen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
