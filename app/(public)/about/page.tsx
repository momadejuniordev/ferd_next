"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/* ---------------- Types ---------------- */

type Experience = {
  year_range: string;
  company: string;
  role: string;
};

type Education = {
  year_range: string;
  degree: string;
  institution: string;
};

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

type AboutData = {
  subtitle: string | null;
  title: string | null;
  description_left: string | null;
  description_right: string | null;
  skills: string[] | null;
  management_skills: string[] | null;
  ia_tools: string[] | null;
  experiences: Experience[] | null;
  education: Education[] | null;
  testimonials: Testimonial[] | null;
};

/* ---------------- Page ---------------- */

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("about_section")
        .select("*")
        .single();

      if (!error) setData(data);
      else console.error(error);
    }

    loadData();
  }, []);

  if (!data) return null;

  return (
    <div id="wrapper">
      <div className="float-text">
        <span>
          <a href="#top">Scroll to top</a>
        </span>
      </div>

      <div className="scrollbar-v"></div>

      <div className="section-dark no-bottom no-top" id="content">
        <div id="top"></div>

        <AboutMeSection data={data} />
        <SkillsSection skills={data.skills} />
        <ManagementSkillsSection skills={data.management_skills} />
        <IASkillsSection tools={data.ia_tools} />
        <ExperienceSection experiences={data.experiences} />
        <EducationSection education={data.education} />
        <TestimonialsSection testimonials={data.testimonials} />
      </div>
    </div>
  );
}

/* ---------------- Sections ---------------- */

function AboutMeSection({ data }: { data: AboutData }) {
  return (
    <section className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="subtitle">{data.subtitle}</div>
          </div>

          <div className="col-lg-10">
            <h2 className="lh-1">{data.title}</h2>

            <div className="row g-4">
              <div className="col-sm-6">
                <p>{data.description_left}</p>
              </div>
              <div className="col-sm-6">
                <p>{data.description_right}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ skills }: { skills: string[] | null }) {
  if (!skills) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle">Competências</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {skills.map((skill, i) => (
                <div key={i} className="col-md-4">
                  <h3>{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManagementSkillsSection({ skills }: { skills: string[] | null }) {
  if (!skills) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle">Competências de Gestão</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {skills.map((skill, i) => (
                <div key={i} className="col-md-4">
                  <h3>{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IASkillsSection({ tools }: { tools: string[] | null }) {
  if (!tools) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle">Ferramentas de IA</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {tools.map((tool, i) => (
                <div key={i} className="col-md-4">
                  <h3>{tool}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ experiences }: { experiences: Experience[] | null }) {
  if (!experiences) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle">Experiência Profissional</div>
          </div>
          <div className="col-lg-10">
            {experiences.map((exp, i) => (
              <div key={i} className="mb-4">
                <h6>{exp.year_range}</h6>
                <h3>{exp.company}</h3>
                <p>{exp.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection({ education }: { education: Education[] | null }) {
  if (!education) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle">Formação Académica</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {education.map((edu, i) => (
                <div key={i} className="col-md-4">
                  <h6>{edu.year_range}</h6>
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[] | null;
}) {
  if (!testimonials) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="subtitle">O Que Dizem Sobre Mim</div>
          </div>
          <div className="col-lg-10">
            <div className="row g-4">
              {testimonials.map((t, i) => (
                <div key={i} className="col-md-6">
                  <h4>
                    {t.name} — {t.role}
                  </h4>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
