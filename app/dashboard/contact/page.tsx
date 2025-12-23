// app/dashboard/contact/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

export default function ContactDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setMessages(data || []);

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja apagar esta mensagem?")) return;

    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) alert("Erro ao apagar: " + error.message);
    else fetchMessages();
  };

  if (loading) return <p>Carregando mensagens...</p>;
  if (!messages.length) return <p>Nenhuma mensagem recebida.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Mensagens de Contacto</h1>

      {messages.map((msg) => (
        <div key={msg.id} className="mb-4 p-4 bg-white rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <div>
              <span className="font-semibold">Nome:</span> {msg.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {msg.email}
            </div>
            <div>
              <span className="font-semibold">Telefone:</span> {msg.phone}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mensagem:</span>
            <p className="bg-gray-100 p-2 rounded mt-1">{msg.message}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {new Date(msg.created_at).toLocaleString()}
            </span>
            <button
              onClick={() => handleDelete(msg.id)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Apagar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
