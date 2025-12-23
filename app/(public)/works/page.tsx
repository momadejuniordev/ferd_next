// app/works/page.tsx
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  category: string | null;
  year: string | null;
};

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug, image_url, category, year")
    .not("slug", "is", null);

  if (error) {
    console.error("Erro Supabase:", error);
    return [];
  }

  return data ?? [];
}

export default async function WorksPage() {
  const works = await getProjects();

  return (
    <div id="content" className="no-bottom no-top">
      <div id="top" />

      {/* Intro opcional */}
      <section className="no-top">
        <div className="container">
          <h1 className="text-center">Projetos</h1>
        </div>
      </section>

      <section className="no-top">
        <div className="container">
          <div className="row g-4">
            {works.map((work) => (
              <div key={work.id} className="col-lg-4 col-md-6">
                <div className="hover relative overflow-hidden text-light">
                  <Link
                    href={`/works/${work.slug}`}
                    className="d-block relative overflow-hidden"
                  >
                    <h2 className="fs-40 abs-centered z-index-1 hover-op-0">
                      {work.title}
                    </h2>

                    <img
                      src={work.image_url || "/images/default-project.webp"}
                      className="img-fluid hover-scale-1-2"
                      alt={work.title}
                    />

                    <div className="absolute bottom-0 w-100 p-4 d-flex justify-content-between text-black">
                      <div className="d-tag-s2">
                        {work.category ?? "Sem categoria"}
                      </div>
                      <div className="fw-bold">
                        {work.year ?? "-"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}

            {works.length === 0 && (
              <p className="text-center mt-5">
                Nenhum projeto disponível.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
