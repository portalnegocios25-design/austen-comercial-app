"use client";
import { dataDeHoje } from "../lib/date";

function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconFileText(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

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

function IconTrophy(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4a2 2 0 0 0 2 4.3" />
      <path d="M17 5h3a2 2 0 0 1-2 4.3" />
    </svg>
  );
}

function IconBell(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default function SellerHome({
  vendedorNome,
  clientesCarteira,
  visitasMes,
  vendasMes,
  visitaAtiva,
  clienteEmAtendimento,
  pedidosAbertos,
  alertas,
  onIniciarAtendimento,
  onNavigate,
}) {
  const primeiroNome = (vendedorNome || "Vendedor").split(" ")[0];

  const cards = [
    {
      key: "Clientes",
      icone: IconUsers,
      cor: "blue",
      titulo: "Clientes",
      descricao: `${clientesCarteira} cliente${clientesCarteira === 1 ? "" : "s"} na carteira`,
    },
    {
      key: "Pedidos",
      icone: IconFileText,
      cor: "green",
      titulo: "Pedidos",
      descricao: "Acompanhe e transmita seus pedidos",
      badge: pedidosAbertos > 0 ? pedidosAbertos : null,
    },
    {
      key: "__atendimento",
      icone: IconClock,
      cor: "orange",
      titulo: "Atendimentos em andamento",
      descricao: visitaAtiva
        ? `Continuar com ${clienteEmAtendimento || "cliente"}`
        : "Continue de onde parou",
      badge: visitaAtiva ? 1 : null,
      onClick: onIniciarAtendimento,
    },
    {
      key: "Produtos",
      icone: IconBox,
      cor: "purple",
      titulo: "Produtos",
      descricao: "Consulte produtos e preços",
    },
    {
      key: "Visitas",
      icone: IconBarChart,
      cor: "slate",
      titulo: "Histórico de vendas",
      descricao: `${vendasMes} vendas neste mês`,
    },
    {
      key: "Metas",
      icone: IconTrophy,
      cor: "pink",
      titulo: "Metas",
      descricao: "Acompanhe suas metas e resultados",
    },
  ];

  return (
    <section className="sellerHomeScreen">
      <div className="sellerHomeHead">
        <div>
          <p className="sellerGreetingHello">Olá,</p>
          <h2 className="sellerGreetingName">{primeiroNome}</h2>
          <p className="sellerGreetingRole">Vendedor</p>
        </div>
        <div className="sellerHomeHeadRight">
          <div className="sellerDateChip">
            <IconCalendar className="sellerDateIcon" />
            <span>{dataDeHoje()}</span>
          </div>
          <button
            className="sellerBell"
            onClick={() => onNavigate("Clientes")}
            aria-label={
              alertas > 0
                ? `${alertas} clientes precisam de atenção`
                : "Nenhum alerta no momento"
            }
          >
            <IconBell />
            {alertas > 0 && <span className="sellerBellBadge">{alertas}</span>}
          </button>
        </div>
      </div>

      <button className="homeCardMain" onClick={onIniciarAtendimento}>
        <span className="homeCardMainIcon">
          <IconUsers />
        </span>
        <div>
          <strong>
            {visitaAtiva ? "Continuar atendimento" : "Iniciar atendimento"}
          </strong>
          <p>
            {visitaAtiva
              ? `Retomar atendimento de ${clienteEmAtendimento || "cliente"}.`
              : "Selecione um cliente e conte o estoque para gerar o pedido."}
          </p>
        </div>
        <span className="homeCardArrow">›</span>
      </button>

      <div className="homeCards">
        {cards.map((c) => {
          const Icone = c.icone;
          return (
            <button
              key={c.key}
              className="homeCard"
              onClick={c.onClick || (() => onNavigate(c.key))}
            >
              <span className={"homeCardIcon " + c.cor}>
                <Icone />
              </span>
              {c.badge != null && <span className="homeCardBadge">{c.badge}</span>}
              <strong>{c.titulo}</strong>
              <span className="homeCardDesc">{c.descricao}</span>
              <span className="homeCardChev">›</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
