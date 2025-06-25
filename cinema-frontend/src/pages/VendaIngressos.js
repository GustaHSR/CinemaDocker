import React, { useState, useEffect } from 'react';
import { getSessoes, createIngresso } from '../services/api';

function VendaIngressos() {
  const [sessoes, setSessoes] = useState([]);
  const [ingresso, setIngresso] = useState({
    sessaoId: '',
    nomeCliente: '',
    cpf: '',
    assento: '',
    tipoPagamento: '',
  });


  useEffect(() => {
    async function fetchSessoes() {
      try {
        const data = await getSessoes();
        setSessoes(data);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    }
    fetchSessoes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngresso({ ...ingresso, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIngresso({
        sessaoId: Number(ingresso.sessaoId),
        nomeCliente: ingresso.nomeCliente,
        cpf: ingresso.cpf,
        assento: ingresso.assento,
        tipoPagamento: ingresso.tipoPagamento
      });
      alert('Venda realizada com sucesso!');
      setIngresso({ sessao: '', cliente: '', cpf: '', assento: '', pagamento: '' });
    } catch (error) {
      console.error("Erro ao vender ingresso:", error);
      
      alert('Falha na venda do ingresso.');
    }
  };

  return (
    <div className="form">
      <h1 className="title">Venda de Ingressos</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Sessão</label>
            <select className="form-select" name="sessaoId" value={ingresso.sessaoId} onChange={handleChange} required>
              <option value="">Selecione</option>
              {sessoes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.filme.titulo} - {new Date(s.dataHora).toLocaleString()}
                </option>
              ))}
            </select>
        </div>
        <div className="form-group">
          <label className="form-label">Nome do Cliente</label>
          <input className="form-input" name="nomeCliente" value={ingresso.nomeCliente} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">CPF</label>
            <input className="form-input" name="cpf" value={ingresso.cpf} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Assento</label>
            <input className="form-input" name="assento" value={ingresso.assento} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Tipo de Pagamento</label>
          <select className="form-select" name="tipoPagamento" value={ingresso.tipoPagamento} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option>Cartão</option>
            <option>Pix</option>
            <option>Dinheiro</option>
          </select>
        </div>
        <button className="btn btn-primary">Confirmar Venda</button>
      </form>
    </div>
  );
}

export default VendaIngressos;