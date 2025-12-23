"use client";

export default function HeroSection() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row align-items-center g-4 gx-5">
          <div className="col-lg-6">
            <div className="relative">
              <div className="subtitle wow fadeInUp" data-wow-delay=".3s">
                Available for Work
              </div>
              <h1 className="lh-1 wow fadeInUp" data-wow-delay=".4s">
                A Website Designer from New York
              </h1>
            </div>
            <p className="lead wow fadeInUp" data-wow-delay=".5s">
              My journey into web design started with a love for both art and technology, which led me to pursue a career where I could blend these interests seamlessly.
            </p>
            <div className="spacer-10"></div>
            <a className="w-150px btn-line wow fadeIn" data-wow-delay=".6s" href="/about">
              About Me
            </a>
          </div>
          <div className="col-lg-6">
            <img src="/images/misc/1.webp" className="w-100 wow fadeInUp" data-wow-delay=".6s" alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
