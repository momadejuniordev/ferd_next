"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  overview: string | null;
  objectives: string[] | null;
  category: string | null;
  awards: string | null;
  client: string | null;
  year: string | null;
  images: string[] | null;
  client_says_text: string | null;
  client_says_name: string | null;
};

export default function WorkSinglePage() {
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) {
        setProject(data);
      } else {
        console.error("Error loading project:", error.message);
      }

      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5">
        <h4>Loading project...</h4>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-5">
        <h2>Project not found</h2>
      </div>
    );
  }

  return (
    <div id="content" className="no-bottom no-top">
      <div id="top" />

      {/* Title */}
      <section className="no-top">
        <div className="text-fit-wrapper">
        </div>
      </section>

      {/* Project Details */}
      <section className="no-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-2">
              <div className="subtitle wow fadeInUp">
                Project Details
              </div>
            </div>

            <div className="col-lg-10">
              <div className="row g-4 gx-5 wow fadeInUp">
                <div className="col-sm-6">
                  <h4>Overview</h4>
                  <p className="no-bottom">
                    {project.overview || "No overview available."}
                  </p>
                </div>

                <div className="col-sm-6">
                  <h4>Objectives</h4>
                  <ul className="ul-style-2">
                    {project.objectives?.map((item, index) => (
                      <li key={index}>{item}</li>
                    )) || <li>No objectives defined.</li>}
                  </ul>
                </div>
              </div>

              <div className="spacer-double" />

              <div className="row g-4 gx-5 wow fadeInUp">
                <div className="col-lg-3 col-sm-6">
                  <h6>Category</h6>
                  {project.category || "-"}
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h6>Awards</h6>
                  {project.awards || "-"}
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h6>Client</h6>
                  {project.client || "-"}
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h6>Year</h6>
                  {project.year || "-"}
                </div>
              </div>

              <div className="spacer-double" />

              {/* Gallery */}
              <div className="row g-4 wow fadeInUp">
                {project.images?.map((img, index) => (
                  <div className="col-lg-6" key={index}>
                    <div className="hover relative overflow-hidden text-light">
                      <a
                        href={img}
                        className="image-popup overflow-hidden d-block relative"
                      >
                        <img
                          src={img}
                          className="img-fluid hover-scale-1-2"
                          alt={project.title}
                        />
                        <div className="absolute bottom-0 w-100 p-4 d-flex justify-content-between">
                          <div className="d-tag-s2">
                            {project.category}
                          </div>
                          <div className="fw-bold text-uppercase">
                            {project.client}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Says */}
      {project.client_says_text && (
        <section className="no-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="subtitle wow fadeInUp">
                  Client Says
                </div>
              </div>
              <div className="col-lg-10 wow fadeInUp">
                <h2 className="lh-1">
                  {project.client_says_text}
                </h2>
                <p>{project.client_says_name}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
