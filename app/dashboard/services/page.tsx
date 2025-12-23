"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  order_index: number;
};

export default function ServicesDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) console.error("Erro ao carregar serviços:", error);
    else setServices(data || []);

    setLoading(false);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      { id: 0, title: "", description: "", is_active: true, order_index: services.length },
    ]);
  };

  const handleUpdateService = <K extends keyof Service>(index: number, field: K, value: Service[K]) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleRemoveService = async (index: number) => {
    const service = services[index];
    if (service.id !== 0) {
      const { error } = await supabase.from("services").delete().eq("id", service.id);
      if (error) {
        alert("Erro ao remover serviço: " + error.message);
        return;
      }
    }
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const s of services) {
      if (s.id === 0) {
        const { error } = await supabase.from("services").insert([s]);
        if (error) console.error("Erro ao salvar:", error.message);
      } else {
        const { error } = await supabase.from("services").update(s).eq("id", s.id);
        if (error) console.error("Erro ao atualizar:", error.message);
      }
    }
    setSaving(false);
    fetchServices();
    alert("Serviços atualizados!");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#f0f0f1] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Gerir Serviços</h1>

      <button
        onClick={handleAddService}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        + Adicionar Serviço
      </button>

      {loading ? (
        <p>A carregar serviços...</p>
      ) : services.length === 0 ? (
        <p>Nenhum serviço disponível.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <div key={i} className="bg-white border rounded p-4 relative">
              <input
                className="w-full border px-2 py-1 mb-2 font-semibold text-lg"
                placeholder="Título do serviço"
                value={service.title}
                onChange={(e) => handleUpdateService(i, "title", e.target.value)}
              />
              <textarea
                className="w-full border px-2 py-1 mb-2"
                placeholder="Descrição do serviço"
                value={service.description}
                onChange={(e) => handleUpdateService(i, "description", e.target.value)}
              />
              <button
                onClick={() => handleRemoveService(i)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {saving ? "A salvar..." : "Salvar tudo"}
        </button>
      </div>
    </div>
  );
}
