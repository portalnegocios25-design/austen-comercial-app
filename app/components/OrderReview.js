"use client";
import VisitStepper from "./VisitStepper";
import QuantityInput from "./QuantityInput";

export default function OrderReview({
  cliente,
  pedido,
  onPedidoChange,
  onRemover,
  onAdicionarProduto,
  campanhas,
  campanhaElegivel,
  motivoSug,
  onMotivoChange,
  onSugerirCampanhaEspecial,
  observacoes,
  onObservacoesChange,
  condicaoPagamento,
  onCondicaoChange,
  previsaoEntrega,
  onPrevisaoChange,
  onVoltar,
  onFinalizar,
}) {
  const itens = cliente.produtos.filter((p) => +(pedido[p.nome] || 0) > 0);
  const qtdTotal = itens.reduce((s, p) => s + (+pedido[p.nome] || 0), 0);

  const campanhasAtivas = campanhas.filter(
    (c) => c.status === "Ativa" && campanhaElegivel(c),
  );

  return (
    <section className="wizardScreen">
      <div className="title">
        <div>
          <small>ATENDIMENTO</small>
          <h2>Revisar Pedido</h2>
          <p>Confira os itens antes de finalizar o atendimento.</p>
        </div>
        <button className="secondary" onClick={onAdicionarProduto}>
          + Adicionar produto
        </button>
      </div>
      {campanhasAtivas.length > 0 && (
        <div className="campaignStrip autoCampaign">
          <strong>Campanhas automáticas</strong>
          <small>O sistema aplica o benefício sozinho quando o pedido atingir a regra.</small>
          {campanhasAtivas.map((c) => (
            <span className="campaignPending" key={c.id}>
              {c.nome} → {c.brinde}
            </span>
          ))}
        </div>
      )}
      <VisitStepper etapa={3} />
      <div className="reviewList">
        {itens.length === 0 && (
          <div className="empty">Nenhum item no pedido ainda.</div>
        )}
        {itens.map((p) => (
          <div className="orderRow orderAdvanced" key={p.nome}>
            <div>
              <strong>{p.nome}</strong>
              <small>Preço unitário: —</small>
            </div>
            <QuantityInput
              value={+(pedido[p.nome] || 0)}
              onCommit={(n) => onPedidoChange(p.nome, n)}
              ariaLabel={"Quantidade de " + p.nome}
            />
            <button className="removeItem" onClick={() => onRemover(p.nome)}>
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="reviewSummary">
        <div>
          <span>Itens</span>
          <b>{itens.length}</b>
        </div>
        <div>
          <span>Quantidade total</span>
          <b>{qtdTotal}</b>
        </div>
        <div>
          <span>Valor dos produtos</span>
          <b>—</b>
        </div>
        <div>
          <span>Total do pedido</span>
          <b>—</b>
        </div>
      </div>
      <div className="sellerReason">
        <label>
          Motivo da sugestão do vendedor
          <select value={motivoSug} onChange={(e) => onMotivoChange(e.target.value)}>
            <option>Promoção</option>
            <option>Lançamento</option>
            <option>Aumento de mix</option>
            <option>Ponto extra</option>
            <option>Negociação especial</option>
            <option>Outro</option>
          </select>
        </label>
        <button className="secondary" onClick={onSugerirCampanhaEspecial}>
          Sugerir campanha especial ao gestor
        </button>
      </div>
      <div className="reviewFields">
        <label>
          Observações
          <textarea
            value={observacoes}
            onChange={(e) => onObservacoesChange(e.target.value)}
            placeholder="Observações do pedido..."
          />
        </label>
        <label>
          Condição de pagamento
          <input
            value={condicaoPagamento}
            onChange={(e) => onCondicaoChange(e.target.value)}
            placeholder="Ex.: A combinar, 30 dias..."
          />
        </label>
        <label>
          Previsão de entrega
          <input
            type="date"
            value={previsaoEntrega}
            onChange={(e) => onPrevisaoChange(e.target.value)}
          />
        </label>
      </div>
      <div className="wizardFooter">
        <div />
        <div className="wizardFooterActions">
          <button className="secondary" onClick={onVoltar}>
            Voltar
          </button>
          <button className="primary" disabled={!itens.length} onClick={onFinalizar}>
            Finalizar atendimento
          </button>
        </div>
      </div>
    </section>
  );
}
