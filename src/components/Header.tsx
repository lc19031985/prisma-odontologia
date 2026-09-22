"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { whatsappLink } from "@/lib/links";
import styles from "./Header.module.css";

const NAV = [
  { href: "#a-prisma", label: "A Prisma" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#equipe", label: "Equipe" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#topo" className={styles.logoLink} aria-label="Prisma Odontologia — voltar ao topo">
          <Logo />
        </a>

        <nav className={styles.navDesktop} aria-label="Navegação principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={whatsappLink()} external className={styles.cta}>
            Agende sua consulta
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.bar} ${open ? styles.barOpen1 : ""}`} />
            <span className={`${styles.bar} ${open ? styles.barOpen2 : ""}`} />
            <span className={`${styles.bar} ${open ? styles.barOpen3 : ""}`} />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={menuRef}
        className={`${styles.navMobile} ${open ? styles.navMobileOpen : ""}`}
        hidden={!open}
      >
        <nav aria-label="Navegação principal (menu)">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
