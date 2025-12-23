export default function AboutTestimonials() {
  const testimonials = [
    {
      name: "Evanildo Bambamba",
      position: "CEO da Bambas Microcrédito",
      img: "/images/testimonial/1.webp",
      text: `"Ferdinando é um profissional extremamente dedicado e criativo. Trabalhar com ele foi uma experiência transformadora."`,
    },
    {
      name: "Helton Mendes",
      position: "CEO da PROENG",
      img: "/images/testimonial/2.webp",
      text: `"A competência e a visão estratégica de Ferdinando fazem dele um parceiro confiável."`,
    },
    {
      name: "Etelvina Fátima Helena",
      position: "Empreendedora",
      img: "/images/testimonial/3.webp",
      text: `"Ferdinando entrega soluções criativas que superam expectativas."`,
    },
    {
      name: "Rui Aly",
      position: "Diretor Geral da Brand Masters",
      img: "/images/testimonial/4.webp",
      text: `"Ele alia criatividade à execução impecável, garantindo resultados consistentes."`,
    },
  ];

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle wow fadeInUp" data-wow-delay=".3s">O Que Dizem Sobre Mim</div>
          </div>
          <div className="col-lg-10">
            <div className="owl-3-cols-dots owl-carousel owl-theme wow fadeInUp" data-wow-delay=".4s">
              {testimonials.map((t, index) => (
                <div key={index} className="item">
                  <div className="de_testi s2">
                    <blockquote>
                      <div className="de_testi_by">
                        <img className="circle" alt={t.name} src={t.img} />
                        <div>{t.name}<span> {t.position}</span></div>
                      </div>
                      <p>{t.text}</p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
