"use client";
import { useMemo, useState } from "react";

function IconStore(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
      <path d="M21 9 18.5 4h-13L3 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M9 21v-6h6v6" />
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

function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

// Sem status de atividade cadastrado: um cliente é considerado inativo quando
// passa 60+ dias sem nenhum atendimento registrado.
const ativo = (c) => (c.dias || 0) <= 60;

const dataUltimaCompra = (dias) => {
  const d = new Date();
  d.setDate(d.getDate() - (dias || 0));
  return d.toLocaleDateString("pt-BR");
};

export default function ClientList({
  lista,
  busca,
  onBuscaChange,
  onSelecionar,
  onIniciarRapido,
  onNovoCliente,
  onVoltar,
}) {
  const [filtro, setFiltro] = useState("todos");
  const [cidade, setCidade] = useState(null);

  const cidades = useMemo(
    () => [...new Set(lista.map((c) => c.cidade).filter(Boolean))],
    [lista],
  );

  const visiveis = lista.filter((c) => {
    if (filtro === "ativos" && !ativo(c)) return false;
    if (filtro === "cidade" && cidade && c.cidade !== cidade) return false;
    return true;
  });

  return (
    <section className="clientPicker">
      <div className="clientPickerHead">
        <button className="clientPickerBack" onClick={onVoltar} aria-label="Voltar">
          ←
        </button>
        <div>
          <h2>Selecionar cliente</h2>
          <p>Escolha o cliente para iniciar o atendimento</p>
        </div>
        <button
          className="clientPickerAdd"
          onClick={onNovoCliente}
          aria-label="Novo cliente"
        >
          +
        </button>
      </div>

      <div className="clientPickerSearch">
        <IconSearch />
        <input
          placeholder="Buscar cliente por nome ou cidade..."
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
      </div>

      <div className="chipRow">
        <button
          className={"chip " + (filtro === "todos" ? "on" : "")}
          onClick={() => {
            setFiltro("todos");
            setCidade(null);
          }}
        >
          Todos
        </button>
        <button
          className={"chip " + (filtro === "ativos" ? "on" : "")}
          onClick={() => setFiltro("ativos")}
        >
          Ativos
        </button>
        <button
          className={"chip " + (filtro === "cidade" ? "on" : "")}
          onClick={() => setFiltro("cidade")}
        >
          Por cidade
        </button>
        <button
          className={"chip " + (filtro === "regiao" ? "on" : "")}
          onClick={() => {
            setFiltro("regiao");
            setCidade(null);
          }}
        >
          <IconPin className="chipPin" /> Minha região
        </button>
      </div>

      {filtro === "cidade" && cidades.length > 0 && (
        <div className="chipRow">
          {cidades.map((c) => (
            <button
              key={c}
              className={"chip " + (cidade === c ? "on" : "")}
              onClick={() => setCidade(c === cidade ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="pickerList">
        {visiveis.map((c) => {
          const on = ativo(c);
          return (
            <article key={c.id} className="pickerRow">
              <button
                type="button"
                className="pickerMain"
                onClick={() => onSelecionar(c)}
              >
                <span className="pickerIcon">
                  <IconStore />
                </span>
                <span className="pickerInfo">
                  <strong>{c.nome}</strong>
                  <small>
                    {c.cidade} {c.tipoCliente ? "- " + c.tipoCliente : ""}
                  </small>
                  <em className={"pickerStatus " + (on ? "on" : "off")}>
                    {on ? "Ativo" : "Inativo"}
                  </em>
                </span>
              </button>
              <span className="chev">›</span>
              <div className="pickerRight">
                <span className="pickerDateChip">
                  <IconCalendar />
                  Última compra <b>{dataUltimaCompra(c.dias)}</b>
                </span>
                <button
                  type="button"
                  className="primary pickerStart"
                  disabled={!on}
                  onClick={() => onIniciarRapido(c)}
                >
                  Iniciar
                </button>
              </div>
            </article>
          );
        })}
        {visiveis.length === 0 && (
          <div className="empty">Nenhum cliente encontrado.</div>
        )}
      </div>
    </section>
  );
}
