"use client";
import QuantityInput from "./QuantityInput";
import StatusBadge from "./StatusBadge";

const statusEstoque = (media, estoque) => {
  if (estoque === 0) return "Ruptura";
  if (media && estoque / media < 0.35) return "Atenção";
  return "Normal";
};

export default function ProductStockCard({
  produto,
  imagem,
  valor,
  onChange,
  onApresentar,
  allowDecimal = false,
}) {
  const media =
    produto.compras.reduce((s, x) => s + x[2], 0) / (produto.compras.length || 1);
  const atual = valor === undefined || valor === null ? produto.estoque : valor;
  const status = statusEstoque(media, atual);

  return (
    <article className="product stockCard">
      <button
        type="button"
        className="productShowcaseThumb"
        onClick={() => onApresentar(produto)}
      >
        {imagem ? (
          <img className="productThumbImg" src={imagem} alt={produto.nome} />
        ) : (
          <div className="productImagePlaceholder">
            <span>IMG</span>
          </div>
        )}
        <small>Toque para apresentar</small>
      </button>
      <div className="productHead">
        <div>
          <h3>{produto.nome}</h3>
          <StatusBadge status={status} kind="estoque" />
        </div>
      </div>
      {produto.compras.length > 0 && (
        <div className="lastPurchases">
          <small>Últimas {produto.compras.length} compras</small>
          <ul>
            {produto.compras.slice(0, 3).map((c, i) => (
              <li key={i}>
                <span>{c[0]}</span>
                <span>{c[2]} un.</span>
                <span>estoque encontrado: {c[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="numbers">
        <div>
          <small>Estoque atual</small>
          <QuantityInput
            value={atual}
            onCommit={(n) => onChange(produto.nome, n)}
            ariaLabel={"Estoque atual de " + produto.nome}
            allowDecimal={allowDecimal}
          />
        </div>
      </div>
    </article>
  );
}
