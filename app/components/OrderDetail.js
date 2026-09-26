"use client";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { STATUS } from "../lib/orderStatus";

export default function OrderDetail({
  pedido,
  onVoltar,
  onTransmitir,
  onEnviarCopia,
  onGerarPDF,
  onCompartilhar,
  onDuplicar,
  onCancelar,
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [verHistorico, setVerHistorico] = useState(false);

  if (verHistorico) {
    return (
      <section className="orderDetailScreen">
        <button className="backClients" onClick={() => setVerHistorico(false)}>
          ‹ Voltar para o pedido
        </button>
        <div className="title">
          <div>
            <small>{pedido.numero}</small>
            <h2>Histórico de transmissão</h2>
            <p>Acompanhamento do envio do pedido {pedido.numero}.</p>
          </div>
        </div>
        <div className="lastSix transmissionTimeline">
          {pedido.historicoTransmissao.map((h, i) => (
            <div key={i}>
              <span className="timelineDot" />
              <div>
                <strong>{h.evento}</strong>
                <small>{h.detalhe}</small>
              </div>
              <span>
                {h.data} {h.hora}
              </span>
            </div>
          ))}
        </div>
        <button className="secondary" onClick={() => setVerHistorico(false)}>
          ‹ Voltar para o pedido
        </button>
      </section>
    );
  }

  const acaoPrincipal = () => {
    if (pedido.status === STATUS.A_TRANSMITIR)
      return (
        <button className="primary" onClick={onTransmitir}>
          Transmitir pedido
        </button>
      );
    if (pedido.status === STATUS.ENVIANDO)
      return (
        <button className="primary" disabled>
          Transmitindo...
        </button>
      );
    if (pedido.status === STATUS.ERRO_TRANSMISSAO)
      return (
        <button className="primary danger" onClick={onTransmitir}>
          Tentar novamente
        </button>
      );
    if (pedido.status === STATUS.TRANSMITIDO)
      return (
        <button className="primary" onClick={onEnviarCopia}>
          Enviar cópia ao cliente
        </button>
      );
    return null;
  };

  return (
    <section className="orderDetailScreen">
      <div className="orderDetailTop">
        <button className="backClients" onClick={onVoltar}>
          ‹ Voltar para pedidos
        </button>
        <div className="orderDetailMenuWrap">
          <button className="menuDots" onClick={() => setMenuAberto((v) => !v)}>
            •••
          </button>
          {menuAberto && (
            <div className="orderMenu">
              <button onClick={onGerarPDF}>Gerar PDF</button>
              <button onClick={onCompartilhar}>Compartilhar</button>
              <button onClick={onDuplicar}>Duplicar pedido</button>
              <button onClick={() => setVerHistorico(true)}>
                Histórico da transmissão
              </button>
              {pedido.status !== STATUS.CANCELADO && (
                <button className="menuDanger" onClick={onCancelar}>
                  Cancelar pedido
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="title">
        <div>
          <small>DETALHE DO PEDIDO</small>
          <h2>{pedido.numero}</h2>
        </div>
        <StatusBadge status={pedido.status} kind="pedido" />
      </div>
      <div className="orderClientCard">
        <strong>{pedido.cliente}</strong>
        <small>{pedido.cidade}</small>
        <small>
          {pedido.data} {pedido.hora}
        </small>
      </div>
      <div className="orderDetailKpis">
        <article>
          <span>Itens</span>
          <b>{pedido.itens.length}</b>
        </article>
        <article>
          <span>Quantidade total</span>
          <b>{pedido.total}</b>
        </article>
        <article>
          <span>Valor total</span>
          <b>{pedido.valorTotal != null ? "Gs. " + pedido.valorTotal.toLocaleString("es-PY") : "—"}</b>
        </article>
      </div>
      <div className="orderItemsList">
        {pedido.itens.map((it) => (
          <div className="orderRow" key={it.nome}>
            <div>
              <strong>{it.nome}</strong>
            </div>
            <span>{it.pedido} un.</span>
          </div>
        ))}
      </div>
      {acaoPrincipal()}
    </section>
  );
}
