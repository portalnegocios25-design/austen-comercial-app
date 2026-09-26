"use client";
import { useMemo, useState } from "react";
import VisitStepper from "./VisitStepper";
import ProductStockCard from "./ProductStockCard";

export default function StockCount({
  cliente,
  produtosGestao,
  contagem,
  onContagemChange,
  onApresentar,
  onVoltar,
  onProximo,
}) {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const infoPorNome = useMemo(() => {
    const m = new Map();
    produtosGestao.forEach((p) => m.set(p.nome, p));
    return m;
  }, [produtosGestao]);

  const categorias = useMemo(() => {
    const set = new Set(
      cliente.produtos.map((p) => infoPorNome.get(p.nome)?.familia).filter(Boolean),
    );
    return ["Todas", ...set];
  }, [cliente.produtos, infoPorNome]);

  const produtosFiltrados = cliente.produtos.filter((p) => {
    const info = infoPorNome.get(p.nome);
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === "Todas" || info?.familia === categoria;
    return matchBusca && matchCategoria;
  });

  const valores = cliente.produtos.map((p) => {
    const v = contagem[p.nome];
    return v === undefined || v === null || v === "" ? p.estoque : +v;
  });
  const itensContados = Object.keys(contagem).length;
  const rupturas = valores.filter((v) => v === 0).length;
  const medias = cliente.produtos.map(
    (p) => p.compras.reduce((s, x) => s + x[2], 0) / (p.compras.length || 1),
  );
  const baixos = valores.filter((v, i) => v > 0 && medias[i] && v / medias[i] < 0.35).length;

  return (
    <section className="wizardScreen">
      <div className="title">
        <div>
          <small>INICIAR ATENDIMENTO</small>
          <h2>Contagem de estoque</h2>
          <p>
            {cliente.nome} · {cliente.cidade} · última compra há {cliente.dias} dias
          </p>
        </div>
      </div>
      <VisitStepper etapa={1} />
      <div className="wizardFilters">
        <input
          className="catalogSearch"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {categorias.length > 1 && (
          <div className="chipRow">
            {categorias.map((c) => (
              <button
                key={c}
                className={"chip " + (categoria === c ? "on" : "")}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="products">
        {produtosFiltrados.map((p) => (
          <ProductStockCard
            key={p.nome}
            produto={p}
            imagem={infoPorNome.get(p.nome)?.imagem}
            valor={
              contagem[p.nome] === undefined || contagem[p.nome] === ""
                ? undefined
                : +contagem[p.nome]
            }
            onChange={onContagemChange}
            onApresentar={onApresentar}
          />
        ))}
        {produtosFiltrados.length === 0 && (
          <div className="empty">Nenhum produto encontrado.</div>
        )}
      </div>
      <div className="wizardFooter">
        <div className="wizardFooterStats">
          <span>
            <b>{itensContados}</b> itens contados
          </span>
          <span>
            <b>{rupturas}</b> rupturas
          </span>
          <span>
            <b>{baixos}</b> estoques baixos
          </span>
        </div>
        <div className="wizardFooterActions">
          <button className="secondary" onClick={onVoltar}>
            Voltar
          </button>
          <button className="primary" onClick={onProximo}>
            Próximo
          </button>
        </div>
      </div>
    </section>
  );
}
