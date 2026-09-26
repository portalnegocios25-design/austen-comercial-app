"use client";
import { useEffect, useRef, useState } from "react";

// Mantém um texto local durante a digitação para nunca perder foco, cursor
// ou interromper a digitação, mesmo quando o valor confirmado (value) muda
// por fora (ex.: sugestão automática aplicada pelo sistema).
export default function QuantityInput({
  value,
  onCommit,
  min = 0,
  step = 1,
  allowDecimal = false,
  placeholder,
  ariaLabel,
  showStepper = true,
}) {
  const format = (n) =>
    n === null || n === undefined || Number.isNaN(n)
      ? ""
      : String(n).replace(".", ",");
  const [text, setText] = useState(format(value));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setText(format(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const sanitize = (raw) => {
    let v = raw.replace(/[^0-9,.]/g, "").replace(/\./g, ",");
    if (!allowDecimal) v = v.replace(/,/g, "");
    const partes = v.split(",");
    if (partes.length > 2) v = partes[0] + "," + partes.slice(1).join("");
    return v;
  };

  const parse = (raw) => {
    if (raw === "" || raw === ",") return null;
    const n = parseFloat(raw.replace(",", "."));
    return Number.isNaN(n) ? null : n;
  };

  const commit = (raw) => {
    const n = parse(raw);
    onCommit(n === null ? null : Math.max(min, n));
  };

  const ajustar = (delta) => {
    const atual = parse(text) ?? 0;
    const n = Math.max(min, +(atual + delta).toFixed(2));
    setText(format(n));
    onCommit(n);
  };

  return (
    <div className="qtyField">
      {showStepper && (
        <button
          type="button"
          className="qtyStep"
          aria-label="Diminuir quantidade"
          onClick={() => ajustar(-step)}
        >
          −
        </button>
      )}
      <input
        className="stockInput"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={text}
        onFocus={() => {
          focused.current = true;
        }}
        onChange={(e) => {
          const s = sanitize(e.target.value);
          setText(s);
          commit(s);
        }}
        onBlur={() => {
          focused.current = false;
          const n = parse(text);
          setText(n === null ? format(min) : format(n));
          onCommit(n === null ? min : Math.max(min, n));
        }}
      />
      {showStepper && (
        <button
          type="button"
          className="qtyStep"
          aria-label="Aumentar quantidade"
          onClick={() => ajustar(step)}
        >
          +
        </button>
      )}
    </div>
  );
}
