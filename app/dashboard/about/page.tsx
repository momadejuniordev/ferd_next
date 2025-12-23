"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/* ---------------- TYPES ---------------- */

type Experience = {
  year_range: string;
  company: string;
  role: string;
};

type Education = {
  year_range: string;
  degree: string;
  institution: string;
};

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

type AboutData = {
  subtitle: string | null;
  title: string | null;
  description_left: string | null;
  description_right: string | null;
  skills: string[] | null;
  management_skills: string[] | null;
  ia_tools: string[] | null;
  experiences: Experience[] | null;
  education: Education[] | null;
  testimonials: Testimonial[] | null;
};

/* ---------------- COMPONENT ---------------- */

export default function AboutDashboard() {
  const [data, setData] = useState<AboutData>({
    subtitle: "",
    title: "",
    description_left: "",
    description_right: "",
    skills: [],
    management_skills: [],
    ia_tools: [],
    experiences: [],
    education: [],
    testimonials: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("about_section").select("*").single();
      if (!error && data) setData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from("about_section").upsert(data);
    setSaving(false);
    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Dados atualizados com sucesso!");
  };

  if (loading) return <p>Carregando...</p>;

  /* ---------------- HELPER FUNCTIONS ---------------- */

  const updateArrayItem = <T,>(
    array: T[] | null,
    index: number,
    value: T
  ): T[] => {
    if (!array) return [value];
    const updated = [...array];
    updated[index] = value;
    return updated;
  };

  const removeArrayItem = <T,>(array: T[] | null, index: number): T[] => {
    if (!array) return [];
    return array.filter((_, i) => i !== index);
  };

  const addArrayItem = <T,>(array: T[] | null, value: T): T[] => {
    if (!array) return [value];
    return [...array, value];
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#f0f0f1] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Editar Seção About</h1>

      {/* Textos principais */}
      <div className="bg-white border rounded p-4 mb-6 space-y-4">
        <Field label="Subtítulo">
          <input
            value={data.subtitle ?? ""}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full border px-3 py-2"
          />
        </Field>
        <Field label="Título">
          <input
            value={data.title ?? ""}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full border px-3 py-2"
          />
        </Field>
        <Field label="Descrição esquerda">
          <textarea
            value={data.description_left ?? ""}
            onChange={(e) => setData({ ...data, description_left: e.target.value })}
            className="w-full border px-3 py-2 min-h-20"
          />
        </Field>
        <Field label="Descrição direita">
          <textarea
            value={data.description_right ?? ""}
            onChange={(e) => setData({ ...data, description_right: e.target.value })}
            className="w-full border px-3 py-2 min-h-20"
          />
        </Field>
      </div>

      {/* Skills / Management / IA Tools */}
      <ArrayField
        title="Skills"
        items={data.skills ?? []}
        onChange={(items) => setData({ ...data, skills: items })}
      />
      <ArrayField
        title="Management Skills"
        items={data.management_skills ?? []}
        onChange={(items) => setData({ ...data, management_skills: items })}
      />
      <ArrayField
        title="IA Tools"
        items={data.ia_tools ?? []}
        onChange={(items) => setData({ ...data, ia_tools: items })}
      />

      {/* Experiences */}
      <ComplexArrayField
        title="Experiências"
        items={data.experiences ?? []}
        keys={["year_range", "company", "role"]}
        onChange={(items) => setData({ ...data, experiences: items })}
      />

      {/* Education */}
      <ComplexArrayField
        title="Educação"
        items={data.education ?? []}
        keys={["year_range", "degree", "institution"]}
        onChange={(items) => setData({ ...data, education: items })}
      />

      {/* Testimonials */}
      <ComplexArrayField
        title="Depoimentos"
        items={data.testimonials ?? []}
        keys={["name", "role", "text"]}
        onChange={(items) => setData({ ...data, testimonials: items })}
      />

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {saving ? "Salvando..." : "Salvar tudo"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      {children}
    </div>
  );
}

function ArrayField({
  title,
  items,
  onChange,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const addItem = () => onChange([...items, ""]);
  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="bg-white border rounded p-4 mb-6">
      <h3 className="font-medium mb-3">{title}</h3>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            className="flex-1 border px-3 py-2"
          />
          <button
            onClick={() => removeItem(i)}
            className="bg-red-600 text-white px-3 rounded"
          >
            ✕
          </button>
        </div>
      ))}
      <button onClick={addItem} className="text-sm text-blue-600 hover:underline mt-2">
        + Adicionar
      </button>
    </div>
  );
}

function ComplexArrayField({
  title,
  items,
  keys,
  onChange,
}: {
  title: string;
  items: any[];
  keys: string[];
  onChange: (items: any[]) => void;
}) {
  const addItem = () => onChange([...items, Object.fromEntries(keys.map((k) => [k, ""]))]);
  const updateItem = (index: number, key: string, value: string) => {
    const updated = [...items];
    updated[index][key] = value;
    onChange(updated);
  };
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="bg-white border rounded p-4 mb-6">
      <h3 className="font-medium mb-3">{title}</h3>
      {items.map((item, i) => (
        <div key={i} className="mb-3 p-2 border rounded space-y-2">
          {keys.map((key) => (
            <input
              key={key}
              placeholder={key}
              value={item[key] ?? ""}
              onChange={(e) => updateItem(i, key, e.target.value)}
              className="w-full border px-3 py-2"
            />
          ))}
          <button
            onClick={() => removeItem(i)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            ✕ Remover
          </button>
        </div>
      ))}
      <button onClick={addItem} className="text-sm text-blue-600 hover:underline mt-2">
        + Adicionar {title}
      </button>
    </div>
  );
}
