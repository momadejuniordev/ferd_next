import Link from "next/link";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  cover_image_url?: string;
  published_at: string;
};

async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, category, cover_image_url, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div id="content" className="no-bottom no-top">
      <div id="top"></div>

      <section className="no-top">
        <div className="container">
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post.id} className="col-lg-6">
                <div className="relative">
                  <div className="row g-4 align-items-center">
                    <div className="col-sm-3">
                      <div className="post-image">
                        <img
                          src={post.cover_image_url || "/images/blog/default.webp"}
                          alt={post.title}
                          className="lazy img-fluid"
                        />
                      </div>
                    </div>

                    <div className="col-sm-9">
                      <div className="mb-2">
                        {post.category && (
                          <div className="d-inline fs-14 fw-bold me-3">
                            <i className="icofont-tag id-color me-2"></i>
                            {post.category}
                          </div>
                        )}
                        <div className="d-inline fs-14 fw-600">
                          <i className="icofont-ui-calendar id-color me-2"></i>
                          {new Date(post.published_at).toLocaleDateString("pt-PT", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      <h4>
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <p className="text-center">Nenhum artigo publicado ainda.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
