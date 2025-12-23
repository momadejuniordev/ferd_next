// components/Blog/BlogList.tsx
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  cover_image_url: string | null;
  published_at: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="row g-4">
      {posts.map((post) => (
        <div key={post.id} className="col-lg-6">
          <div className="relative">
            <div className="row g-4 align-items-center">
              <div className="col-sm-3">
                {post.cover_image_url && (
                  <div className="post-image">
                    <img src={post.cover_image_url} alt={post.title} />
                  </div>
                )}
              </div>
              <div className="col-sm-9">
                <div className="mb-2">
                  <div className="d-inline fs-14 fw-bold me-3">
                    <i className="icofont-tag text-white me-2"></i>
                    {post.category ?? "General"}
                  </div>
                  <div className="d-inline fs-14 fw-600">
                    <i className="icofont-ui-calendar text-white me-2"></i>
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                </div>
                <h4>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
