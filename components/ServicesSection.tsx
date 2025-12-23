"use client";

export default function ServicesSection() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4 wow fadeInRight" data-wow-delay=".3s">
            <div className="p-3 h-100 d-lg-block d-sm-none text-light jarallax">
              <img src="/images/misc/2.webp" className="jarallax-img" alt="" />
              <h3 className="abs-centered m-0">What I Do</h3>
            </div>
            <div className="subtitle d-lg-none d-sm-block">What I Do</div>
          </div>
          <div className="col-lg-8">
            <div className="row g-4">
              <div className="col-lg-6 col-sm-6 wow fadeInRight" data-wow-delay=".4s">
                <div className="relative">
                  <h4>Custom Website Design</h4>
                  <p>Tailored websites to match your brand's unique identity and goals.</p>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 wow fadeInRight" data-wow-delay=".5s">
                <div className="relative">
                  <h4>E-commerce Website</h4>
                  <p>Creating user-friendly online stores with secure payment gateways.</p>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 wow fadeInRight" data-wow-delay=".6s">
                <div className="relative">
                  <h4>Landing Page Design</h4>
                  <p>High-conversion landing pages for specific marketing campaigns.</p>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 wow fadeInRight" data-wow-delay=".7s">
                <div className="relative">
                  <h4>Front-end Development</h4>
                  <p>Implementing designs with clean and efficient code using HTML, CSS, JS.</p>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 wow fadeInRight" data-wow-delay=".8s">
                <div className="relative">
                  <h4>Back-end Development</h4>
                  <p>Building robust back-end systems using technologies like PHP and databases.</p>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 wow fadeInRight" data-wow-delay=".9s">
                <div className="relative">
                  <h4>Content Management System</h4>
                  <p>Integrating and customizing CMS platforms for easy content management.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
