"use client";

export default function MoreMenu({ onAbrir }) {
  return (
    <section className="moreMenuScreen">
      <div className="title">
        <div>
          <small>MAIS</small>
          <h2>Mais opções</h2>
        </div>
      </div>
      <div className="moreMenuList">
        <button onClick={() => onAbrir("Visitas")}>
          <strong>Visitas</strong>
          <span>Histórico de visitas em campo</span>
          <em className="chev">›</em>
        </button>
        <button onClick={() => onAbrir("Metas")}>
          <strong>Metas e desempenho</strong>
          <span>Acompanhar metas do mês</span>
          <em className="chev">›</em>
        </button>
      </div>
    </section>
  );
}
