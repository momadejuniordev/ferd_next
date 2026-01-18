"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  order_index: number;
  _uid?: number;
};

type WhatIDo = {
  id: number;
  title: string;
  image_url: string;
  image_file?: File | null;
};

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [whatIDo, setWhatIDo] = useState<WhatIDo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uniqueIdCounter, setUniqueIdCounter] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: servicesData, error: servicesError } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (servicesError) console.error("Erro ao carregar serviços:", servicesError);
    else setServices(
      (servicesData || []).map(s => ({ ...s, _uid: uniqueIdCounter + s.id }))
    );

    const { data: whatIDoData, error: whatIDoError } = await supabase
      .from("what_i_do")
      .select("*")
      .limit(1)
      .single();

    if (whatIDoError) console.error("Erro ao carregar What I Do:", whatIDoError);
    else setWhatIDo(whatIDoData || null);

    setUniqueIdCounter(prev => prev + (servicesData?.length || 0) + 1);
    setLoading(false);
  };

  // ---------------- Serviços ----------------
  const handleUpdateService = <K extends keyof Service>(index: number, field: K, value: Service[K]) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleRemoveService = async (index: number) => {
    const service = services[index];
    if (service.id !== 0) {
      const { error } = await supabase.from("services").delete().eq("id", service.id);
      if (error) return alert("Erro ao remover serviço: " + error.message);
    }
    setServices(services.filter((_, i) => i !== index));
  };

  const handleAddService = () => {
    const newService: Service = {
      id: 0,
      title: "",
      description: "",
      is_active: true,
      order_index: services.length,
      _uid: uniqueIdCounter,
    };
    setServices([...services, newService]);
    setUniqueIdCounter(uniqueIdCounter + 1);
  };

  const handleSaveAll = async () => {
    if (!whatIDo) return;
    setSaving(true);

    // ---------------- Salva What I Do ----------------
    let imageUrl = whatIDo.image_url;

    if (whatIDo.image_file) {
      const fileExt = whatIDo.image_file.name.split(".").pop();
      const fileName = `${Date.now()}-what-i-do.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("what-i-do-images")
        .upload(fileName, whatIDo.image_file, { upsert: true });

      if (uploadError) console.error("Erro no upload:", uploadError.message);
      else {
        const { data } = supabase.storage.from("what-i-do-images").getPublicUrl(fileName);
        const publicUrl = data?.publicUrl;
        imageUrl = publicUrl;
      }
    }

    const whatIDoPayload = { title: whatIDo.title, image_url: imageUrl };

    if (whatIDo.id === 0) {
      await supabase.from("what_i_do").insert([whatIDoPayload]);
    } else {
      await supabase.from("what_i_do").update(whatIDoPayload).eq("id", whatIDo.id);
    }

    // ---------------- Salva Serviços ----------------
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      const payload = { title: s.title, description: s.description, is_active: s.is_active, order_index: i };

      if (s.id === 0) {
        const { error } = await supabase.from("services").insert([payload]);
        if (error) console.error("Erro ao salvar serviço:", error.message);
      } else {
        const { error } = await supabase.from("services").update(payload).eq("id", s.id);
        if (error) console.error("Erro ao atualizar serviço:", error.message);
      }
    }

    setSaving(false);
    fetchData();
    alert("Serviços e What I Do atualizados!");
  };

  const handleUpdateWhatIDoField = (field: keyof WhatIDo, value: any) => {
    if (whatIDo) setWhatIDo({ ...whatIDo, [field]: value });
  };

  const handleImageChange = (file: File) => {
    if (!whatIDo) return;
    handleUpdateWhatIDoField("image_file", file);
    handleUpdateWhatIDoField("image_url", URL.createObjectURL(file));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* ---------- What I Do ---------- */}
      <h2 className="text-xl font-semibold mb-2">What I Do</h2>
      {whatIDo && (
        <div className="flex items-center bg-white border rounded p-4 mb-8 gap-4">
          {whatIDo.image_url && (
            <div className="relative w-32 h-32 cursor-pointer" onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e: any) => e.target.files && handleImageChange(e.target.files[0]);
              input.click();
            }}>
              <img
                src={whatIDo.image_url}
                alt={whatIDo.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 rounded opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold">
                Trocar
              </div>
            </div>
          )}
          <div className="flex-1">
            <input
              type="text"
              className="w-full border px-2 py-1 mb-2 font-semibold text-lg"
              placeholder="Título"
              value={whatIDo.title}
              onChange={(e) => handleUpdateWhatIDoField("title", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ---------- Serviços ---------- */}
      <table className="w-full bg-white border rounded mb-2">
        <thead className="bg-white text-white">
          <tr>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={s.id !== 0 ? s.id : s._uid}>
              <td className="p-2 border">
                <input
                  type="text"
                  className="w-full border px-1 py-1"
                  value={s.title}
                  onChange={(e) => handleUpdateService(i, "title", e.target.value)}
                />
              </td>
              <td className="p-2 border">
                <textarea
                  className="w-full border px-1 py-1"
                  value={s.description}
                  onChange={(e) => handleUpdateService(i, "description", e.target.value)}
                />
              </td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleRemoveService(i)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botões Gerais */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleAddService}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar Serviço
        </button>
        <button
          onClick={handleSaveAll}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          disabled={saving}
        >
          {saving && <span className="loader-border animate-spin border-2 border-white rounded-full w-4 h-4"></span>}
          {saving ? "Salvando..." : "Salvar Todos"}
        </button>
      </div>

      <style jsx>{`
        .loader-border {
          border-top-color: transparent;
          border-right-color: transparent;
        }
      `}</style>
    </div>
  );
}
