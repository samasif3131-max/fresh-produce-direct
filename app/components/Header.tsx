"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  UserRound,
  ShoppingCart,
} from "lucide-react";

import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>

        {/* LOGO */}
        <Link
          href="/"
          className={styles.logo}
          onClick={closeMenu}
        >
          <img
            src="/logo.png"
            alt="Fresh Produce Direct"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className={styles.navigation}>
          <Link href="/">Home</Link>
          <Link href="/our-boxes">Our Boxes</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
          <Link href="/our-growers">Our Growers</Link>
          <Link href="/delivery">Delivery</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* HEADER ICONS */}
        <div className={styles.headerIcons}>

          {/* SEARCH */}
          <button
            className={styles.iconButton}
            aria-label="Search"
          >
            <Search size={23} strokeWidth={1.8} />
          </button>

          {/* ACCOUNT */}
          <Link
            href="/account"
            className={`${styles.accountButton} ${styles.iconButton}`}
            aria-label="Account"
          >
            <UserRound size={23} strokeWidth={1.8} />
            <span>Sign In</span>
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className={`${styles.cartButton} ${styles.iconButton}`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={25} strokeWidth={1.8} />

            <span className={styles.cartNumber}>
              0
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      <nav
        className={`${styles.mobileNavigation} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <Link href="/" onClick={closeMenu}>
          Home
        </Link>

        <Link href="/our-boxes" onClick={closeMenu}>
          Our Boxes
        </Link>

        <Link href="/shop" onClick={closeMenu}>
          Shop
        </Link>

        <Link href="/about" onClick={closeMenu}>
          About Us
        </Link>

        <Link href="/our-growers" onClick={closeMenu}>
          Our Growers
        </Link>

        <Link href="/delivery" onClick={closeMenu}>
          Delivery
        </Link>

        <Link href="/contact" onClick={closeMenu}>
          Contact
        </Link>

      </nav>

    </header>
  );
}