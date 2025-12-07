export default function Pagination({ page, totalPages, onChange }) {
  function prev() {
    if (page > 1) onChange(page - 1);
  }

  function next() {
    if (page < totalPages) onChange(page + 1);
  }

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={prev} disabled={page === 1}>
        Anterior
      </button>
      <span style={{ margin: '0 8px' }}>
        Página {page} de {totalPages}
      </span>
      <button onClick={next} disabled={page === totalPages}>
        Próxima
      </button>
    </div>
  );
}
