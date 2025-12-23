import { supabase } from "@/lib/supabase";

type Work = {
  id: number;
  name: string | null;
  year: number | null;
  type: string | null;
  image_url: string | null;
};

async function getWorks(): Promise<Work[]> {
  const { data, error } = await supabase
    .from("works_section")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro ao buscar works_section:", error);
    return [];
  }

  return data;
}

const WorksSection = async () => {
  const works = await getWorks();

  if (!works.length) return null;

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
          {works.map((work, index) => (
            <div key={work.id} className="col-lg-4">
              <div className="hover relative overflow-hidden text-light">
                <a href="/works" className="overflow-hidden d-block relative">
                  {work.name && (
                    <h2 className="fs-40 abs-centered z-index-1 hover-op-0">{work.name}</h2>
                  )}
                  {work.image_url && (
                    <img
                      src={work.image_url}
                      className="img-fluid hover-scale-1-2"
                      alt={work.name ?? "Work"}
                    />
                  )}
                  <div className="absolute bottom-0 w-100 p-4 d-flex text-white justify-content-between">
                    {work.type && <div className="d-tag-s2">{work.type}</div>}
                    {work.year && <div className="fw-bold">{work.year}</div>}
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

export default WorksSection;
