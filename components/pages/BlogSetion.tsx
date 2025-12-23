import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  category: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

async function getBlogPosts(limit: number = 6): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erro ao buscar blog_posts:", error);
    return [];
  }

  return data;
}

const BlogSection = async () => {
  const posts = await getBlogPosts(6);

  if (!posts.length) return null;

  return (
    <section className="no-top">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-2">
            <div className="subtitle ms-3 wow fadeInUp" data-wow-delay=".3s">
              From the Blog
            </div>
          </div>
          <div className="col-lg-10 wow fadeInUp" data-wow-delay=".4s">
            <div className="row g-4">
              {posts.map((post) => (
                <div key={post.id} className="col-lg-6">
                  <div className="relative">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm-3">
                        {post.cover_image_url && (
                          <div className="post-image">
                            <img
                              alt={post.title}
                              src={post.cover_image_url}
                              className="lazy"
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-sm-9">
                        <div className="mb-2">
                          {post.category && (
                            <div className="d-inline fs-14 fw-bold me-3">
                              <i className="icofont-tag id-color me-2" />
                              {post.category}
                            </div>
                          )}
                          {post.published_at && (
                            <div className="d-inline fs-14 fw-600">
                              <i className="icofont-ui-calendar id-color me-2" />
                              {new Date(post.published_at).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          )}
                        </div>
                        <h4>
                          <a className="text-black" href={`/blog/${post.slug}`}>{post.title}</a>
                        </h4>
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
};

export default BlogSection;


