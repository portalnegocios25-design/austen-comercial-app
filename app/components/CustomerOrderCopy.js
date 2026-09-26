"use client";
import { useState } from "react";

const montarResumoTexto = (pedido, vendedorNome) => {
  const linhas = pedido.itens.map(
    (it) => `- ${it.nome}: ${it.pedido} un.`,
  );
  return [
    `Pedido ${pedido.numero} - Austen Comercial`,
    `Data: ${pedido.data}`,
    `Cliente: ${pedido.cliente}`,
    `Vendedor: ${vendedorNome}`,
    "",
    "Produtos:",
    ...linhas,
    "",
    `Quantidade total: ${pedido.total} un.`,
    pedido.valorTotal != null
      ? `Total do pedido: Gs. ${pedido.valorTotal.toLocaleString("es-PY")}`
      : "",
    `Condição de pagamento: ${pedido.condicaoPagamento || "A combinar"}`,
    `Previsão de entrega: ${pedido.previsaoEntrega || "A definir"}`,
    "",
    "Obrigado pela sua confiança. Austen Comercial",
  ]
    .filter(Boolean)
    .join("\n");
};

export default function CustomerOrderCopy({ pedido, vendedorNome, onVoltar }) {
  const [copiado, setCopiado] = useState(false);
  const resumo = montarResumoTexto(pedido, vendedorNome);

  const enviarWhatsApp = () => {
    window.open("https://wa.me/?text=" + encodeURIComponent(resumo), "_blank");
  };

  const gerarPDF = () => {
    window.print();
  };

  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: pedido.numero, text: resumo });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(resumo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // clipboard indisponível — nada a fazer
    }
  };

  return (
    <section className="orderDetailScreen">
      <button className="backClients" onClick={onVoltar}>
        ‹ Voltar
      </button>
      <div className="customerReceipt">
        <div className="receiptHead">
          <strong>AUSTEN COMERCIAL</strong>
          <span>PEDIDO Nº {pedido.numero}</span>
        </div>
        <div className="receiptMeta">
          <span>
            Data: <b>{pedido.data}</b>
          </span>
          <span>
            Cliente: <b>{pedido.cliente}</b>
          </span>
          <span>
            Vendedor: <b>{vendedorNome}</b>
          </span>
        </div>
        <table className="receiptTable">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd.</th>
            </tr>
          </thead>
          <tbody>
            {pedido.itens.map((it) => (
              <tr key={it.nome}>
                <td>{it.nome}</td>
                <td>{it.pedido} un.</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="receiptTotals">
          <span>
            Quantidade total: <b>{pedido.total} un.</b>
          </span>
          <span>
            Total do pedido:{" "}
            <b>
              {pedido.valorTotal != null
                ? "Gs. " + pedido.valorTotal.toLocaleString("es-PY")
                : "—"}
            </b>
          </span>
        </div>
        <div className="receiptMeta">
          <span>Condição de pagamento: {pedido.condicaoPagamento || "A combinar"}</span>
          <span>Previsão de entrega: {pedido.previsaoEntrega || "A definir"}</span>
        </div>
        <p className="receiptThanks">Obrigado pela sua confiança.</p>
      </div>
      <div className="receiptActions">
        <button className="primary" onClick={enviarWhatsApp}>
          Enviar por WhatsApp
        </button>
        <button className="secondary" onClick={gerarPDF}>
          Gerar PDF
        </button>
        <button className="secondary" onClick={compartilhar}>
          {copiado ? "Copiado!" : "Compartilhar"}
        </button>
      </div>
    </section>
  );
}
