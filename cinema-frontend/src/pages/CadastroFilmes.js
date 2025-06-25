import React, { useState, useEffect } from 'react';
import { getFilmes, createFilme, deleteFilme} from '../services/api';

function CadastroFilmes() {
  const [filme, setFilme] = useState({
    titulo: '',
    descricao: '',
    genero: '',
    classificacaoIndicativa: '',
    duracao: '',
    dataEstreia: '',
  });
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const data = await getFilmes();
        setFilmes(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setLoading(false);
      }
    }
    fetchFilmes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilme({ ...filme, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFilme(filme);
      alert('Filme cadastrado com sucesso!');
      setFilme({
        titulo: '',
        descricao: '',
        genero: '',
        classificacaoIndicativa: '',
        duracao: '',
        dataEstreia: '',
      });
      // Atualiza a lista de filmes após o cadastro
      const data = await getFilmes();
      setFilmes(data);
    } catch (error) {
      console.error("Erro ao cadastrar filme:", error);
      alert('Falha ao cadastrar filme.');
    }
  };

  const excluirFilme = async (id) => {
    try {
      await deleteFilme(id);
      alert('Filme excluido com sucesso!');

      const data = await getFilmes();
      setFilmes(data);
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
      alert('Falha ao excluir filme.')
    }
  };

  return (
    <div>
      <div className="form">
        <h1 className="title">Cadastro de Filmes</h1>
        <form onSubmit={handleSubmit}>
          {/* ... (o resto do seu formulário continua igual) ... */}
          <div className="form-group">
            <label className="form-label">Título</label>
            <input className="form-input" name="titulo" value={filme.titulo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea className="form-textarea" name="descricao" value={filme.descricao} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Gênero</label>
              <select className="form-select" name="genero" value={filme.genero} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option>Ação</option>
                <option>Comédia</option>
                <option>Drama</option>
                <option>Terror</option>
                <option>Ficção</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Classificação</label>
              <select className="form-select" name="classificacaoIndicativa" value={filme.classificacaoIndicativa} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option>Livre</option>
                <option>10</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Duração (min)</label>
              <input type="number" className="form-input" name="duracao" value={filme.duracao} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Data de Estreia</label>
              <input type="date" className="form-input" name="dataEstreia" value={filme.dataEstreia} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Salvar Filme</button>
        </form>
      </div>

      <div className="item-list">
        <h2 className="section-title">Filmes Cadastrados</h2>
        {loading ? <p>Carregando filmes...</p> : filmes.map((f, i) => (
          <div key={i} className="item"> 
            <div className="item-title">{f.titulo}</div>
            <div className="item-meta">{f.genero} | {f.duracao} min</div>
            <button type="button" className="btn btn-secondary" onClick={() => excluirFilme(f.id)}>Excluir Filme</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CadastroFilmes;