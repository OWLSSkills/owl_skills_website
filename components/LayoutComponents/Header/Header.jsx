'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide header on home page like before
  // if (pathname === '/') return null;

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
          <div className={styles.navDropdown}>
  <button
    className={`${styles.navLink} intervariable ${styles.dropdownToggle}`}
    onClick={closeMenu}
  >
    About Our Courses
    <span className={styles.dropdownArrow}>▼</span>
  </button>

  <div className={styles.dropdownMenu}>
    <Link href="/about_courses" className={styles.dropdownItem} onClick={closeMenu}>
      About Our Courses
    </Link>
    <Link href="/courses/one-day" className={styles.dropdownItem} onClick={closeMenu}>
      One Day Course
    </Link>
    <Link href="/courses/weekend_course" className={styles.dropdownItem} onClick={closeMenu}>
      Weekend Course
    </Link>
    <Link href="/courses/limited-edition" className={styles.dropdownItem} onClick={closeMenu}>
      Limited Edition Retreat
    </Link>
  </div>
</div>
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
          <a
            href="https://bookings.owlsskills.com/en"
            className={`background_color_light_purple font_color_white call_to_action_button ${styles.mobileCta}`}
            onClick={closeMenu}
          >
            BOOK A COURSE
          </a>
        </nav>

        {/* DESKTOP CTA */}
        <div className={styles.ctaWrap}>
          <Link
            href="https://bookings.owlsskills.com/en"
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
