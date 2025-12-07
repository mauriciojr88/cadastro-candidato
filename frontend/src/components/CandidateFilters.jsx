export default function CandidateFilters({ filters, onChange }) {
  function handleChange(e) {
    onChange({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
      <input
        placeholder="Buscar por nome, email ou CV"
        name="q"
        value={filters.q}
        onChange={handleChange}
      />
      <input
        placeholder="Cidade"
        name="cidade"
        value={filters.cidade}
        onChange={handleChange}
      />
      <input
        placeholder="UF"
        name="uf"
        maxLength={2}
        value={filters.uf}
        onChange={handleChange}
      />
    </div>
  );
}
