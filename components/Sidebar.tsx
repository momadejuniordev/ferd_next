"use client";

export default function Sidebar({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <aside className="sidebar">
      <h3>Dashboard</h3>
      <nav>
        <button onClick={() => onNavigate("home")}>Página Principal</button>
        <button onClick={() => onNavigate("projects")}>Projetos</button>
        <button onClick={() => onNavigate("works")}>Works</button>
        <button onClick={() => onNavigate("services")}>Services</button>
        <button onClick={() => onNavigate("about")}>About</button>
        <button onClick={() => onNavigate("blog")}>Blog</button>
        <button onClick={() => onNavigate("contact")}>Contact</button>
      </nav>
    </aside>
  );
}
