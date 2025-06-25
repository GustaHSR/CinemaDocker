
export async function getFilmes() {
  const res = await fetch(`/api//filmes`);
  return res.json();
}

export async function createFilme(filme) {
  const res = await fetch(`/api/filmes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme),
  });
  return res.json();
}

export async function deleteFilme(filmeid) {
  const res = await fetch(`/api/filmes/${filmeid}`, { 
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json(); 
    throw new Error(errorData.message || 'Falha ao deletar filme');
  }
}
export async function getSalas() {
  const res = await fetch(`/api/salas`);
  return res.json();
}

export async function createSala(sala) {
  const res = await fetch(`/api/salas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sala),
  });
  return res.json();
}

export async function deleteSala(salaid) {
  const res = await fetch(`/api/salas/${salaid}`, { 
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json(); 
    throw new Error(errorData.message || 'Falha ao deletar sala');
  }
}

export async function getSessoes() {
  const res = await fetch(`/api/sessoes`);
  return res.json();
}

export async function createSessao(sessao) {
  const res = await fetch(`/api/sessoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessao),
  });
  return res.json();
}

export async function deleteSessao(sessaoid) {
  const res = await fetch(`/api/sessoes/${sessaoid}`, { 
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json(); 
    throw new Error(errorData.message || 'Falha ao deletar sessão');
  }
}

export async function getIngressos() {
  const res = await fetch(`/api/ingressos`);
  return res.json();
}

export async function createIngresso(data) {
  const response = await fetch(`/api/ingressos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessaoId: Number(data.sessaoId),
      nomeCliente: data.nomeCliente,
      cpf: data.cpf,
      assento: data.assento,
      tipoPagamento: data.tipoPagamento,
    }),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar ingresso');
  }
  return response.json();
}

