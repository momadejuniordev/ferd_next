"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const USER_ID = "eb522b20-b2f2-44ff-adfa-c79db669b92a";
const BUCKET = "projects-images";

export default function ProjectForm({ editingProject, onFinish }: any) {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    objectives: "",
    category: "",
    year: "",
    client: "",
    awards: "",
    link: "",
    client_says_text: "",
    client_says_name: "",
    images: [] as string[],
  });

  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || "",
        overview: editingProject.overview || "",
        objectives: (editingProject.objectives || []).join(", "),
        category: editingProject.category || "",
        year: editingProject.year || "",
        client: editingProject.client || "",
        awards: editingProject.awards || "",
        link: editingProject.link || "",
        client_says_text: editingProject.client_says_text || "",
        client_says_name: editingProject.client_says_name || "",
        images: editingProject.images || [],
      });

      setExistingImages(editingProject.images || []);
    }
  }, [editingProject]);

  async function uploadImages() {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const filePath = `${USER_ID}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newImages = await uploadImages();
    const allImages = [...existingImages, ...newImages];

    const payload = {
      user_id: USER_ID,
      title: formData.title,
      overview: formData.overview,
      objectives: formData.objectives
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean),
      category: formData.category,
      year: formData.year,
      client: formData.client,
      awards: formData.awards || null,
      link: formData.link || null,
      client_says_text: formData.client_says_text || null,
      client_says_name: formData.client_says_name || null,
      images: allImages,
      image_url: allImages[0] || null,
    };

    if (editingProject?.id) {
      await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingProject.id);
    } else {
      await supabase.from("projects").insert([payload]);
    }

    onFinish();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-3"
        placeholder="Título"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <textarea
        className="form-control mb-3"
        placeholder="Resumo"
        value={formData.overview}
        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Objetivos (separados por vírgula)"
        value={formData.objectives}
        onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
      />

      <input
        type="file"
        multiple
        className="form-control mb-3"
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />

      {/* Preview imagens existentes */}
      {existingImages.length > 0 && (
        <div className="mb-3">
          {existingImages.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              style={{ width: 80, marginRight: 8, borderRadius: 6 }}
            />
          ))}
        </div>
      )}

      <button className="btn btn-primary">
        {editingProject ? "Atualizar Projeto" : "Publicar Projeto"}
      </button>
    </form>
  );
}
