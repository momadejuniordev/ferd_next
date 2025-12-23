export default function AboutAI() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">Competências em Ferramentas de IA</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {["MidJourney", "Adobe Firefly", "Leonardo AI", "Runway ML", "Notion AI"].map((tool, index) => (
                <div key={index} className="col-md-4 wow fadeInRight" data-wow-delay={`.${4 + index}s`}>
                  <h3>{tool}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
