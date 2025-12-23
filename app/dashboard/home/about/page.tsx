// app/dashboard/about/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type AboutSectionData = {
  id: number;
  subtitle: string | null;
  title: string | null;
  description_left: string | null;
  description_right: string | null;
};

export default function AboutSectionDashboard() {
  const [about, setAbout] = useState<AboutSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("about_section")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error) {
      alert("Erro ao carregar seção About");
      console.error(error);
    } else {
      setAbout(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!about) return;

    setSaving(true);
    const { error } = await supabase
      .from("about_section")
      .update({
        subtitle: about.subtitle,
        title: about.title,
        description_left: about.description_left,
        description_right: about.description_right,
      })
      .eq("id", about.id);

    setSaving(false);
    if (error) alert("Erro ao salvar: " + error.message);
    else {
      alert("Seção About atualizada!");
      router.push("/dashboard");
    }
  };

  if (loading) return <p>A carregar About Section...</p>;
  if (!about) return <p>About Section não encontrada.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Editar About Section</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Subtitle</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={about.subtitle || ""}
          onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={about.title || ""}
          onChange={(e) => setAbout({ ...about, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Descrição Esquerda</label>
        <textarea
          className="w-full border px-3 py-2 rounded min-h-20"
          value={about.description_left || ""}
          onChange={(e) => setAbout({ ...about, description_left: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Descrição Direita</label>
        <textarea
          className="w-full border px-3 py-2 rounded min-h-20"
          value={about.description_right || ""}
          onChange={(e) => setAbout({ ...about, description_right: e.target.value })}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {saving ? "A salvar..." : "Salvar"}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="border px-6 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
