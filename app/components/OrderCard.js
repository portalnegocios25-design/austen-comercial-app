"use client";
import StatusBadge from "./StatusBadge";

export default function OrderCard({ pedido, onClick }) {
  return (
    <button className="orderCard" onClick={onClick}>
      <div className="orderCardTop">
        <strong>{pedido.numero}</strong>
        <StatusBadge status={pedido.status} kind="pedido" />
      </div>
      <div className="orderCardClient">
        <strong>{pedido.cliente}</strong>
        <small>{pedido.cidade}</small>
      </div>
      <div className="orderCardMeta">
        <span>
          {pedido.data} {pedido.hora}
        </span>
        <span>{pedido.itens.length} itens</span>
      </div>
      <div className="orderCardValor">
        {pedido.valorTotal != null ? (
          <b>Gs. {pedido.valorTotal.toLocaleString("es-PY")}</b>
        ) : (
          <b>{pedido.total} un.</b>
        )}
        <span className="chev">›</span>
      </div>
    </button>
  );
}
