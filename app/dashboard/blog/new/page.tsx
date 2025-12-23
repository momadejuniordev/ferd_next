"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type NewBlogPost = {
  title: string;
  slug: string;
  category?: string;
  cover_image_url?: string;
  published_at: string;
  content: string;
};

const initialPost: NewBlogPost = {
  title: "",
  slug: "",
  category: "",
  cover_image_url: "",
  published_at: new Date().toISOString(),
  content: "",
};

export default function NewBlogPostPage() {
  const router = useRouter();
  const [post, setPost] = useState<NewBlogPost>(initialPost);
  const [saving, setSaving] = useState(false);

  /* ---------------- IMAGE ---------------- */

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
          canvas
            .getContext("2d")
            ?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
      };
    });

  const handleCoverUpload = async (file: File) => {
    const img = await compressImage(file);
    setPost({ ...post, cover_image_url: img });
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    if (!post.title || !post.content) {
      alert("Título e conteúdo são obrigatórios.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("blog_posts").insert([post]);

    setSaving(false);

    if (error) {
      alert("Erro ao criar post: " + error.message);
    } else {
      alert("Post criado com sucesso!");
      router.push("/dashboard/blog");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Post</h1>

      {/* TÍTULO */}
      <Field label="Título">
        <input
          className="input w-full border px-3 py-2 rounded"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </Field>

      {/* SLUG */}
      <Field label="Slug">
        <input
          className="input w-full border px-3 py-2 rounded"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
        />
      </Field>

      {/* CATEGORIA */}
      <Field label="Categoria">
        <input
          className="input w-full border px-3 py-2 rounded"
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
        />
      </Field>

      {/* DATA DE PUBLICAÇÃO */}
      <Field label="Data de publicação">
        <input
          type="date"
          className="input w-full border px-3 py-2 rounded"
          value={post.published_at.split("T")[0]}
          onChange={(e) =>
            setPost({ ...post, published_at: e.target.value })
          }
        />
      </Field>

      {/* IMAGEM DE CAPA */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Imagem de capa</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleCoverUpload(e.target.files[0])
          }
        />
        {post.cover_image_url && (
          <div className="relative mt-3 w-64">
            <img
              src={post.cover_image_url}
              className="rounded border object-cover"
            />
            <button
              onClick={() => setPost({ ...post, cover_image_url: "" })}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* CONTEÚDO */}
      <Field label="Conteúdo">
        <textarea
          className="input w-full border px-3 py-2 rounded min-h-50"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
      </Field>

      {/* BOTÕES */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <button
          onClick={() => router.back()}
          className="border px-6 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

/* ---------------- FIELD HELPER ---------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      {children}
    </div>
  );
}
