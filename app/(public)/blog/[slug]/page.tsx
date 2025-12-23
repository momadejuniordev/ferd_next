"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  title: string;
  slug: string;
  category: string | null;
  cover_image_url: string | null;
  published_at: string;
  content: string;
};

export default function BlogSinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "title, slug, category, cover_image_url, published_at, content"
        )
        .eq("slug", slug)
        .single();

      if (!error) {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container pt-100 text-center">
        <p>A carregar artigo…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container pt-100 text-center">
        <h2>Post não encontrado</h2>
      </div>
    );
  }

  return (
    <div id="content" className="no-bottom no-top">
      <div id="top"></div>

      {/* Header */}
      <section className="no-top">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="mb-2">
                {post.category && (
                  <div className="d-inline fs-14 fw-bold me-3">
                    <i className="icofont-tag id-color me-2" />
                    {post.category}
                  </div>
                )}
                <div className="d-inline fs-14 fw-600">
                  <i className="icofont-ui-calendar id-color me-2" />
                  {new Date(post.published_at).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <h2>{post.title}</h2>
            </div>

            <div className="col-lg-6">
              <img
                src={post.cover_image_url || "/images/blog/default.webp"}
                alt={post.title}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="no-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="blog-read">
                <div className="post-text">
                  {post.content
                    .split("\n")
                    .filter(Boolean)
                    .map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
