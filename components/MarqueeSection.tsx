"use client";

export default function MarqueeSection() {
  return (
    <section className="text-dark no-top">
      <div className="wow fadeInRight d-flex">
        <div className="de-marquee-list wow">
          <div className="d-item">
            {["CUSTOM WEBSITE DESIGN","E-COMMERCE WEBSITE","LANDING PAGE DESIGN","FRONT-END DEVELOPMENT","BACK-END DEVELOPMENT","CONTENT MANAGEMENT SYSTEM"].map((text, index) => (
              <span key={index} className="d-item-txt">{text}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
