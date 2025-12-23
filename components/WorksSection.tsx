"use client";

export default function WorksSection() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4 gx-5">
          <div className="col-lg-2">
            <div className="subtitle ms-3 wow fadeInUp" data-wow-delay=".3s">Works</div>
          </div>
          <div className="col-lg-10 wow fadeInUp" data-wow-delay=".4s">
            <h2>Explore the projects below to see how I bring ideas to life through thoughtful design and meticulous execution.</h2>
          </div>
        </div>
        <div className="spacer-single"></div>
      </div>
      <div className="container">
        <div className="row g-4 wow fadeInRight" data-wow-delay=".5s">
          {[
            { title: "Adidas", image: "/images/works/1.webp", type: "E-COMMERCE WEBSITE", year: "2024" },
            { title: "WWF", image: "/images/works/2.webp", type: "CUSTOM WEBSITE DESIGN", year: "2023" },
            { title: "Honda", image: "/images/works/3.webp", type: "FRONT-END DEVELOPMENT", year: "2022" },
          ].map((work, index) => (
            <div className="col-lg-4" key={index}>
              <div className="hover relative overflow-hidden text-light">
                <a href="/works" className="overflow-hidden d-block relative">
                  <h2 className="fs-40 abs-centered z-index-1 hover-op-0">{work.title}</h2>
                  <img src={work.image} className="img-fluid hover-scale-1-2" alt={work.title} />
                  <div className="absolute bottom-0 w-100 p-4 d-flex text-white justify-content-between">
                    <div className="d-tag-s2">{work.type}</div>
                    <div className="fw-bold">{work.year}</div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
