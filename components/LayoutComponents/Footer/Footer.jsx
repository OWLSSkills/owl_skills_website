'use client'

import styles from './Footer.module.css';
import SocialIcons from '@/components/Home/Socials/Socials';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div>

        <div className={`${styles.socialsDock}`}>
          <SocialIcons />
        </div>
        <h3 className={`alfarn ${styles.contact}`}>CONTACT JESSIE!</h3>
        <h3 className={`intervariable ${styles.contact}`}>owlsskills@gmail.com</h3>
        <h3 className={`intervariable ${styles.contact}`}>(720) 647-5892</h3>
        <br />
      </div>

      <div className={styles.footerStack}>
        <img
          src="/images/Jessie_Krebs_Color.png"
          alt="Jessie Krebs Logo"
          className={styles.smallLogo}
        />
        <p className={`alfarn ${styles.text}`}>© {currentYear} Jessie Krebs.</p>
        <p className={`alfarn`}>All rights reserved.</p>
      </div>
      <div className={styles.affiliateLogos}>
        <img className={`${styles.logoFooter}`} onClick={() => window.open('https://owlsskills.com')}style={{cursor: "pointer"}} src='/images/OWLS_color_without_description.png' alt='owl skills logo' />
        <div className={styles.logoLockup} onClick={() => window.open('https://jessiekrebs.com')} style={{cursor: "pointer"}}>
          <h2 className={styles.alfarn_custom}>Custom Courses</h2>
          <p className={styles.gloria_cursive}>by Jessie Krebs</p>
        </div>
      </div>
    </footer>
  );
}
