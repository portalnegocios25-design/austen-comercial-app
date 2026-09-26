"use client";

const statusCliente = (c) => {
  const pct = c.metaVenda
    ? Math.round(((c.vendaRealizada || 0) / c.metaVenda) * 100)
    : 0;
  if ((c.vendaRealizada || 0) === 0) return { tipo: "semVenda", texto: "Sem venda" };
  if (pct < 80) return { tipo: "abaixo", texto: "Abaixo da meta" };
  if (c.dias >= 7) return { tipo: "atrasado", texto: "Atendimento atrasado" };
  return { tipo: "ok", texto: "Em dia" };
};

export default function ClientList({ lista, busca, onBuscaChange, onSelecionar, onNovoCliente }) {
  return (
    <section className="clientListOnly">
      <div className="title">
        <div>
          <small>MINHA CARTEIRA</small>
          <h2>Clientes</h2>
          <p>Selecione um cliente para ver histórico e iniciar atendimento.</p>
        </div>
        <button className="primary" onClick={onNovoCliente}>
          + Novo cliente
        </button>
      </div>
      <div className="clientSearch">
        <input
          placeholder="Buscar por cliente, cidade ou tipo..."
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
      </div>
      <div className="customerDirectory">
        {lista.map((c) => {
          const st = statusCliente(c);
          const pct = c.metaVenda
            ? Math.round(((c.vendaRealizada || 0) / c.metaVenda) * 100)
            : 0;
          return (
            <button
              key={c.id}
              className={"customerLine " + st.tipo}
              onClick={() => onSelecionar(c)}
            >
              <div className="customerAvatar">{c.nome.slice(0, 2).toUpperCase()}</div>
              <div className="customerName">
                <strong>{c.nome}</strong>
                <small>
                  {c.cidade} · {c.tipoCliente || c.canal || "Sem tipo"}
                </small>
              </div>
              <div className="customerMeta">
                <span>Meta</span>
                <b>{pct}%</b>
              </div>
              <div className="customerVisit">
                <span>Último atendimento</span>
                <b>há {c.dias} dias</b>
              </div>
              <em>{st.texto}</em>
              <span className="chev">›</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
