"use client";

const ETAPAS = [
  "Contagem de estoque",
  "Sugestão de pedido",
  "Revisar pedido",
  "Finalizar atendimento",
];

export default function VisitStepper({ etapa }) {
  return (
    <div className="visitStepper">
      {ETAPAS.map((label, i) => {
        const n = i + 1;
        const estado = n < etapa ? "done" : n === etapa ? "current" : "todo";
        return (
          <div className={"stepItem " + estado} key={label}>
            <span className="stepDot">{n < etapa ? "✓" : n}</span>
            <small>{label}</small>
          </div>
        );
      })}
    </div>
  );
}
