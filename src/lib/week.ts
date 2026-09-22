/**
 * Seleção do conjunto semanal de conteúdo.
 *
 * Como o site é estático, o cálculo roda no navegador (após a hidratação);
 * caso contrário a semana ficaria congelada na data do build.
 * Usa a semana ISO 8601 no fuso America/Fortaleza (UTC-3, sem horário de verão),
 * virando na segunda-feira às 00h. A semana 53 usa o conjunto 52.
 */

const FORTALEZA_UTC_OFFSET_HOURS = -3;

/** Data "de parede" em Fortaleza para um instante qualquer (UTC-3 fixo). */
export function fortalezaDate(now: Date): { y: number; m: number; d: number } {
  const shifted = new Date(
    now.getTime() + FORTALEZA_UTC_OFFSET_HOURS * 3600 * 1000,
  );
  return {
    y: shifted.getUTCFullYear(),
    m: shifted.getUTCMonth() + 1,
    d: shifted.getUTCDate(),
  };
}

/** Número da semana ISO 8601 para uma data (ano, mês, dia) local. */
export function isoWeek(y: number, m: number, d: number): number {
  // Algoritmo ISO 8601: a semana 1 é a que contém a primeira quinta-feira do ano.
  const date = new Date(Date.UTC(y, m - 1, d));
  const dayOfWeek = date.getUTCDay() || 7; // 1 = segunda ... 7 = domingo
  date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek); // quinta-feira da mesma semana
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** Índice do conjunto da semana (1–52) para o instante dado. A semana 53 usa o 52. */
export function weekOfYear(now: Date = new Date()): number {
  const { y, m, d } = fortalezaDate(now);
  const week = isoWeek(y, m, d);
  return Math.min(week, 52);
}
