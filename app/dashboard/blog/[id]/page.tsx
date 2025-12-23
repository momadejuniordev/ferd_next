"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover_image_url?: string;
  published_at: string;
  content: string;
};

export default function EditBlogPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Erro ao carregar post");
        console.error(error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    if (!post) return;
    if (!post.title || !post.content) {
      alert("Título e conteúdo são obrigatórios");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("blog_posts")
      .update(post)
      .eq("id", post.id);
    setSaving(false);

    if (error) alert("Erro ao salvar: " + error.message);
    else router.push("/dashboard/blog");
  };

  if (loading) return <p className="text-center text-gray-500 mt-20">A carregar post...</p>;
  if (!post) return <p className="text-center text-red-500 mt-20">Post não encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Post</h1>

      {/* Título */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Título</label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>

      {/* Slug */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Slug</label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
        />
      </div>

      {/* Categoria e Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Categoria</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={post.category || ""}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Data de Publicação</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={post.published_at.split("T")[0]}
            onChange={(e) =>
              setPost({ ...post, published_at: new Date(e.target.value).toISOString() })
            }
          />
        </div>
      </div>

      {/* Imagem de Capa */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">URL da Imagem de Capa</label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={post.cover_image_url || ""}
          onChange={(e) => setPost({ ...post, cover_image_url: e.target.value })}
        />
      </div>

      {/* Conteúdo */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Conteúdo</label>
        <textarea
          className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-50 resize-none"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
      </div>

      {/* Botões */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          {saving ? "A salvar..." : "Salvar"}
        </button>
        <button
          onClick={() => router.push("/dashboard/blog")}
          className="border border-gray-300 px-6 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
