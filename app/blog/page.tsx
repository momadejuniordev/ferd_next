import { supabase } from "@/lib/supabase";
import BlogList from "@/components/Blog/BlogList";

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, category, cover_image_url, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div id="wrapper">
      <div className="section-dark no-bottom no-top" id="content">
        <section className="no-top">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <BlogList posts={posts ?? []} />
              </div>
            </div>
          </div>
        </section>
        {/* Aqui você pode adicionar a Paginação depois */}
      </div>
    </div>
  );
}
