"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover_image_url?: string;
  published_at: string;
};

export default function BlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) console.error(error);
    else setPosts(data || []);

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar este post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      alert("Erro ao apagar post: " + error.message);
      return;
    }
    fetchPosts();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#f0f0f1] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gerir Blog</h1>
        <button
          onClick={() => router.push("/dashboard/blog/new")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Novo Post
        </button>
      </div>

      {loading ? (
        <p>A carregar posts...</p>
      ) : posts.length === 0 ? (
        <p>Nenhum post disponível.</p>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between border-b p-4"
            >
              {/* Thumbnail */}
              <div className="flex items-center gap-4">
                <img
                  src={post.cover_image_url || "/images/blog/default.webp"}
                  alt={post.title}
                  className="w-20 h-16 object-cover rounded"
                />

                {/* Info */}
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(post.published_at).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {post.category && (
                    <span className="text-xs text-gray-500">{post.category}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/dashboard/blog/${post.id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
