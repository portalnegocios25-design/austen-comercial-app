"use client";
import OrderCard from "./OrderCard";
import { STATUS } from "../lib/orderStatus";

const FILTROS = ["Todos", "A transmitir", "Transmitidos", "Rascunhos"];
const PERIODOS = ["Hoje", "7 dias", "30 dias", "Tudo"];

const pertenceFiltro = (pedido, filtro) => {
  if (filtro === "A transmitir")
    return [STATUS.A_TRANSMITIR, STATUS.ENVIANDO, STATUS.ERRO_TRANSMISSAO].includes(
      pedido.status,
    );
  if (filtro === "Transmitidos")
    return [STATUS.TRANSMITIDO, STATUS.RECEBIDO, STATUS.FATURADO].includes(
      pedido.status,
    );
  if (filtro === "Rascunhos") return pedido.status === STATUS.RASCUNHO;
  return true;
};

export default function Orders({
  pedidos,
  filtro,
  onFiltroChange,
  busca,
  onBuscaChange,
  periodo,
  onPeriodoChange,
  onAbrirDetalhe,
  onNovoAtendimento,
}) {
  const visiveis = pedidos
    .filter((p) => pertenceFiltro(p, filtro))
    .filter((p) =>
      (p.cliente + " " + p.numero).toLowerCase().includes(busca.toLowerCase()),
    );

  return (
    <section className="ordersScreen">
      <div className="title">
        <div>
          <small>PEDIDOS</small>
          <h2>Pedidos</h2>
          <p>Seus atendimentos e pedidos gerados.</p>
        </div>
        <button className="primary" onClick={onNovoAtendimento}>
          + Novo atendimento
        </button>
      </div>
      <div className="chipRow">
        {FILTROS.map((f) => {
          const count = pedidos.filter((p) => pertenceFiltro(p, f)).length;
          return (
            <button
              key={f}
              className={"chip " + (filtro === f ? "on" : "")}
              onClick={() => onFiltroChange(f)}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>
      <div className="wizardFilters">
        <input
          className="catalogSearch"
          placeholder="Buscar por cliente ou nº do pedido..."
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
        <div className="chipRow">
          {PERIODOS.map((p) => (
            <button
              key={p}
              className={"chip " + (periodo === p ? "on" : "")}
              onClick={() => onPeriodoChange(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="ordersList">
        {visiveis.map((p) => (
          <OrderCard key={p.id} pedido={p} onClick={() => onAbrirDetalhe(p.id)} />
        ))}
        {visiveis.length === 0 && (
          <div className="empty">Nenhum pedido encontrado.</div>
        )}
      </div>
    </section>
  );
}
