"use client";

const ICONS = {
  inicio: (
    <path d="M4 11.5 12 4l8 7.5M6 10v9h5v-5h2v5h5v-9" />
  ),
  clientes: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14a5 5 0 0 1 5.5 5" />
    </>
  ),
  pedidos: (
    <>
      <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21z" />
      <path d="M9.5 8h5M9.5 11.5h5" />
    </>
  ),
  produtos: (
    <>
      <path d="M3.5 8 12 3.5 20.5 8 12 12.5z" />
      <path d="M3.5 8v9L12 21.5 20.5 17V8" />
      <path d="M12 12.5V21.5" />
    </>
  ),
  mais: (
    <>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </>
  ),
};

const ITENS = [
  { key: "Início", icon: "inicio" },
  { key: "Clientes", icon: "clientes" },
  { key: "Pedidos", icon: "pedidos" },
  { key: "Produtos", icon: "produtos" },
  { key: "Mais", icon: "mais" },
];

export default function BottomNavigation({ active, onChange }) {
  return (
    <nav className="bottomNav">
      {ITENS.map((item) => (
        <button
          key={item.key}
          className={active === item.key ? "sel" : ""}
          onClick={() => onChange(item.key)}
        >
          <svg
            className="navIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {ICONS[item.icon]}
          </svg>
          <span>{item.key}</span>
        </button>
      ))}
    </nav>
  );
}
