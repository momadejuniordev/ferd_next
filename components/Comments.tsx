import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Comment = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .then(({ data }) => setComments(data || []));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, data } = await supabase.from('blog_comments').insert([
      { post_id: postId, name, message, created_at: new Date() },
    ]);
    if (!error && data) setComments([...comments, data[0]]);
    setName('');
    setMessage('');
  };

  return (
    <div className="mt-5">
      <h4>Comments ({comments.length})</h4>
      {comments.map((c) => (
        <div key={c.id} className="mb-3">
          <strong>{c.name}:</strong> {c.message}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
