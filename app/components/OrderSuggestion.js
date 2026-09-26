"use client";
import { useEffect, useMemo, useState } from "react";
import VisitStepper from "./VisitStepper";
import StatusBadge from "./StatusBadge";
import QuantityInput from "./QuantityInput";
import { calc } from "../lib/data";

const FILTROS = ["Todos", "Com sugestão", "Ruptura", "Estoque baixo", "Sem sugestão"];

export default function OrderSuggestion({
  cliente,
  contagem,
  produtosGestao,
  pedido,
  onPedidoChange,
  onSeedPedido,
  onApresentar,
  onVoltar,
  onProximo,
}) {
  const [filtro, setFiltro] = useState("Todos");

  // Pré-preenche a quantidade pedido com a sugestão do sistema, para que o
  // valor exibido em tela corresponda ao que de fato entra no pedido caso o
  // vendedor avance sem alterar manualmente.
  useEffect(() => {
    const seed = {};
    cliente.produtos.forEach((p) => {
      if (pedido[p.nome] === undefined) {
        const contado = contagem[p.nome];
        const estoqueAtual =
          contado === undefined || contado === "" ? p.estoque : +contado;
        seed[p.nome] = calc({ ...p, estoque: estoqueAtual }).sug;
      }
    });
    if (Object.keys(seed).length) onSeedPedido(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliente.id]);
  const infoPorNome = useMemo(() => {
    const m = new Map();
    produtosGestao.forEach((p) => m.set(p.nome, p));
    return m;
  }, [produtosGestao]);

  const linhas = cliente.produtos.map((p) => {
    const contado = contagem[p.nome];
    const estoqueAtual =
      contado === undefined || contado === "" ? p.estoque : +contado;
    const info = calc({ ...p, estoque: estoqueAtual });
    return { produto: p, estoqueAtual, info };
  });

  const passaFiltro = (l) => {
    if (filtro === "Com sugestão") return l.info.sug > 0;
    if (filtro === "Ruptura") return l.info.status === "Ruptura";
    if (filtro === "Estoque baixo") return l.info.status === "Atenção";
    if (filtro === "Sem sugestão") return l.info.sug === 0;
    return true;
  };

  const visiveis = linhas.filter(passaFiltro);

  const itensNoPedido = cliente.produtos.filter(
    (p) => +(pedido[p.nome] || 0) > 0,
  ).length;
  const qtdTotal = cliente.produtos.reduce(
    (s, p) => s + (+pedido[p.nome] || 0),
    0,
  );

  return (
    <section className="wizardScreen">
      <div className="title">
        <div>
          <small>ATENDIMENTO</small>
          <h2>Sugestão de Pedido</h2>
          <p>Revise as sugestões e ajuste as quantidades.</p>
        </div>
      </div>
      <VisitStepper etapa={2} />
      <div className="chipRow">
        {FILTROS.map((f) => (
          <button
            key={f}
            className={"chip " + (filtro === f ? "on" : "")}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="products">
        {visiveis.map(({ produto: p, estoqueAtual, info }) => (
          <article className="product suggestionCard" key={p.nome}>
            <button
              type="button"
              className="productShowcaseThumb"
              onClick={() => onApresentar(p)}
            >
              {infoPorNome.get(p.nome)?.imagem ? (
                <img
                  className="productThumbImg"
                  src={infoPorNome.get(p.nome).imagem}
                  alt={p.nome}
                />
              ) : (
                <div className="productImagePlaceholder">
                  <span>IMG</span>
                </div>
              )}
            </button>
            <div className="productHead">
              <div>
                <h3>{p.nome}</h3>
                <StatusBadge status={info.status} kind="estoque" />
              </div>
              <div className="numbers">
                <div>
                  <small>Estoque atual</small>
                  <b>{estoqueAtual}</b>
                </div>
                <div>
                  <small>Sugestão</small>
                  <b>+{info.sug}</b>
                </div>
              </div>
            </div>
            {p.compras.length > 0 && (
              <div className="lastPurchases">
                <small>Últimas {p.compras.length} compras</small>
                <ul>
                  {p.compras.slice(0, 3).map((c, i) => (
                    <li key={i}>
                      <span>{c[0]}</span>
                      <span>{c[2]} un.</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="numbers">
              <div>
                <small>Quantidade pedido</small>
                <QuantityInput
                  value={
                    pedido[p.nome] === undefined || pedido[p.nome] === ""
                      ? info.sug
                      : +pedido[p.nome]
                  }
                  onCommit={(n) => onPedidoChange(p.nome, n)}
                  ariaLabel={"Quantidade pedido de " + p.nome}
                />
              </div>
            </div>
          </article>
        ))}
        {visiveis.length === 0 && (
          <div className="empty">Nenhum produto neste filtro.</div>
        )}
      </div>
      <div className="wizardFooter">
        <div className="wizardFooterStats">
          <span>
            <b>{itensNoPedido}</b> itens no pedido
          </span>
          <span>
            <b>{qtdTotal}</b> quantidade total
          </span>
        </div>
        <div className="wizardFooterActions">
          <button className="secondary" onClick={onVoltar}>
            Voltar
          </button>
          <button className="primary" onClick={onProximo}>
            Revisar pedido
          </button>
        </div>
      </div>
    </section>
  );
}
