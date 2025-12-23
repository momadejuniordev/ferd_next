"use client";

export default function BlogSection() {
  const posts = [
    { title: "Mastering Modern Web Design: Trends and Techniques for 2024", image: "/images/blog/1.webp", date: "18 Mar 2025", category: "Tips & Tricks" },
    { title: "The Art of User Experience: Designing Websites That Delight", image: "/images/blog/2.webp", date: "18 Mar 2025", category: "Tips & Tricks" },
    { title: "Responsive Design Best Practices: Making Your Website Mobile-Friendly", image: "/images/blog/3.webp", date: "18 Mar 2025", category: "Tips & Tricks" },
    { title: "Typography in Web Design: Choosing Fonts That Make an Impact", image: "/images/blog/4.webp", date: "18 Mar 2025", category: "Tips & Tricks" },
    { title: "Web Design Mistakes to Avoid: Common Pitfalls and How to Fix Them", image: "/images/blog/5.webp", date: "18 Mar 2025", category: "Tips & Tricks" },
    { title: "Creating Accessible Websites: Why Inclusive Design Matters", image: "/images/blog/6.webp", date: "18 Mar 2025", category: "Tips & Tricks" },
  ];

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-2">
            <div className="subtitle ms-3 wow fadeInUp" data-wow-delay=".3s">From the Blog</div>
          </div>
          <div className="col-lg-10 wow fadeInUp" data-wow-delay=".4s">
            <div className="row g-4">
              {posts.map((post, i) => (
                <div className="col-lg-6" key={i}>
                  <div className="relative">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm-3">
                        <div className="post-image">
                          <img alt={post.title} src={post.image} className="lazy" />
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="mb-2">
                          <div className="d-inline fs-14 fw-bold me-3">
                            <i className="icofont-tag id-color me-2"></i>{post.category}
                          </div>
                          <div className="d-inline fs-14 fw-600">
                            <i className="icofont-ui-calendar id-color me-2"></i>{post.date}
                          </div>
                        </div>
                        <h4><a href="/blog">{post.title}</a></h4>
                      </div>
                    </div>
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
