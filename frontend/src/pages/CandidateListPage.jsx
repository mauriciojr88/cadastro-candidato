import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/apiClient';
import CandidateFilters from '../components/CandidateFilters';
import Pagination from '../components/Pagination';

async function fetchCandidates({ page, q, cidade, uf }) {
  const params = { page };
  if (q) params.q = q;
  if (cidade) params.cidade = cidade;
  if (uf) params.uf = uf;

  const response = await api.get('/candidates', { params });
  return response.data;
}

export default function CandidateListPage() {
  const [filters, setFilters] = useState({
    q: '',
    cidade: '',
    uf: ''
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const query = useQuery({
    queryKey: ['candidates', page, debouncedFilters],
    queryFn: () => fetchCandidates({ page, ...debouncedFilters })
  });

  function handleFiltersChange(newFilters) {
    setFilters(newFilters);
    setPage(1);
  }

  if (query.isLoading) {
    return <p>Carregando...</p>;
  }

  if (query.isError) {
    return <p>Erro ao carregar candidatos</p>;
  }

  const { data } = query;

  return (
    <div>
      <h1>Candidatos</h1>
      <CandidateFilters filters={filters} onChange={handleFiltersChange} />
      
      {data.data.length === 0 ? (
        <p>Nenhum candidato encontrado</p>
      ) : (
        <>
          <table border="1" cellPadding="4">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>Criado em</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.cidade}</td>
                  <td>{c.uf}</td>
                  <td>{new Date(c.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
