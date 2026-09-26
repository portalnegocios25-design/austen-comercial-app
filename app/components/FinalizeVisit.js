"use client";
import VisitStepper from "./VisitStepper";

export default function FinalizeVisit({
  cliente,
  pedido,
  observacoes,
  condicaoPagamento,
  previsaoEntrega,
  onVoltar,
  onFinalizarGerarPedido,
}) {
  const itens = cliente.produtos.filter((p) => +(pedido[p.nome] || 0) > 0);
  const qtdTotal = itens.reduce((s, p) => s + (+pedido[p.nome] || 0), 0);

  return (
    <section className="wizardScreen">
      <div className="title">
        <div>
          <small>ATENDIMENTO</small>
          <h2>Finalizar Atendimento</h2>
          <p>Confirme os dados para gerar o pedido de {cliente.nome}.</p>
        </div>
      </div>
      <VisitStepper etapa={4} />
      <div className="finalizeSummary">
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
            <span>Valor total</span>
            <b>—</b>
          </div>
        </div>
        <div className="finalizeDetails">
          <div>
            <span>Condição de pagamento</span>
            <b>{condicaoPagamento || "A combinar"}</b>
          </div>
          <div>
            <span>Previsão de entrega</span>
            <b>{previsaoEntrega || "Não definida"}</b>
          </div>
          <div>
            <span>Observações</span>
            <b>{observacoes || "Nenhuma"}</b>
          </div>
        </div>
      </div>
      <div className="wizardFooter">
        <div />
        <div className="wizardFooterActions">
          <button className="secondary" onClick={onVoltar}>
            Voltar
          </button>
          <button
            className="primary"
            disabled={!itens.length}
            onClick={onFinalizarGerarPedido}
          >
            Finalizar e gerar pedido
          </button>
        </div>
      </div>
    </section>
  );
}
