import React, { useState } from "react";

const sections = ["Oficina", "Lavagem", "Checklist", "Saída"];

export default function ParqueCamioes() {
  const [camioes, setCamioes] = useState({
    Oficina: [],
    Lavagem: [],
    Checklist: [],
    Saída: [],
  });
  const [matricula, setMatricula] = useState("");
  const [secao, setSecao] = useState("Oficina");

  const adicionarCamiao = () => {
    if (!matricula.trim()) return;
    if (Object.values(camioes).some(sec => sec.includes(matricula))) return;
    setCamioes({
      ...camioes,
      [secao]: [...camioes[secao], matricula.toUpperCase()],
    });
    setMatricula("");
  };

  const removerCamiao = (secaoRemover, matriculaRemover) => {
    setCamioes({
      ...camioes,
      [secaoRemover]: camioes[secaoRemover].filter(
        (mat) => mat !== matriculaRemover
      ),
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Controlo do Parque de Camiões</h1>

      <div className="flex space-x-4">
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="Digite a matrícula"
          className="border p-2 rounded w-40"
        />
        <select
          value={secao}
          onChange={(e) => setSecao(e.target.value)}
          className="border p-2 rounded"
        >
          {sections.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={adicionarCamiao}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sections.map((sec) => (
          <div key={sec} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2">{sec}</h2>
            <ul className="space-y-1">
              {camioes[sec].map((mat) => (
                <li
                  key={mat}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>{mat}</span>
                  <button
                    onClick={() => removerCamiao(sec, mat)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
