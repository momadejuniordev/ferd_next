// app/dashboard/hero/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type HeroSectionData = {
  id: number;
  subtitle: string | null;
  title: string | null;
  description: string | null;
  button_text: string | null;
  button_link: string | null;
  image_url: string | null;
};

export default function HeroSectionDashboard() {
  const [hero, setHero] = useState<HeroSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_section")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (error) console.error(error);
    else setHero(data);

    setLoading(false);
  };

  const handleSave = async () => {
    if (!hero) return;

    setSaving(true);
    const { error } = await supabase
      .from("hero_section")
      .update(hero)
      .eq("id", hero.id);
    setSaving(false);

    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Seção Hero salva!");
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Erro ao fazer upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("public")
      .getPublicUrl(filePath);

    if (!data || !data.publicUrl) {
      alert("Erro ao obter URL da imagem.");
      setUploading(false);
      return;
    }

    if (hero) {
      setHero({ ...hero, image_url: data.publicUrl });
    }
    setUploading(false);
  };

  if (loading) return <p>A carregar dados do Hero...</p>;
  if (!hero) return <p>Seção Hero não encontrada.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Editar Hero Section</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Subtítulo</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={hero.subtitle || ""}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Título</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={hero.title || ""}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Descrição</label>
        <textarea
          className="w-full border px-3 py-2 rounded min-h-25"
          value={hero.description || ""}
          onChange={(e) => setHero({ ...hero, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Texto do Botão</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={hero.button_text || ""}
            onChange={(e) => setHero({ ...hero, button_text: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Link do Botão</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={hero.button_link || ""}
            onChange={(e) => setHero({ ...hero, button_link: e.target.value })}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Imagem de Destaque</label>
        {hero.image_url && (
          <img
            src={hero.image_url}
            alt="Hero"
            className="w-full mb-2 rounded border"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          className="block w-full"
        />
        {uploading && <p>Fazendo upload...</p>}
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
