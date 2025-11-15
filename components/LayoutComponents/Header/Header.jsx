'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide header on home page like before
  if (pathname === '/') return null;

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        {/* LOGO */}
        <Link
          href="/"
          className={styles.brand}
          aria-label="OWLS Skills — Home"
          onClick={closeMenu}
        >
          <img
            style={{ marginTop: '2%' }}
            className={styles.logo}
            src="/images/OWLS_Color_No_Under_Text.png"
            alt="OWLS Skills"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className={`${styles.nav} ${isOpen ? styles.navMobileOpen : ''}`}
          aria-label="Primary"
        >
          <Link
            href="/mission"
            className={`${styles.navLink} intervariable`}
            onClick={closeMenu}
          >
            Mission
          </Link>
          <Link
            href="/about_courses"
            className={`${styles.navLink} intervariable`}
            onClick={closeMenu}
          >
            About Our Courses
          </Link>
          <Link
            href="/#faq"
            className={`${styles.navLink} intervariable`}
            onClick={closeMenu}
          >
            FAQs
          </Link>
          <Link
            href="/newsletter"
            className={`${styles.navLink} intervariable`}
            onClick={closeMenu}
          >
            Newsletter
          </Link>

          {/* MOBILE-ONLY CTA INSIDE MENU */}
          <Link
            href="/#courses"
            className={`background_color_light_purple font_color_white call_to_action_button ${styles.mobileCta}`}
            onClick={closeMenu}
          >
            BOOK A COURSE
          </Link>
        </nav>

        {/* DESKTOP CTA */}
        <div className={styles.ctaWrap}>
          <Link
            href="/#courses"
            className={`background_color_light_purple font_color_white call_to_action_button ${styles.scaleUpCenter}`}
          >
            BOOK A COURSE
          </Link>
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>
    </header>
  );
}
