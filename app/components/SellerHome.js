"use client";

export default function SellerHome({
  vendedorNome,
  clientesCarteira,
  visitasMes,
  vendasMes,
  visitaAtiva,
  clienteEmAtendimento,
  pedidosAbertos,
  onIniciarAtendimento,
  onNavigate,
}) {
  return (
    <section className="sellerHomeScreen">
      <div className="sellerHomeHead">
        <div>
          <small>AUSTEN COMERCIAL</small>
          <h2>{vendedorNome}</h2>
          <p>Vendedor</p>
        </div>
      </div>
      <div className="homeSummary">
        <article>
          <b>{clientesCarteira}</b>
          <span>Clientes na carteira</span>
        </article>
        <article>
          <b>{visitasMes}</b>
          <span>Visitas no mês</span>
        </article>
        <article>
          <b>{vendasMes}</b>
          <span>Vendas no mês</span>
        </article>
      </div>
      <button className="homeCardMain" onClick={onIniciarAtendimento}>
        <div>
          <strong>
            {visitaAtiva ? "Continuar atendimento" : "Iniciar atendimento"}
          </strong>
          <p>
            {visitaAtiva
              ? `Retomar atendimento de ${clienteEmAtendimento || "cliente"}.`
              : "Selecione um cliente e conte o estoque para gerar o pedido."}
          </p>
        </div>
        <span className="homeCardArrow">›</span>
      </button>
      <div className="homeCards">
        <button className="homeCard" onClick={() => onNavigate("Clientes")}>
          <strong>Clientes</strong>
          <span>Ver carteira e histórico</span>
        </button>
        <button className="homeCard" onClick={() => onNavigate("Produtos")}>
          <strong>Produtos</strong>
          <span>Catálogo Austen</span>
        </button>
        <button className="homeCard" onClick={() => onNavigate("Pedidos")}>
          <strong>Pedidos</strong>
          <span>{pedidosAbertos} a transmitir</span>
        </button>
        <button className="homeCard" onClick={onIniciarAtendimento}>
          <strong>Atendimentos em andamento</strong>
          <span>{visitaAtiva ? "1 em andamento" : "Nenhum agora"}</span>
        </button>
        <button className="homeCard" onClick={() => onNavigate("Visitas")}>
          <strong>Histórico de vendas</strong>
          <span>Ver visitas e movimentações</span>
        </button>
        <button className="homeCard" onClick={() => onNavigate("Metas")}>
          <strong>Metas e desempenho</strong>
          <span>Acompanhar metas</span>
        </button>
      </div>
    </section>
  );
}
