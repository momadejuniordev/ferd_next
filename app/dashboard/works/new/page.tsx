"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ---------------- TYPES ---------------- */

type Project = {
  title: string;
  overview: string;
  objectives: string[];
  image_url: string | null;
  category: string;
  year: string;
  client: string;
  link: string;
  awards: string;
  client_says_text: string;
  client_says_name: string;
  slug: string;
};

/* ---------------- INITIAL ---------------- */

const initialProject: Project = {
  title: "",
  overview: "",
  objectives: [],
  image_url: null,
  category: "",
  year: "",
  client: "",
  link: "",
  awards: "",
  client_says_text: "",
  client_says_name: "",
  slug: "",
};

export default function NewProjectPage() {
  const router = useRouter();
  const [project, setProject] = useState(initialProject);
  const [saving, setSaving] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);

  /* ---------------- IMAGE COMPRESSION ---------------- */

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = 1200 / img.width;
          canvas.width = 1200;
          canvas.height = img.height * scale;
          canvas
            .getContext("2d")
            ?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
      };
    });

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const images = await Promise.all(files.map((file) => compressImage(file)));
    setGallery((prev) => [...prev, ...images]);
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    if (!project.title) {
      alert("O título é obrigatório");
      return;
    }

    if (!project.image_url) {
      alert("A imagem destacada é obrigatória");
      return;
    }

    setSaving(true);

    const payload = {
      title: project.title,
      image_url: project.image_url,
      category: project.category || null,
      year: project.year || null,
      link: project.link || null,
      overview: project.overview || null,
      objectives: project.objectives.length > 0 ? project.objectives : null,
      awards: project.awards || null,
      client: project.client || null,
      images: gallery.length > 0 ? gallery : null,
      client_says_text: project.client_says_text || null,
      client_says_name: project.client_says_name || null,
      slug: project.slug || null,
      user_id: null, // aqui podes adicionar o UUID do usuário logado se quiser
    };

    const { error } = await supabase.from("projects").insert([payload]);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Erro ao publicar projeto: " + error.message);
    } else {
      router.push("/dashboard/works");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-[#f0f0f1] min-h-screen text-[#1d2327]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">Adicionar novo projecto</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* TITLE */}
            <div className="bg-white border rounded p-4">
              <input
                placeholder="Título"
                className="w-full text-xl font-medium border px-3 py-2"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
              />
            </div>

            {/* OVERVIEW */}
            <div className="bg-white border rounded">
              <div className="border-b px-4 py-2 font-medium">Descrição</div>
              <div className="p-4">
                <textarea
                  className="w-full min-h-45 border px-3 py-2"
                  placeholder="Descrição do projeto..."
                  value={project.overview}
                  onChange={(e) =>
                    setProject({ ...project, overview: e.target.value })
                  }
                />
              </div>
            </div>

            {/* OBJECTIVES */}
            <div className="bg-white border rounded">
              <div className="border-b px-4 py-2 font-medium">Objetivos</div>
              <div className="p-4 space-y-3">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="flex-1 border px-3 py-2"
                      placeholder={`Objetivo ${i + 1}`}
                      value={obj}
                      onChange={(e) => {
                        const updated = [...project.objectives];
                        updated[i] = e.target.value;
                        setProject({ ...project, objectives: updated });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProject({
                          ...project,
                          objectives: project.objectives.filter(
                            (_, idx) => idx !== i
                          ),
                        })
                      }
                      className="px-3 border border-red-300 text-red-600 hover:bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setProject({
                      ...project,
                      objectives: [...project.objectives, ""],
                    })
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Adicionar objetivo
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* PUBLISH */}
            <div className="bg-white border rounded">
              <div className="border-b px-4 py-2 font-medium">Publicar</div>
              <div className="p-4 space-y-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-[#2271b1] hover:bg-[#135e96] text-white py-2 rounded"
                >
                  {saving ? "A guardar..." : "Publicar"}
                </button>
                <button
                  onClick={() => router.back()}
                  className="w-full border py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>

            {/* FEATURED IMAGE */}
            <div className="bg-white border rounded">
              <div className="border-b px-4 py-2 font-medium">Imagem destacada</div>
              <div className="p-4">
                {!project.image_url ? (
                  <label className="text-blue-600 cursor-pointer text-sm">
                    Definir imagem
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={async (e) =>
                        e.target.files &&
                        setProject({
                          ...project,
                          image_url: await compressImage(e.target.files[0]),
                        })
                      }
                    />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <img
                      src={project.image_url}
                      className="w-full rounded border"
                    />
                    <button
                      onClick={() =>
                        setProject({ ...project, image_url: null })
                      }
                      className="text-sm text-red-600"
                    >
                      Remover imagem
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* GALLERY */}
            <div className="bg-white border rounded">
              <div className="border-b px-4 py-2 font-medium">Galeria de imagens</div>
              <div className="p-4 text-sm space-y-3">
                <label className="text-blue-600 cursor-pointer inline-block">
                  Adicionar imagens
                  <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryUpload}
                  />
                </label>

                {gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative border rounded overflow-hidden group"
                      >
                        <img
                          src={img}
                          className="h-24 w-full object-cover"
                        />
                        <button
                          onClick={() =>
                            setGallery(gallery.filter((_, idx) => idx !== i))
                          }
                          className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* META */}
            <div className="bg-white border rounded">
              <div className="border-b px-4 py-2 font-medium">Detalhes</div>
              <div className="p-4 space-y-3">
                <input
                  placeholder="Categoria"
                  className="w-full border px-3 py-2"
                  value={project.category}
                  onChange={(e) =>
                    setProject({ ...project, category: e.target.value })
                  }
                />
                <input
                  placeholder="Ano"
                  className="w-full border px-3 py-2"
                  value={project.year}
                  onChange={(e) =>
                    setProject({ ...project, year: e.target.value })
                  }
                />
                <input
                  placeholder="Cliente"
                  className="w-full border px-3 py-2"
                  value={project.client}
                  onChange={(e) =>
                    setProject({ ...project, client: e.target.value })
                  }
                />
                <input
                  placeholder="Link"
                  className="w-full border px-3 py-2"
                  value={project.link}
                  onChange={(e) =>
                    setProject({ ...project, link: e.target.value })
                  }
                />
                <input
                  placeholder="Awards / Prémios"
                  className="w-full border px-3 py-2"
                  value={project.awards}
                  onChange={(e) =>
                    setProject({ ...project, awards: e.target.value })
                  }
                />
                <input
                  placeholder="Depoimento do cliente"
                  className="w-full border px-3 py-2"
                  value={project.client_says_text}
                  onChange={(e) =>
                    setProject({ ...project, client_says_text: e.target.value })
                  }
                />
                <input
                  placeholder="Nome do cliente"
                  className="w-full border px-3 py-2"
                  value={project.client_says_name}
                  onChange={(e) =>
                    setProject({ ...project, client_says_name: e.target.value })
                  }
                />
                <input
                  placeholder="Slug"
                  className="w-full border px-3 py-2"
                  value={project.slug}
                  onChange={(e) =>
                    setProject({ ...project, slug: e.target.value })
                  }
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
