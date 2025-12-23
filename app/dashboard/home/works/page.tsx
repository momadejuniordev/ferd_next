// app/dashboard/works/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Work = {
  id: number;
  name: string | null;
  type: string | null;
  year: number | null;
  image_url: string | null;
};

export default function WorksDashboard() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("works_section")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error(error);
    else setWorks(data || []);
    setLoading(false);
  };

  const handleChange = (id: number, field: keyof Work, value: any) => {
    setWorks((prev) =>
      prev.map((work) => (work.id === id ? { ...work, [field]: value } : work))
    );
  };

  const handleSave = async (work: Work) => {
    setSaving(true);
    const { error } = await supabase
      .from("works_section")
      .update(work)
      .eq("id", work.id);
    setSaving(false);

    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Projeto salvo!");
  };

  if (loading) return <p>Carregando projetos...</p>;
  if (!works.length) return <p>Nenhum projeto encontrado.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Editar Works Section</h1>

      {works.map((work) => (
        <div key={work.id} className="mb-6 p-4 bg-white rounded shadow">
          <div className="mb-3">
            <label className="block font-semibold mb-1">Nome do Projeto</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={work.name || ""}
              onChange={(e) => handleChange(work.id, "name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div>
              <label className="block font-semibold mb-1">Tipo</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={work.type || ""}
                onChange={(e) => handleChange(work.id, "type", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Ano</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded"
                value={work.year || ""}
                onChange={(e) => handleChange(work.id, "year", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Imagem URL</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={work.image_url || ""}
                onChange={(e) => handleChange(work.id, "image_url", e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => handleSave(work)}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Salvando..." : "Salvar Projeto"}
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
