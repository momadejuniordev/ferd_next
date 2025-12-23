export default function AboutManagementSkills() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">Competências de Gestão</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {[
                "Liderança e Gestão de Pessoas",
                "Gestão de Negócios e Projetos",
                "Comunicação e Colaboração",
                "Adaptabilidade e Inovação",
                "Gestão de Tempo e Prioridades",
              ].map((skill, index) => (
                <div key={index} className="col-md-4 wow fadeInRight" data-wow-delay={`.${4 + index}s`}>
                  <h3>{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
