"use client";

import { useEffect, useState } from "react";

/**
 * Ano corrente gerado dinamicamente (regra do prompt, seção 2).
 * Num site estático o ano do build ficaria congelado; este componente
 * atualiza no navegador após a hidratação.
 */
export default function CurrentYear() {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <span suppressHydrationWarning>{year}</span>;
}
