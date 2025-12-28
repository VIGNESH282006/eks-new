'use client';

import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Logo */}
                <a href="/" className={styles.logo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 22h20L12 2z" fill="#FF6B35" />
                    </svg>
                </a>

                {/* Navigation Links */}
                <div className={styles.navLinks}>
                    <a href="#" className={styles.navLink}>
                        SERVICES
                        <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6">
                            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </a>
                    <a href="#" className={styles.navLink}>
                        INDUSTRIES
                        <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6">
                            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </a>
                    <a href="#" className={styles.navLink}>CASES</a>
                    <a href="#" className={styles.navLink}>
                        COMPANY
                        <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6">
                            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </a>
                    <a href="#" className={styles.navLink}>INSIGHTS</a>
                    <a href="#" className={styles.navLink}>CONTACTS</a>
                </div>

                {/* CTA Button */}
                <a href="#" className={styles.ctaButton}>
                    GET IN TOUCH
                    <svg className={styles.arrow} width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                </a>
            </div>
        </nav>
    );
}
