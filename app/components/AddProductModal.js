"use client";

export default function AddProductModal({
  produtosGestao,
  cliente,
  busca,
  onBuscaChange,
  onApresentar,
  onContarEstoque,
  onAdicionarPedido,
  onRemover,
  onFechar,
}) {
  return (
    <div className="modalBack">
      <div className="modal catalogModal">
        <div className="title">
          <div>
            <small>CATÁLOGO AUSTEN</small>
            <h2>Adicionar produto</h2>
            <p>
              Busque um produto do catálogo Austen e adicione à contagem ou
              direto ao pedido, sem sair do atendimento.
            </p>
          </div>
          <button className="close" onClick={onFechar}>
            ×
          </button>
        </div>
        <input
          className="catalogSearch"
          placeholder="Buscar produto, marca ou linha..."
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
        <div className="catalogList">
          {produtosGestao
            .filter(
              (p) =>
                p.ativo &&
                (p.nome + " " + p.marca + " " + p.linha)
                  .toLowerCase()
                  .includes(busca.toLowerCase()),
            )
            .map((p) => {
              const noMix = cliente.produtos.find((x) => x.nome === p.nome);
              return (
                <article key={p.nome}>
                  <button
                    type="button"
                    className="catalogProductView"
                    onClick={() => onApresentar(p)}
                  >
                    {p.imagem ? (
                      <img src={p.imagem} alt={p.nome} />
                    ) : (
                      <span>IMG</span>
                    )}
                  </button>
                  <div>
                    <strong>{p.nome}</strong>
                    <small>
                      {p.marca} · {p.familia || p.linha}{" "}
                      {p.tamanho ? "· " + p.tamanho : ""}{" "}
                      {p.unidades ? "· " + p.unidades + " un." : ""}
                    </small>
                    {noMix?.novo && (
                      <span className="newProductTag">
                        ✨ Produto novo no cliente
                      </span>
                    )}
                  </div>
                  {noMix ? (
                    <div className="catalogActions">
                      <span>Já no mix</span>
                      <button onClick={() => onRemover(p.nome)}>Remover</button>
                    </div>
                  ) : (
                    <div className="catalogAddActions">
                      <button
                        className="secondary"
                        onClick={() => onContarEstoque(p)}
                      >
                        Contar estoque
                      </button>
                      <button
                        className="primary"
                        onClick={() => onAdicionarPedido(p)}
                      >
                        Adicionar ao pedido
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
        </div>
      </div>
    </div>
  );
}
