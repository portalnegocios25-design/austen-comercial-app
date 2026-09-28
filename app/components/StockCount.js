"use client";
import { useMemo, useState } from "react";
import QuantityInput from "./QuantityInput";

function IconBox(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
}

function IconBarChart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <rect x="6" y="12" width="3" height="9" rx="0.5" />
      <rect x="11" y="7" width="3" height="14" rx="0.5" />
      <rect x="16" y="3" width="3" height="18" rx="0.5" />
    </svg>
  );
}

function IconClipboard(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </svg>
  );
}

export default function StockCount({
  cliente,
  produtosGestao,
  contagem,
  onContagemChange,
  onApresentar,
  onAdicionarProduto,
  onVoltar,
  onProximo,
}) {
  const [indice, setIndice] = useState(0);

  const infoPorNome = useMemo(() => {
    const m = new Map();
    produtosGestao.forEach((p) => m.set(p.nome, p));
    return m;
  }, [produtosGestao]);

  const total = cliente.produtos.length;
  const produto = cliente.produtos[Math.min(indice, total - 1)];
  const info = produto ? infoPorNome.get(produto.nome) : null;

  if (!produto) {
    return (
      <section className="wizardScreen">
        <div className="stockPagerHead">
          <button className="stockPagerBack" onClick={onVoltar} aria-label="Voltar">
            ←
          </button>
          <div>
            <h2>Contagem de estoque</h2>
            <p>{cliente.nome}</p>
          </div>
          <button className="stockPagerAddBtn" onClick={onAdicionarProduto}>
            + Produto
          </button>
        </div>
        <div className="empty">Nenhum produto cadastrado para este cliente.</div>
      </section>
    );
  }

  const valor =
    contagem[produto.nome] === undefined || contagem[produto.nome] === ""
      ? undefined
      : +contagem[produto.nome];
  const atual = valor === undefined ? produto.estoque : valor;

  const avancar = () => {
    if (indice < total - 1) setIndice(indice + 1);
    else onProximo();
  };
  const voltar = () => {
    if (indice > 0) setIndice(indice - 1);
    else onVoltar();
  };

  return (
    <section className="wizardScreen stockPagerScreen">
      <div className="stockPagerHead">
        <button className="stockPagerBack" onClick={voltar} aria-label="Voltar">
          ←
        </button>
        <div>
          <h2>Contagem de estoque</h2>
          <p>{cliente.nome}</p>
        </div>
        <span className="stockPagerCount">
          {indice + 1} de {total}
        </span>
        <button className="stockPagerAddBtn" onClick={onAdicionarProduto}>
          + Produto
        </button>
      </div>
      <div className="stockPagerBar">
        <i style={{ width: ((indice + 1) / total) * 100 + "%" }} />
      </div>

      <article className="stockPagerCard">
        <button
          type="button"
          className="stockPagerThumb"
          onClick={() => onApresentar(produto)}
        >
          {info?.imagem ? (
            <img src={info.imagem} alt={produto.nome} />
          ) : (
            <div className="productImagePlaceholder">
              <span>IMG</span>
            </div>
          )}
        </button>
        <div className="stockPagerInfo">
          {(info?.familia || info?.linha) && (
            <span className="stockPagerChip">
              {(info.familia || info.linha).toUpperCase()}
            </span>
          )}
          <h3>{produto.nome}</h3>
          {produto.novo && (
            <span className="newProductTag">✨ Produto novo no cliente</span>
          )}
          {info?.unidades && <p>Pacote com {info.unidades} unidades</p>}
          {produto.compras.length > 0 && (
            <div className="stockPagerHistory">
              <span className="stockPagerHistoryHead">
                <IconBarChart /> Últimas {Math.min(3, produto.compras.length)}{" "}
                compras deste cliente
              </span>
              {produto.compras.slice(0, 3).map((c, i) => (
                <div key={i} className="stockPagerHistoryRow">
                  <span>{c[0]}</span>
                  <b>{c[2]} un</b>
                  <span>(estoque: {c[1]})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      <article className="stockPagerAsk">
        <div className="stockPagerAskHead">
          <span className="stockPagerAskIcon">
            <IconBox />
          </span>
          <div>
            <strong>Quanto tem hoje?</strong>
            <p>Conte o estoque físico deste produto no cliente.</p>
          </div>
        </div>
        <div className="stockPagerQty">
          <QuantityInput
            value={atual}
            onCommit={(n) => onContagemChange(produto.nome, n)}
            ariaLabel={"Estoque atual de " + produto.nome}
          />
        </div>
        <div className="stockPagerActions">
          <button
            type="button"
            className="stockPagerRuptura"
            onClick={() => onContagemChange(produto.nome, 0)}
          >
            0 — Ruptura
          </button>
          <button type="button" className="stockPagerSkip" onClick={avancar}>
            Pular produto ›
          </button>
          <button
            type="button"
            className="stockPagerDetails"
            onClick={() => onApresentar(produto)}
          >
            <IconClipboard /> Ver detalhes ›
          </button>
        </div>
      </article>

      <button type="button" className="stockPagerNext" onClick={avancar}>
        Salvar e próximo →
      </button>
    </section>
  );
}
