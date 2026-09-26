// Preparado para integração futura com ERP (RECEBIDO, FATURADO).
export const STATUS = {
  RASCUNHO: "RASCUNHO",
  A_TRANSMITIR: "A_TRANSMITIR",
  ENVIANDO: "ENVIANDO",
  TRANSMITIDO: "TRANSMITIDO",
  ERRO_TRANSMISSAO: "ERRO_TRANSMISSAO",
  CANCELADO: "CANCELADO",
  RECEBIDO: "RECEBIDO",
  FATURADO: "FATURADO",
};

export const STATUS_LABEL = {
  [STATUS.RASCUNHO]: "Rascunho",
  [STATUS.A_TRANSMITIR]: "A transmitir",
  [STATUS.ENVIANDO]: "Enviando",
  [STATUS.TRANSMITIDO]: "Transmitido",
  [STATUS.ERRO_TRANSMISSAO]: "Erro na transmissão",
  [STATUS.CANCELADO]: "Cancelado",
  [STATUS.RECEBIDO]: "Recebido",
  [STATUS.FATURADO]: "Faturado",
};

export const STATUS_CLASS = {
  [STATUS.RASCUNHO]: "rascunho",
  [STATUS.A_TRANSMITIR]: "a_transmitir",
  [STATUS.ENVIANDO]: "enviando",
  [STATUS.TRANSMITIDO]: "transmitido",
  [STATUS.ERRO_TRANSMISSAO]: "erro_transmissao",
  [STATUS.CANCELADO]: "cancelado",
  [STATUS.RECEBIDO]: "transmitido",
  [STATUS.FATURADO]: "transmitido",
};

export const gerarProtocolo = () => {
  const d = new Date();
  const y = d.getFullYear(),
    m = String(d.getMonth() + 1).padStart(2, "0"),
    day = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `TRX-${y}${m}${day}-${rand}`;
};

export const formatarNumeroPedido = (sequencia) =>
  "#" + String(sequencia).padStart(6, "0");

export const formatarDataHora = (date = new Date()) => ({
  data: date.toLocaleDateString("pt-BR"),
  hora: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
});
