"use client";

export default function ProjectsTable({ projects, onEdit, onDelete }: any) {
  return (
    <table className="table text-black">
      <thead>
        <tr>
          <th>Título</th>
          <th>Categoria</th>
          <th>Ano</th>
          <th>Cliente</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p: any) => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>{p.category}</td>
            <td>{p.year}</td>
            <td>{p.client}</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onEdit(p)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(p.id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
