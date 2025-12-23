import Link from "next/link";

type Post = {
  title: string;
  slug: string;
  category: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

export default function BlogCard({ post }: { post: Post }) {
  return (
    <div className="col-lg-6">
      <div className="relative">
        <div className="row g-4 align-items-center">
          <div className="col-sm-3">
            <div className="post-image">
              <img
                src={post.cover_image_url ?? "/images/blog/placeholder.webp"}
                alt={post.title}
              />
            </div>
          </div>

          <div className="col-sm-9">
            <div className="mb-2">
              {post.category && (
                <div className="d-inline fs-14 fw-bold me-3">
                  <i className="icofont-tag text-white me-2"></i>
                  {post.category}
                </div>
              )}

              {post.published_at && (
                <div className="d-inline fs-14 fw-600">
                  <i className="icofont-ui-calendar text-white me-2"></i>
                  {new Date(post.published_at).toLocaleDateString("pt-PT")}
                </div>
              )}
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
  );
}
