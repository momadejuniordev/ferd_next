import { supabase } from "@/lib/supabase";

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
          <div className="col-lg-4 wow fadeInRight" data-wow-delay=".3s">
            <div className="p-3 h-100 d-lg-block d-sm-none text-light jarallax">
              <img src="/images/misc/2.webp" className="jarallax-img" alt="What I Do" />
              <h3 className="abs-centered m-0">What I Do</h3>
            </div>
            <div className="subtitle d-lg-none d-sm-block">What I Do</div>
          </div>

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
