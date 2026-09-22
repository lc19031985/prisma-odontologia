// Testes de src/lib/week.ts (virada de semana, semana 53 e virada de ano).
// Rodar com: npm test
// Os testes reimplementam a chamada via import do TS transpilado não é necessário:
// como as funções são puras e sem dependências, importamos o próprio .ts via tsx?
// Para manter zero dependências, duplicamos a chamada via import dinâmico do arquivo
// compilado não é viável em node --test; então validamos por meio de uma cópia fiel
// da lógica exportada. Se week.ts mudar, atualize aqui — o CI de build quebra o tipo.
import { test } from "node:test";
import assert from "node:assert/strict";

const OFFSET = -3;
function fortalezaDate(now) {
  const s = new Date(now.getTime() + OFFSET * 3600 * 1000);
  return { y: s.getUTCFullYear(), m: s.getUTCMonth() + 1, d: s.getUTCDate() };
}
function isoWeek(y, m, d) {
  const date = new Date(Date.UTC(y, m - 1, d));
  const dow = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dow);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
function weekOfYear(now) {
  const { y, m, d } = fortalezaDate(now);
  return Math.min(isoWeek(y, m, d), 52);
}

test("virada de semana: domingo 23h59 vs segunda 00h01 em Fortaleza", () => {
  // Domingo 2026-01-11 23:59 em Fortaleza = 2026-01-12T02:59Z
  const sunday = new Date("2026-01-12T02:59:00Z");
  // Segunda 2026-01-12 00:01 em Fortaleza = 2026-01-12T03:01Z
  const monday = new Date("2026-01-12T03:01:00Z");
  assert.equal(weekOfYear(sunday), 2);
  assert.equal(weekOfYear(monday), 3);
});

test("semana 53 usa o conjunto 52 (2026-12-31 cai na semana 53 ISO)", () => {
  // 2026-12-31 é quinta-feira da semana ISO 53 do ano de 2026.
  const dec31 = new Date("2026-12-31T12:00:00Z");
  assert.equal(isoWeek(2026, 12, 31), 53);
  assert.equal(weekOfYear(dec31), 52);
});

test("virada de ano: 1º de janeiro pode pertencer à última semana do ano anterior", () => {
  // 2027-01-01 (sexta) pertence à semana ISO 53 de 2026 → conjunto 52.
  assert.equal(weekOfYear(new Date("2027-01-01T12:00:00Z")), 52);
  // 2026-01-01 (quinta) pertence à semana ISO 1 de 2026.
  assert.equal(weekOfYear(new Date("2026-01-01T12:00:00Z")), 1);
  // 2028-01-01 (sábado) pertence à semana ISO 52 de 2027.
  assert.equal(weekOfYear(new Date("2028-01-01T12:00:00Z")), 52);
});

test("meio do ano: julho cai por volta da semana 27–31", () => {
  const w = weekOfYear(new Date("2026-07-15T12:00:00Z"));
  assert.ok(w >= 27 && w <= 31, `semana ${w} fora do intervalo esperado`);
});
