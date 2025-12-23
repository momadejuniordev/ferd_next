// components/Navbar.tsx
import React from "react";

export default function Navbar() {
  return (
    <div className="text-fit-wrapper mb-10">
     <div className="bg-white h-24"></div>
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
  );
}
