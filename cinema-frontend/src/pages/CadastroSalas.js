import React, { useState, useEffect } from 'react';
import { getSalas, createSala, deleteSala } from '../services/api';


function CadastroSalas() {
  const [sala, setSala] = useState({
    nome: '',
    capacidade: '',
    tipo: '',
  });
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const data = await getSalas();
        setSalas(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
        setLoading(false);
      }
    }
    fetchSalas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSala({ ...sala, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSala(sala);
      alert('Sala cadastrada com sucesso!');
      setSala({ nome: '', capacidade: '', tipo: '' });
      const data = await getSalas();
      setSalas(data);
    } catch (error) {
      console.error("Erro ao cadastrar sala:", error);
      alert('Falha ao cadastrar sala.');
    }
  };

  const excluirSala = async (salaid) => {
    try {
      await deleteSala(salaid);
      alert('Sala deletada com sucesso!');
      const data = await getSalas();
      setSalas(data);
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      alert('Falha ao excluir sala');
    }
  };

  return (
    <div>
      <div className="form">
        <h1 className="title">Cadastro de Salas</h1>
        <form onSubmit={handleSubmit}>
          {/* ... (o resto do seu formulário continua igual) ... */}
          <div className="form-group">
            <label className="form-label">Nome da Sala</label>
            <input className="form-input" name="nome" value={sala.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Capacidade</label>
            <input type="number" className="form-input" name="capacidade" value={sala.capacidade} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo</label>
            <select className="form-select" name="tipo" value={sala.tipo} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option>2D</option>
              <option>3D</option>
              <option>IMAX</option>
            </select>
          </div>
          <button className="btn btn-primary">Salvar Sala</button>
        </form>
      </div>
      <div className="item-list">
        <h2 className="section-title">Salas Cadastradas</h2>
        {loading ? <p>Carregando salas...</p> : salas.map((s, i) => (
          <div key={i} className="item">
            <div className="item-title">{s.nome}</div>
            <div className="item-meta">Capacidade: {s.capacidade} | Tipo: {s.tipo}</div>
            <button type="button" className="btn btn-secondary" onClick={() => excluirSala(s.id)}>Excluir Sala</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CadastroSalas;