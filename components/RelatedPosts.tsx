import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  slug: string;
};

export default function RelatedPosts({ currentPostId }: { currentPostId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id,title,slug')
      .neq('id', currentPostId)
      .order('published_at', { ascending: false })
      .limit(5)
      .then(({ data }) => setPosts(data || []));
  }, [currentPostId]);

  return (
    <div className="mt-5">
      <h4>Related Posts</h4>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
