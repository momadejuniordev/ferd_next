export default function AboutSkills() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">Competências</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4 gx-5">
              <div className="col-md-6 wow fadeInRight" data-wow-delay=".4s">
                <div className="d-skills-bar">
                  <div className="d-bar">
                    <div className="d-skill" data-value="80%">
                      <div className="d-info"><span>Adobe Illustrator</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                    <div className="d-skill" data-value="70%">
                      <div className="d-info"><span>Adobe InDesign</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                    <div className="d-skill" data-value="82%">
                      <div className="d-info"><span>Adobe Photoshop</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                    <div className="d-skill" data-value="82%">
                      <div className="d-info"><span>Figma, Wix</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 wow fadeInRight" data-wow-delay=".5s">
                <div className="d-skills-bar">
                  <div className="d-bar">
                    <div className="d-skill" data-value="62%">
                      <div className="d-info"><span>Adobe Lightroom</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                    <div className="d-skill" data-value="90%">
                      <div className="d-info"><span>Adobe Premiere</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                    <div className="d-skill" data-value="85%">
                      <div className="d-info"><span>Adobe After Effects</span></div>
                      <div className="d-progress-line"><span className="d-fill-line"></span></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
