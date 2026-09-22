import styles from "./OrganicShape.module.css";

/**
 * Recortes e ondas orgânicas do design, em SVG puro.
 * - "wave": onda suave usada na transição entre seções (cor configurável).
 * - "blob": mancha orgânica de fundo, bem sutil.
 */
export function Wave({
  color = "var(--bege)",
  flip = false,
  className = "",
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${styles.wave} ${flip ? styles.flip : ""} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0 50 C 240 90, 480 5, 760 32 C 1030 58, 1240 20, 1440 44 L1440 80 L0 80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export function Blob({
  className = "",
  variant = 1,
}: {
  className?: string;
  variant?: 1 | 2;
}) {
  const d =
    variant === 1
      ? "M44.6,-58.2C56.5,-49.8,64.1,-34.8,68.3,-18.6C72.5,-2.4,73.3,15,66.8,28.7C60.3,42.4,46.6,52.3,32,58.8C17.4,65.3,1.9,68.3,-13.9,66.2C-29.7,64.1,-45.8,56.9,-56.3,44.5C-66.8,32.1,-71.7,14.5,-70.6,-2.5C-69.5,-19.6,-62.4,-36,-50.6,-44.6C-38.8,-53.2,-22.3,-54,-5.9,-47.3C10.5,-40.5,32.7,-66.5,44.6,-58.2Z"
      : "M39.8,-51.9C52.6,-44.1,64.5,-33.2,69.3,-19.5C74.2,-5.8,72,10.7,64.6,23.9C57.1,37.1,44.3,47,30.4,54.2C16.5,61.4,1.5,65.8,-13.7,64.3C-28.9,62.8,-44.3,55.3,-54.4,43.1C-64.6,30.9,-69.5,14,-68.5,-2.3C-67.6,-18.5,-60.7,-34.1,-49.4,-42.2C-38.1,-50.3,-22.3,-50.9,-7.5,-49.1C7.4,-47.3,27,-59.7,39.8,-51.9Z";
  return (
    <svg
      className={`${styles.blob} ${className}`}
      viewBox="-75 -75 150 150"
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke="var(--dourado)" strokeWidth="0.6" opacity="0.55" />
    </svg>
  );
}

/**
 * Fio dourado fino (1px) do design: pequenos traços decorativos em série,
 * usados nas laterais das seções.
 */
export function GoldLine({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <span
      className={`${styles.goldline} ${vertical ? styles.vertical : ""} ${className}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
}
