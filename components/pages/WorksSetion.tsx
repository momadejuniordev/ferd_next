import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  image_url: string;
  category: string | null;
  year: string | null;
  slug: string | null;
};

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, image_url, category, year, slug")
    .order("id", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Erro ao buscar projects:", error);
    return [];
  }

  return data ?? [];
}

const WorkSection = async () => {
  const projects = await getProjects();

  if (!projects.length) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4 gx-5">
          <div className="col-lg-2">
            <div className="subtitle ms-3 wow fadeInUp" data-wow-delay=".3s">
              Works
            </div>
          </div>

          <div className="col-lg-10 wow fadeInUp" data-wow-delay=".4s">
            <h2>
              Explore the projects below to see how I bring ideas to life through thoughtful design and meticulous execution.
            </h2>
          </div>
        </div>

        <div className="spacer-single" />

        <div className="row g-4 wow fadeInRight" data-wow-delay=".5s">
          {projects.map((project) => (
            <div key={project.id} className="col-lg-4">
              <div className="hover relative overflow-hidden text-light">
                <a
                  href={project.slug ? `/projects/${project.slug}` : "/projects"}
                  className="overflow-hidden d-block relative"
                >
                  <h2 className="fs-40 abs-centered z-index-1 hover-op-0">
                    {project.title}
                  </h2>

                  <img
                    src={project.image_url}
                    className="img-fluid hover-scale-1-2"
                    alt={project.title}
                  />

                  <div className="absolute bottom-0 w-100 p-4 d-flex text-white justify-content-between">
                    {project.category && (
                      <div className="d-tag-s2">{project.category}</div>
                    )}
                    {project.year && (
                      <div className="fw-bold">{project.year}</div>
                    )}
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
