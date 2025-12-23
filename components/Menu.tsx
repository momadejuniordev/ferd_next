"use client";

export default function Menu() {
  return (
      <div id="wrapper">
        <div className="float-text show-on-scroll">
            <span><a href="#">Scroll to top</a></span>
        </div>
        <div className="scrollbar-v show-on-scroll"></div>
        
      
        <div id="de-loader"></div>
      

        <div className="section-dark no-bottom no-top" id="content">

            <div id="top"></div>

            <section className="no-top">

                <div className="text-fit-wrapper">
                    <h1 className="text-fit wow" style={{
                wordBreak: "break-word",
                width: "100%",
                textAlign: "left",
                visibility: "visible",
                fontSize: "295px",
              }}>Simango</h1>
                    <div className="d-menu-1 wow" data-wow-delay=".3s">
                        <ul>
                            <li className="active"><a href="/">Home</a></li>
                            <li><a href="/about">About Me</a></li>
                            <li><a href="/services">What I Do</a></li>
                            <li><a href="/works">Works</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/contact">Hire Me</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
      </div>
  );
}
