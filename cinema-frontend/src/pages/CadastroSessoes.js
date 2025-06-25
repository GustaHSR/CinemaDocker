import React, { useState, useEffect } from 'react';
import { getFilmes, getSalas, createSessao } from '../services/api';

function CadastroSessoes() {
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [sessao, setSessao] = useState({
    filme: '',
    sala: '',
    dataHora: '',
    preco: '',
    idioma: '',
    formato: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const filmesData = await getFilmes();
        const salasData = await getSalas();
        setFilmes(filmesData);
        setSalas(salasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessao({ ...sessao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSessao({
        filmeId: Number(sessao.filme), // CONVERTE PARA number
        salaId: Number(sessao.sala),   // CONVERTE PARA number
        dataHora: sessao.dataHora,
        preco: Number(sessao.preco),   // CONVERTE PARA number
        idioma: sessao.idioma,
        formato: sessao.formato
      });
      alert('Sessão cadastrada com sucesso!');
      setSessao({ filme: '', sala: '', dataHora: '', preco: '', idioma: '', formato: '' });
    } catch (error) {
      console.error("Erro ao cadastrar sessão:", error);
      alert('Falha ao cadastrar sessão.');
    }
  };


  return (
    <div className="form">
      <h1 className="title">Cadastro de Sessões</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (o resto do seu formulário continua igual) ... */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Filme</label>
              <select className="form-select" name="filme" value={sessao.filme} onChange={handleChange} required>
                <option value="">Selecione</option>
                {filmes.map((f) => (
                  <option key={f.id} value={f.id}>{f.titulo}</option>
                ))}
              </select>
          </div>
          <div className="form-group">
            <label className="form-label">Sala</label>
              <select className="form-select" name="sala" value={sessao.sala} onChange={handleChange} required>
                <option value="">Selecione</option>
                {salas.map((s) => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
              </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Data e Hora</label>
          <input type="datetime-local" className="form-input" name="dataHora" value={sessao.dataHora} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Preço</label>
          <input type="number" className="form-input" name="preco" value={sessao.preco} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Idioma</label>
            <select className="form-select" name="idioma" value={sessao.idioma} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option>Dublado</option>
              <option>Legendado</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Formato</label>
            <select className="form-select" name="formato" value={sessao.formato} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option>2D</option>
              <option>3D</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary">Salvar Sessão</button>
      </form>
    </div>
  );
}

export default CadastroSessoes;