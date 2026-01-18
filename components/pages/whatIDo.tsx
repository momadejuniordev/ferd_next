// components/WhatIDoCard.tsx
import { supabase } from "@/lib/supabase";

type WhatIDo = {
  id: number;
  title: string;
  image_url: string;
};

async function getWhatIDo(): Promise<WhatIDo | null> {
  const { data, error } = await supabase
    .from("what_i_do")
    .select("id, title, image_url")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Erro ao buscar What I Do:", error);
    return null;
  }

  return data;
}

const WhatIDoCard = async () => {
  const item = await getWhatIDo();

  if (!item) return null;

  return (
    <div className="col-lg-4 wow fadeInRight" data-wow-delay=".3s">
      <div className="p-3 h-100 d-lg-block d-sm-none text-light jarallax">
        {item.image_url && (
          <img
            src={item.image_url}
            className="jarallax-img"
            alt={item.title}
          />
        )}
        <h3 className="abs-centered m-0">{item.title}</h3>
      </div>
      <div className="subtitle d-lg-none d-sm-block">{item.title}</div>
    </div>
  );
};

export default WhatIDoCard;
