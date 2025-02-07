"use client"

import React, { useState } from "react";
import { BodyPartSelector } from "@/components/BodyPartSelector";
import { ProceduresList } from "@/components/ProceduresList";
import { BodyArea } from "@/types/procedures";

const bodyAreas: BodyArea[] = [
  {
    id: "face",
    name: "Rosto",
    procedures: [
      { id: "cleaning", name: "Limpeza de Pele", price: 150 },
      { id: "peeling", name: "Peeling", price: 200 },
    ],
  },
  {
    id: "breast",
    name: "Seios",
    procedures: [
      { id: "drainage", name: "Drenagem Linfática", price: 100 },
    ],
  },
  {
    id: "hip",
    name: "Quadril",
    procedures: [
      { id: "drainage", name: "Drenagem Linfática", price: 100 },
      { id: "lipo", name: "Lipoescultura", price: 500 },
      { id: "massage", name: "Massagem Modeladora", price: 120 },
    ],
  },
  {
    id: "abdomen",
    name: "Abdômen",
    procedures: [
      { id: "lipo", name: "Lipoescultura", price: 500 },
      { id: "massage", name: "Massagem Modeladora", price: 120 },
    ],
  },
  {
    id: "thighs",
    name: "Coxas",
    procedures: [
      { id: "drainage", name: "Drenagem Linfática", price: 100 },
      { id: "veins", name: "Tratamento de Varizes", price: 300 },
      { id: "celulites", name: "Tratamento de Celulites", price: 300 },
    ],
  },
  {
    id: "calf",
    name: "Panturrilha",
    procedures: [
      { id: "drainage", name: "Drenagem Linfática", price: 100 },
      { id: "veins", name: "Tratamento de Varizes", price: 300 },
      { id: "celulites", name: "Tratamento de Celulites", price: 300 },
    ],
  },
];

export default function OrcamentoPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
    setSelectedProcedures([]); // Reseta os procedimentos ao mudar a área
  };

  const handleToggleProcedure = (procedureId: string) => {
    setSelectedProcedures((prev) =>
      prev.includes(procedureId)
        ? prev.filter((id) => id !== procedureId)
        : [...prev, procedureId]
    );
  };

  const selectedAreaProcedures =
    bodyAreas.find((area) => area.id === selectedArea)?.procedures || [];

  const totalPrice = selectedAreaProcedures
    .filter((procedure) => selectedProcedures.includes(procedure.id))
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
          <ProceduresList
            procedures={selectedAreaProcedures}
            selectedProcedures={selectedProcedures}
            onToggleProcedure={handleToggleProcedure}
          />
        )}
      </div>

      <div
        className={`transition-all duration-500 ease-in-out transform ${selectedProcedures.length > 0
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 -translate-y-4"
          }`}
      >
        {selectedProcedures.length > 0 && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Valor total:</h3>
            <h2 className="text-lg text-center font-semibold py-2 px-4 bg-[#AEFAFC] border border-[#128385] rounded-lg">R$ {totalPrice}</h2>
            <button className="mt-4 px-6 py-2 bg-[#128385] text-white rounded-lg hover:bg-[#145758]">
              Confirmar Orçamento
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
