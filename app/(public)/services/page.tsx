"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: number;
  title: string;
  description: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, description")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Erro ao carregar serviços:", error);
      } else {
        setServices(data || []);
      }

      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div id="content" className="no-bottom no-top">
      <div id="top"></div>

      <section className="no-top">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8 offset-lg-2">
              <div className="row g-4">

                {loading && (
                  <div className="col-12 text-center">
                    <p>A carregar serviços...</p>
                  </div>
                )}

                {!loading && services.length === 0 && (
                  <div className="col-12 text-center">
                    <p>Nenhum serviço disponível.</p>
                  </div>
                )}

                {services.map((service, i) => (
                  <div
                    key={service.id}
                    className="col-lg-6 col-sm-6 wow fadeInUp"
                    data-wow-delay={`.${i + 3}s`}
                  >
                    <div className="relative">
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
