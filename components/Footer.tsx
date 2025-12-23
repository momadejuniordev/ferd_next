// components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container-fluid">
        <div className="px-2">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="d-menu-1 wow" data-wow-delay=".3s">
                <ul>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Twitter</a></li>
                  <li><a href="#">Instagram</a></li>
                </ul>
                <p className="no-bottom">
                  All Right Reserved
                  <br />
                  Template By Designesia
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-lg-end">
              <a href="/contact">
                <h2
                  className="fs-84 fw-800 pe-3 shuffle wow fadeInLeft"
                  data-wow-delay=".3s"
                >
                  Let's Talk
                </h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
