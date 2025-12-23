"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  category: string | null;
  year: string | null;
};

export default function DashboardWorks() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, slug, image_url, category, year")
      .not("slug", "is", null);

    if (error) {
      console.error("Erro ao buscar projetos:", error);
      setProjects([]);
    } else {
      setProjects(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Tem certeza que deseja apagar este projeto?");
    if (!confirm) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Erro ao apagar projeto: " + error.message);
    } else {
      setProjects(projects.filter((p) => p.id !== id));
      alert("Projeto apagado com sucesso!");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Projetos</h3>
        <Link
          href="/dashboard/works/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Projeto
        </Link>
      </div>

      {loading ? (
        <p>Carregando projetos...</p>
      ) : projects.length === 0 ? (
        <p>Nenhum projeto disponível.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded shadow hover:shadow-lg overflow-hidden"
            >
              <img
                src={project.image_url || "/images/default-project.webp"}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-gray-600">{project.category ?? "Sem categoria"}</p>
                <p className="font-semibold">{project.year ?? "-"}</p>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/dashboard/works/${project.id}`}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Editar
                  </Link>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(project.id)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
