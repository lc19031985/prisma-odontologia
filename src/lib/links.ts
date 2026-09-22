import { clinic } from "@/config/clinic";

/** Detecta o padrão [PENDENTE: ...] usado nos campos ainda não fornecidos pela clínica. */
export function isPending(value: string | null | undefined): boolean {
  return typeof value === "string" && value.includes("[PENDENTE:");
}

/** Link do WhatsApp com a mensagem pré-preenchida. */
export function whatsappLink(): string {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    clinic.whatsappMessage,
  )}`;
}

/** Endereço completo em uma linha (para mapas e schema.org). */
export function fullAddress(): string {
  const a = clinic.address;
  return `${a.street}, ${a.district}, ${a.city} - ${a.state}, ${a.zip}`;
}

/**
 * Link de avaliação no Google.
 * Usa reviewUrl; se pendente e houver Place ID, deriva o link de avaliação.
 * Retorna null enquanto tudo estiver pendente (o botão fica "em breve").
 */
export function reviewLink(): string | null {
  if (!isPending(clinic.google.reviewUrl)) return clinic.google.reviewUrl;
  if (!isPending(clinic.google.placeId)) {
    return `https://search.google.com/local/writereview?placeid=${clinic.google.placeId}`;
  }
  return null;
}

/**
 * Link de rota (abre o aplicativo de mapas no celular).
 * Omite destination_place_id enquanto o Place ID estiver pendente.
 */
export function routeLink(): string {
  const dest = encodeURIComponent(`${clinic.name}, ${fullAddress()}`);
  const base = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
  if (!isPending(clinic.google.placeId)) {
    return `${base}&destination_place_id=${clinic.google.placeId}`;
  }
  return base;
}

/** Link "Ver mapa ampliado". Usa o mapsUrl oficial quando houver; senão, busca por endereço. */
export function mapsLink(): string {
  if (!isPending(clinic.google.mapsUrl)) return clinic.google.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${clinic.name}, ${fullAddress()}`,
  )}`;
}

/**
 * URL do iframe do mapa.
 * Com chave: Maps Embed API em modo place (Place ID quando houver).
 * Sem chave: embed público por endereço.
 */
export function mapEmbedUrl(): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const q = encodeURIComponent(`${clinic.name}, ${fullAddress()}`);
  if (key) {
    const place = !isPending(clinic.google.placeId)
      ? `place_id:${clinic.google.placeId}`
      : q;
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${place}&zoom=16&language=pt-BR`;
  }
  return `https://www.google.com/maps?q=${q}&z=16&hl=pt-BR&output=embed`;
}

export function instagramLink(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}

export function phoneLink(): string {
  return `tel:+${clinic.whatsappNumber}`;
}
