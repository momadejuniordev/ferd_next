import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  overview: string;
  objectives: string[];
  category: string;
  awards: string;
  client: string;
  year: string;
  images: string[];
  client_says_text: string;
  client_says_name: string;
};

export default async function WorkSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single<Project>();

  if (error || !project) {
    throw new Error("Projeto não encontrado");
  }

  return (
    <div id="work-single">
      <div className="page-content">
        {/* Título */}

        {/* Detalhes */}
        <section className="no-top">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-2">
                <div className="subtitle">Detalhes do Projeto</div>
              </div>

              <div className="col-lg-10">
                <div className="row g-4 gx-5">
                  <div className="col-sm-6">
                    <h4>Resumo</h4>
                    <p className="no-bottom">
                      {project.overview || "Resumo não disponível."}
                    </p>
                  </div>

                  <div className="col-sm-6">
                    <h4>Objetivos</h4>
                    <ul className="ul-style-2">
                      {project.objectives?.length ? (
                        project.objectives.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))
                      ) : (
                        <li>Objetivos não fornecidos.</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="spacer-double"></div>

                <div className="row g-4 gx-5">
                  <div className="col-lg-3 col-sm-2">
                    <h6>Categoria</h6>
                    <span>{project.category || "N/A"}</span>
                  </div>
                  <div className="col-lg-3 col-sm-2">
                    <h6>Prêmios</h6>
                    <span>{project.awards || "N/A"}</span>
                  </div>
                  <div className="col-lg-3 col-sm-2">
                    <h6>Cliente</h6>
                    <span>{project.client || "N/A"}</span>
                  </div>
                  <div className="col-lg-3 col-sm-2">
                    <h6>Ano</h6>
                    <span>{project.year || "N/A"}</span>
                  </div>
                </div>

                <div className="spacer-double"></div>

                {/* Galeria */}
                <div className="row g-4">
                  {project.images?.length ? (
                    project.images.map((img, i) => (
                      <div key={i} className="col-lg-6">
                        <div className="hover relative overflow-hidden text-light">
                          <Image
                            src={img}
                            alt={project.title}
                            width={900}
                            height={600}
                            className="img-fluid hover-scale-1-2"
                          />
                          <div className="absolute bottom-0 w-100 p-4 d-flex text-white justify-content-between">
                            <div className="d-tag-s2">{project.category}</div>
                            <div className="fw-bold text-uppercase">
                              {project.client}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Imagens não disponíveis.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimento */}
        <section className="no-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="subtitle">Depoimento do Cliente</div>
              </div>
              <div className="col-lg-10">
                <h2 className="lh-1">
                  {project.client_says_text || "Sem depoimento."}
                </h2>
                <p>{project.client_says_name || "—"}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
