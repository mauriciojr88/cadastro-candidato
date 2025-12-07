import { useState } from 'react';
import api from '../api/apiClient';

export default function CandidateFormPage() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState('');

  function maskCep(value) {
    const onlyNumbers = value.replace(/\D/g, '');
    if (onlyNumbers.length <= 5) {
      return onlyNumbers;
    }
    return onlyNumbers.slice(0, 5) + '-' + onlyNumbers.slice(5, 8);
  }

  function handleCepChange(e) {
    const value = e.target.value;
    const masked = maskCep(value);
    setCep(masked);
  }

  async function handleBlurCep() {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;
    setLoadingCep(true);
    setMessage('');
    try {
      const response = await api.get(`/address/${cleanCep}`);
      setAddress({
        logradouro: response.data.logradouro || '',
        bairro: response.data.bairro || '',
        cidade: response.data.cidade || '',
        uf: response.data.uf || ''
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro ao buscar CEP');
    } finally {
      setLoadingCep(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    setCvFile(file || null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    if (!cvFile) {
      setMessage('Selecione um arquivo PDF');
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile);
    formData.append('cep', cep);
    formData.append('logradouro', address.logradouro);
    formData.append('bairro', address.bairro);
    formData.append('cidade', address.cidade);
    formData.append('uf', address.uf);

    setLoadingSubmit(true);
    try {
      await api.post('/candidates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Candidato cadastrado com sucesso');
      setCvFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro ao cadastrar candidato');
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <div>
      <h1>Novo Candidato</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>CEP</label>
          <input
            value={cep}
            onChange={handleCepChange}
            onBlur={handleBlurCep}
            placeholder="00000-000"
          />
          {loadingCep && <span>Buscando endereço...</span>}
        </div>
        <div>
          <label>Logradouro</label>
          <input
            value={address.logradouro}
            onChange={(e) =>
              setAddress((a) => ({ ...a, logradouro: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Bairro</label>
          <input
            value={address.bairro}
            onChange={(e) =>
              setAddress((a) => ({ ...a, bairro: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Cidade</label>
          <input
            value={address.cidade}
            onChange={(e) =>
              setAddress((a) => ({ ...a, cidade: e.target.value }))
            }
          />
        </div>
        <div>
          <label>UF</label>
          <input
            value={address.uf}
            maxLength={2}
            onChange={(e) =>
              setAddress((a) => ({ ...a, uf: e.target.value.toUpperCase() }))
            }
          />
        </div>
        <div>
          <label>Currículo (PDF)</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loadingSubmit}>
          {loadingSubmit ? 'Enviando...' : 'Salvar candidato'}
        </button>
      </form>
    </div>
  );
}
