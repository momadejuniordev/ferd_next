"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  slug: string;
  image_url: string | null;
  category: string | null;
  year: string | null;
  link: string | null;
  overview: string | null;
  objectives: string[] | null;
  awards: string | null;
  client: string | null;
  images: string[] | null;
  client_says_text: string | null;
  client_says_name: string | null;
};

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) alert("Erro ao carregar projeto");
        else setProject(data);
        setLoading(false);
      });
  }, [id]);

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 1200;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
      };
    });

  const uploadMainImage = async (file: File) => {
    if (!project) return;
    const img = await compressImage(file);
    setProject({ ...project, image_url: img });
  };

  const addGalleryImage = async (file: File) => {
    if (!project) return;
    const img = await compressImage(file);
    setProject({ ...project, images: [...(project.images ?? []), img] });
  };

  const removeGalleryImage = (index: number) => {
    if (!project) return;
    setProject({ ...project, images: project.images?.filter((_, i) => i !== index) ?? [] });
  };

  const addObjective = () => {
    if (!project) return;
    setProject({ ...project, objectives: [...(project.objectives ?? []), ""] });
  };

  const updateObjective = (index: number, value: string) => {
    if (!project) return;
    const updated = [...(project.objectives ?? [])];
    updated[index] = value;
    setProject({ ...project, objectives: updated });
  };

  const removeObjective = (index: number) => {
    if (!project) return;
    setProject({ ...project, objectives: project.objectives?.filter((_, i) => i !== index) ?? [] });
  };

  const handleSave = async () => {
    if (!project) return;
    setSaving(true);

    const payload = {
      title: project.title,
      slug: project.slug,
      image_url: project.image_url,
      category: project.category,
      year: project.year,
      link: project.link,
      overview: project.overview,
      objectives: project.objectives ?? [],
      awards: project.awards,
      client: project.client,
      images: project.images ?? [],
      client_says_text: project.client_says_text,
      client_says_name: project.client_says_name,
    };

    const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
    setSaving(false);

    if (error) alert("Erro ao salvar: " + error.message);
    else router.push("/dashboard/works");
  };

  if (loading) return <p>Carregando projeto...</p>;
  if (!project) return <p>Projeto não encontrado.</p>;

  return (
    <div className="bg-[#f0f0f1] min-h-screen text-[#1d2327]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">Editar Projeto</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <Field label="Título">
              <input
                className="w-full border px-3 py-2 text-lg font-medium"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
              />
            </Field>

            <Field label="Overview">
              <textarea
                className="w-full border px-3 py-2 min-h-30"
                value={project.overview ?? ""}
                onChange={(e) => setProject({ ...project, overview: e.target.value })}
              />
            </Field>

            {/* OBJECTIVES */}
            <div className="bg-white border rounded p-4">
              <div className="border-b px-4 py-2 font-medium mb-3">Objetivos</div>
              <div className="space-y-2">
                {project.objectives?.map((obj, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="flex-1 border px-3 py-2"
                      value={obj}
                      onChange={(e) => updateObjective(i, e.target.value)}
                    />
                    <button
                      onClick={() => removeObjective(i)}
                      className="px-3 border border-red-300 text-red-600 hover:bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addObjective}
                  className="text-sm text-blue-600 hover:underline mt-2"
                >
                  + Adicionar objetivo
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* PUBLISH */}
            <div className="bg-white border rounded p-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-[#2271b1] hover:bg-[#135e96] text-white py-2 rounded mb-2"
              >
                {saving ? "A guardar..." : "Salvar"}
              </button>
              <button
                onClick={() => router.back()}
                className="w-full border py-2 rounded"
              >
                Cancelar
              </button>
            </div>

            {/* IMAGEM PRINCIPAL */}
            <div className="bg-white border rounded p-4">
              <div className="border-b px-4 py-2 font-medium mb-2">Imagem destacada</div>
              {!project.image_url ? (
                <label className="text-blue-600 cursor-pointer text-sm">
                  Definir imagem
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && uploadMainImage(e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img src={project.image_url} className="w-full rounded border" />
                  <button
                    onClick={() => setProject({ ...project, image_url: null })}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* GALERIA */}
            <div className="bg-white border rounded p-4">
              <div className="border-b px-4 py-2 font-medium mb-2">Galeria</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && addGalleryImage(e.target.files[0])}
              />
              <div className="grid grid-cols-3 gap-2 mt-3">
                {project.images?.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} className="h-24 w-full object-cover rounded border" />
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* META */}
            <div className="bg-white border rounded p-4 space-y-2">
              <Field label="Categoria">
                <input
                  className="w-full border px-3 py-2"
                  value={project.category ?? ""}
                  onChange={(e) => setProject({ ...project, category: e.target.value })}
                />
              </Field>
              <Field label="Ano">
                <input
                  className="w-full border px-3 py-2"
                  value={project.year ?? ""}
                  onChange={(e) => setProject({ ...project, year: e.target.value })}
                />
              </Field>
              <Field label="Cliente">
                <input
                  className="w-full border px-3 py-2"
                  value={project.client ?? ""}
                  onChange={(e) => setProject({ ...project, client: e.target.value })}
                />
              </Field>
              <Field label="Link">
                <input
                  className="w-full border px-3 py-2"
                  value={project.link ?? ""}
                  onChange={(e) => setProject({ ...project, link: e.target.value })}
                />
              </Field>
              <Field label="Awards / Prémios">
                <input
                  className="w-full border px-3 py-2"
                  value={project.awards ?? ""}
                  onChange={(e) => setProject({ ...project, awards: e.target.value })}
                />
              </Field>
              <Field label="Depoimento do cliente">
                <textarea
                  className="w-full border px-3 py-2 min-h-20"
                  value={project.client_says_text ?? ""}
                  onChange={(e) =>
                    setProject({ ...project, client_says_text: e.target.value })
                  }
                />
              </Field>
              <Field label="Nome do cliente">
                <input
                  className="w-full border px-3 py-2"
                  value={project.client_says_name ?? ""}
                  onChange={(e) => setProject({ ...project, client_says_name: e.target.value })}
                />
              </Field>
              <Field label="Slug">
                <input
                  className="w-full border px-3 py-2"
                  value={project.slug ?? ""}
                  onChange={(e) => setProject({ ...project, slug: e.target.value })}
                />
              </Field>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      {children}
    </div>
  );
}
