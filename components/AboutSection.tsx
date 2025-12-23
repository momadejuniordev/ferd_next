"use client";

export default function AboutSection() {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">About Me</div>
          </div>
          <div className="col-lg-10">
            <h2 className="lh-1 wow fadeInUp" data-wow-delay=".4s">
              Transforming your vision into a dynamic web experience through meticulously crafted designs, intuitive user interfaces, and robust functionality.
            </h2>
            <div className="row g-4 wow fadeInUp" data-wow-delay=".5s">
              <div className="col-sm-6">
                <p>Hi there! I’m Nathan, a web designer with a passion for creating exceptional digital experiences. With over 15 years in the industry, I have skills in designing websites that are not only visually appealing but also functional and user-friendly.</p>
              </div>
              <div className="col-sm-6">
                <p>I specialize in crafting bespoke websites using the latest technologies and design trends, including HTML5, CSS3, JavaScript, and popular CMS platforms like WordPress, Joomla, and Shopify.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
