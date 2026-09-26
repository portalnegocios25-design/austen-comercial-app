"use client";

export default function ProductCatalog({
  produtosGestao,
  cliente,
  busca,
  onBuscaChange,
  onApresentar,
  onImplantar,
  onRemover,
}) {
  return (
    <section className="productCatalogScreen">
      <div className="title">
        <div>
          <small>CATÁLOGO AUSTEN</small>
          <h2>Produtos</h2>
          <p>
            Consulte o mix completo e implante novos produtos no cliente{" "}
            {cliente.nome}.
          </p>
        </div>
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
            const ativo = cliente.produtos.some((x) => x.nome === p.nome);
            return (
              <article key={p.nome}>
                <button
                  type="button"
                  className="catalogProductView"
                  onClick={() => onApresentar(p)}
                >
                  {p.imagem ? <img src={p.imagem} alt={p.nome} /> : <span>IMG</span>}
                </button>
                <div>
                  <strong>{p.nome}</strong>
                  <small>
                    {p.marca} · {p.familia || p.linha}{" "}
                    {p.tamanho ? "· " + p.tamanho : ""}{" "}
                    {p.unidades ? "· " + p.unidades + " un." : ""}
                  </small>
                </div>
                {ativo ? (
                  <div className="catalogActions">
                    <span>Já no mix</span>
                    <button onClick={() => onRemover(p.nome)}>Remover</button>
                  </div>
                ) : (
                  <button className="primary" onClick={() => onImplantar(p)}>
                    + Implantar
                  </button>
                )}
              </article>
            );
          })}
      </div>
    </section>
  );
}
