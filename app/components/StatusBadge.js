"use client";
import { STATUS_LABEL, STATUS_CLASS } from "../lib/orderStatus";

const ESTOQUE_CLASS = {
  Ruptura: "ruptura",
  Atenção: "atenção",
  Normal: "normal",
};

export default function StatusBadge({ status, kind = "estoque" }) {
  if (kind === "pedido") {
    return (
      <span className={"status " + (STATUS_CLASS[status] || "")}>
        {STATUS_LABEL[status] || status}
      </span>
    );
  }
  return (
    <span className={"status " + (ESTOQUE_CLASS[status] || "")}>{status}</span>
  );
}
