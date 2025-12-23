import { supabase } from "@/lib/supabase";

type HeroSectionData = {
  id: number;
  subtitle: string | null;
  title: string | null;
  description: string | null;
  button_text: string | null;
  button_link: string | null;
  image_url: string | null;
};

async function getHeroSection(): Promise<HeroSectionData | null> {
  const { data, error } = await supabase
    .from("hero_section")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Erro ao buscar hero_section:", error);
    return null;
  }

  return data;
}

export default async function HeroSection() {
  const hero = await getHeroSection();

  if (!hero) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row align-items-center g-4 gx-5">
          <div className="col-lg-6">
            <div className="relative">
              {hero.subtitle && (
                <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
                  {hero.subtitle}
                </div>
              )}

              {hero.title && (
                <h1 className="lh-1 wow fadeInUp" data-wow-delay=".4s">
                  {hero.title}
                </h1>
              )}
            </div>

            {hero.description && (
              <p className="lead wow fadeInUp" data-wow-delay=".5s">
                {hero.description}
              </p>
            )}

            <div className="spacer-10" />

            {hero.button_text && hero.button_link && (
              <a
                href={hero.button_link}
                className="w-150px btn-line wow fadeIn"
                data-wow-delay=".6s"
              >
                {hero.button_text}
              </a>
            )}
          </div>

          <div className="col-lg-6">
            {hero.image_url && (
              <img
                src={hero.image_url}
                alt="Hero"
                className="w-100 wow fadeInUp"
                data-wow-delay=".6s"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
