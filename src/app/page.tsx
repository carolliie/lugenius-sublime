"use client";

import React, { useState } from "react";
import { BodyPartSelector } from "@/components/BodyPartSelector";
import { ProceduresList } from "@/components/ProceduresList";
import { BodyArea } from "@/types/procedures";
import { ConfirmedProceduresList } from "@/components/ConfirmedProceduresList";

const bodyAreas: BodyArea[] = [
  {
    id: "face",
    name: "Rosto",
    procedures: [
      { id: "cleaning", name: "Limpeza de Pele", price: 150, area: "Rosto"},
      { id: "peeling", name: "Peeling", price: 200, area: "Rosto" },
    ],
  },
  {
    id: "breast",
    name: "Seios",
    procedures: [
      { id: "breastDrainage", name: "Drenagem Linfática", price: 100, area: "Seios" }
    ],
  },
  {
    id: "hip",
    name: "Quadril",
    procedures: [
      { id: "hipDrainage", name: "Drenagem Linfática", price: 100, area: "Quadril" },
      { id: "hipLipo", name: "Lipoescultura", price: 500, area: "Quadril" },
      { id: "hipMassage", name: "Massagem Modeladora", price: 120, area: "Quadril" },
    ],
  },
  {
    id: "abdomen",
    name: "Abdômen",
    procedures: [
      { id: "abdomenLipo", name: "Lipoescultura", price: 500, area: "Abdômen" },
      { id: "abdomenMassage", name: "Massagem Modeladora", price: 120, area: "Abdômen" },
    ],
  },
  {
    id: "thighs",
    name: "Coxas",
    procedures: [
      { id: "thighsDrainage", name: "Drenagem Linfática", price: 100, area: "Coxas" },
      { id: "thighsVeins", name: "Tratamento de Varizes", price: 300, area: "Coxas" },
      { id: "thighsCelulites", name: "Tratamento de Celulites", price: 300, area: "Coxas" },
    ],
  },
  {
    id: "calf",
    name: "Panturrilha",
    procedures: [
      { id: "calfDrainage", name: "Drenagem Linfática", price: 100, area: "Panturrilha" },
      { id: "calfVeins", name: "Tratamento de Varizes", price: 300, area: "Panturrilha" }
    ],
  },
];

export default function OrcamentoPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [allSelectedProcedures, setAllSelectedProcedures] = useState<Record<string, string[]>>({});

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
  };

  const handleToggleProcedure = (procedureId: string) => {
    setAllSelectedProcedures((prev) => {
      const currentProcedures = prev[selectedArea || ""] || [];
      const updatedProcedures = currentProcedures.includes(procedureId)
        ? currentProcedures.filter((id) => id !== procedureId)
        : [...currentProcedures, procedureId];

      return { ...prev, [selectedArea || ""]: updatedProcedures };
    });
  };

  const selectedAreaProcedures =
    bodyAreas.find((area) => area.id === selectedArea)?.procedures || [];

  const totalPrice = Object.entries(allSelectedProcedures)
    .flatMap(([areaId, procedures]) =>
      bodyAreas
        .find((area) => area.id === areaId)
        ?.procedures.filter((proc) => procedures.includes(proc.id)) || []
    )
    .reduce((acc, procedure) => acc + procedure.price, 0);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Orçamento de Procedimentos</h1>

      <BodyPartSelector
        selectedArea={selectedArea}
        onSelectArea={handleSelectArea}
      />

      <div
        className={`transition-opacity duration-500 ease-in-out ${selectedArea ? "opacity-100" : "opacity-0"
          }`}
      >
        {selectedArea && (
          <div>
            <h3 className="text-lg text-center font-semibold py-4 xl:w-[500px] md:w-[450px] sm:w-[400px]">
              Selecione os procedimentos para{" "}
              <strong>
                {bodyAreas.find((area) => area.id === selectedArea)?.name}
              </strong>
            </h3>
            <ProceduresList
              procedures={selectedAreaProcedures}
              selectedProcedures={allSelectedProcedures[selectedArea || ""] || []}
              onToggleProcedure={handleToggleProcedure}
            />
          </div>
        )}
      </div>

      <div
        className={`transition-all duration-500 ease-in-out transform ${totalPrice > 0 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4"
          }`}
      >
        {totalPrice > 0 && (
          <div className="mt-6 text-center xl:w-[500px] md:w-[450px] sm:w-[400px]">
            <ConfirmedProceduresList
              procedures={bodyAreas.flatMap((area) =>
                area.procedures.filter((proc) =>
                  (allSelectedProcedures[area.id] || []).includes(proc.id)
                )
              )}
              selectedProcedures={Object.values(allSelectedProcedures).flat()}
              onToggleProcedure={handleToggleProcedure}
            />
            <h3 className="text-lg font-semibold py-4">Valor total:</h3>
            <h2 className="text-lg text-center font-bold py-2 px-4 bg-[#AEFAFC] border border-[#128385] rounded-lg">
              R$ {totalPrice}
            </h2>
            <button className="mt-4 px-6 py-2 bg-[#128385] text-white rounded-lg hover:bg-[#145758]">
              Confirmar Orçamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
