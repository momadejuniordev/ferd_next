// app/dashboard/services/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Service = {
  id: number;
  title: string | null;
  description: string | null;
};

export default function ServicesDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services_section")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error(error);
    else setServices(data || []);

    setLoading(false);
  };

  const handleChange = (id: number, field: keyof Service, value: string) => {
    setServices((prev) =>
      prev.map((service) => (service.id === id ? { ...service, [field]: value } : service))
    );
  };

  const handleSave = async (service: Service) => {
    setSaving(true);
    const { error } = await supabase
      .from("services_section")
      .update(service)
      .eq("id", service.id);
    setSaving(false);

    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Serviço salvo!");
  };

  if (loading) return <p>Carregando serviços...</p>;
  if (!services.length) return <p>Nenhum serviço encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Editar Services Section</h1>

      {services.map((service) => (
        <div key={service.id} className="mb-6 p-4 bg-white rounded shadow">
          <div className="mb-3">
            <label className="block font-semibold mb-1">Título</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={service.title || ""}
              onChange={(e) => handleChange(service.id, "title", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold mb-1">Descrição</label>
            <textarea
              className="w-full border px-3 py-2 rounded min-h-20"
              value={service.description || ""}
              onChange={(e) => handleChange(service.id, "description", e.target.value)}
            />
          </div>

          <button
            onClick={() => handleSave(service)}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Salvando..." : "Salvar Serviço"}
          </button>
        </div>
      ))}

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 border px-6 py-2 rounded"
      >
        Voltar
      </button>
    </div>
  );
}
