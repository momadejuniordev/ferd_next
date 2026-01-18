import { supabase } from "@/lib/supabase";
import WhatIDoCard from "./whatIDo";

type Service = {
  id: number;
  title: string | null;
  description: string | null;
};

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services_section")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar services_section:", error);
    return [];
  }

  return data;
}

// ✅ Função async para Server Component
const ServicesSection = async () => {
  const services = await getServices();

  if (!services.length) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-5">
          <WhatIDoCard/>

          <div className="col-lg-8">
            <div className="row g-4">
              {services.map((item, index) => (
                <div
                  key={item.id}
                  className="col-lg-6 col-sm-6 wow fadeInRight"
                  data-wow-delay={`.${index + 4}s`}
                >
                  <div className="relative">
                    {item.title && <h4>{item.title}</h4>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
