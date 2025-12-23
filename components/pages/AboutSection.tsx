// components/AboutSection.tsx
import { supabase } from "@/lib/supabase";

type AboutSectionData = {
  id: number;
  subtitle: string | null;
  title: string | null;
  description_left: string | null;
  description_right: string | null;
};

async function getAboutSection(): Promise<AboutSectionData | null> {
  const { data, error } = await supabase
    .from("about_section")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Erro ao buscar about_section:", error);
    return null;
  }

  return data;
}

// ✅ Função async, obrigatória para Server Component com fetch
const AboutSection = async () => {
  const about = await getAboutSection();

  if (!about) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            {about.subtitle && (
              <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
                {about.subtitle}
              </div>
            )}
          </div>
          <div className="col-lg-10">
            {about.title && (
              <h2 className="lh-1 wow fadeInUp" data-wow-delay=".4s">
                {about.title}
              </h2>
            )}

            <div className="row g-4 wow fadeInUp" data-wow-delay=".5s">
              {about.description_left && (
                <div className="col-sm-6">
                  <p>{about.description_left}</p>
                </div>
              )}
              {about.description_right && (
                <div className="col-sm-6">
                  <p>{about.description_right}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
