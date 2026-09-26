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

const ultimos = (c) => {
  const mov = c.produtos.flatMap((p) =>
    p.compras.map((h) => ({ data: h[0], produto: p.nome, estoque: h[1], venda: h[2] })),
  );
  return mov.slice(0, 6);
};

export default function StartVisit({
  cliente: c,
  historicoVisitas,
  visitaAtiva,
  onVoltar,
  onIniciarAtendimento,
  onVerHistoricoCompleto,
  onAbrirCatalogo,
}) {
  const st = statusCliente(c);
  const pct = c.metaVenda
    ? Math.round(((c.vendaRealizada || 0) / c.metaVenda) * 100)
    : 0;
  const metaMix = c.metaMixCliente || 1;
  const mixAtual = c.produtos.length;
  const mixPct = Math.min(100, Math.round((mixAtual / metaMix) * 100));
  return (
    <section className="clientHistoryPage">
      <button className="backClients" onClick={onVoltar}>
        ‹ Voltar para clientes
      </button>
      <div className={"clientHistoryHero " + st.tipo}>
        <div>
          <small>CLIENTE</small>
          <h2>{c.nome}</h2>
          <p>
            {c.cidade} · {c.tipoCliente || c.canal || "Sem tipo"}
          </p>
          <p className="lastPurchaseInfo">Último atendimento há {c.dias} dias</p>
        </div>
        <div className="clientHeroActions">
          <span>{st.texto}</span>
          <button className="primary" onClick={onIniciarAtendimento}>
            {visitaAtiva ? "Continuar atendimento" : "Iniciar atendimento"}
          </button>
        </div>
      </div>
      <section className="sellerMix">
        <div>
          <small>META DE MIX DO CLIENTE</small>
          <h3>{c.nome}</h3>
          <p>
            {mixAtual} de {metaMix} produtos implantados · Meta de venda:{" "}
            {c.metaVenda || 0} un.
          </p>
        </div>
        <div className="mixScore">
          <b>{mixPct}%</b>
          <span>do mix atingido</span>
        </div>
        <div className="mixBar">
          <i style={{ width: mixPct + "%" }} />
        </div>
        {mixPct < 100 && (
          <button onClick={onAbrirCatalogo}>
            Implantar {metaMix - mixAtual} {metaMix - mixAtual === 1 ? "item" : "itens"}{" "}
            para atingir a meta
          </button>
        )}
      </section>
      <div className="clientHistoryKpis">
        <article>
          <span>Venda / meta</span>
          <b>
            {c.vendaRealizada || 0} / {c.metaVenda || 0}
          </b>
          <small>{pct}% atingido</small>
        </article>
        <article>
          <span>Mix</span>
          <b>
            {c.produtos.length} / {c.metaMixCliente || 0}
          </b>
          <small>produtos implantados</small>
        </article>
        <article>
          <span>Último atendimento</span>
          <b>{c.dias} dias</b>
          <small>desde a última visita</small>
        </article>
        <article>
          <span>Rupturas</span>
          <b>{c.produtos.filter((p) => p.estoque === 0).length}</b>
          <small>itens sem estoque</small>
        </article>
      </div>
      <div className="historyLayout">
        <article className="historyCard">
          <div className="goalTitle">
            <div>
              <small>HISTÓRICO DO CLIENTE</small>
              <h3>Últimos 6 atendimentos / vendas</h3>
            </div>
            <button className="historyLink" onClick={onVerHistoricoCompleto}>
              Ver histórico completo
            </button>
          </div>
          <div className="lastSix">
            {ultimos(c).length ? (
              ultimos(c).map((h, i) => (
                <div key={i}>
                  <span className="timelineDot" />
                  <div>
                    <strong>{h.data}</strong>
                    <small>{h.produto}</small>
                  </div>
                  <span>
                    Estoque <b>{h.estoque}</b>
                  </span>
                  <span>
                    Pedido <b>{h.venda}</b>
                  </span>
                </div>
              ))
            ) : (
              <div className="emptyHistory">Nenhum histórico registrado para este cliente.</div>
            )}
          </div>
          <div className="historySummary">
            <span>
              <b>{historicoVisitas.filter((v) => v.cliente === c.nome).length}</b> visitas
              registradas
            </span>
            <span>
              <b>{c.produtos.reduce((n, p) => n + p.compras.length, 0)}</b> movimentações
            </span>
            <span>
              <b>{c.produtos.length}</b> produtos acompanhados
            </span>
          </div>
        </article>
        <article className="historyCard">
          <small>SITUAÇÃO COMERCIAL</small>
          <h3>Meta e atendimento</h3>
          <div className="historyProgress">
            <div>
              <span>Meta de venda</span>
              <b>{pct}%</b>
            </div>
            <i>
              <em style={{ width: Math.min(100, pct) + "%" }} />
            </i>
          </div>
          <div className="historyNotes">
            <span>
              <b>{Math.max(0, (c.metaVenda || 0) - (c.vendaRealizada || 0))}</b> unidades
              para a meta
            </span>
            <span>
              <b>{Math.max(0, (c.metaMixCliente || 0) - c.produtos.length)}</b> produtos
              para meta de mix
            </span>
            <span>
              <b>{c.dias}</b> dias desde atendimento
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
