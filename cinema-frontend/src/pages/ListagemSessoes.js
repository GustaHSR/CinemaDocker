import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSessoes, deleteSessao } from '../services/api';

function ListagemSessoes() {
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessoes() {
      try {
        const data = await getSessoes();
        setSessoes(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
        setLoading(false);
      }
    }
    fetchSessoes();
  }, []);

  const excluirSessao = async (sessaoid) => {
    try {
      await deleteSessao(sessaoid);
      alert('Sessao excluida com sucesso!');

      const data = await getSessoes();
      setSessoes(data);
    } catch (error) {
      console.error('Falha ao excluir sessao:', error);
      alert("Falha ao excluir sessao!");
    }
  };


  return (
    <div>
      <h1 className="title">Sessões Disponíveis</h1>
      {loading ? (
        <div className="loading"></div>
      ) : sessoes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎬</div>
          <div className="empty-state-title">Nenhuma sessão cadastrada.</div>
        </div>
      ) : (
        sessoes.map((s, i) => (
          <div key={i} className="session-card animate-slide-up">
            <div className="session-header">
              <div className="session-title">{s.filme.titulo}</div>
              <div className="session-price">R$ {parseFloat(s.preco).toFixed(2)}</div>
            </div>
            <div className="session-details">
              <div className="session-detail"><strong>Sala:</strong> {s.sala.nome}</div>
              <div className="session-detail"><strong>Data:</strong> {new Date(s.dataHora).toLocaleString()}</div>
              <div className="session-detail"><strong>Idioma:</strong> {s.idioma}</div>
              <div className="session-detail"><strong>Formato:</strong> {s.formato}</div>
              <button type="button" className="btn btn-secondary" onClick={() => excluirSessao(s.id)}>Excluir Sessao</button>
            </div>
            <Link className="btn btn-secondary" to="/venda-ingressos">Comprar Ingresso</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default ListagemSessoes;