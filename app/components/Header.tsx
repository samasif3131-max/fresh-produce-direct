"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  Search,
  UserRound,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import styles from "./Header.module.css";


/* =========================================
   NAVIGATION LINKS
========================================= */

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Our Boxes",
    href: "/our-boxes",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Our Growers",
    href: "/growers",
  },
  {
    name: "Delivery",
    href: "/delivery",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];


export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");


  const pathname = usePathname();

  const router = useRouter();


  /* CART */

  const { cart } = useCart();


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  /* CLOSE MOBILE MENU */

  const closeMenu = () => {

    setMenuOpen(false);

  };


  /* =========================================
     ACTIVE LINK
  ========================================= */

  const isActive = (href: string) => {

    if (href === "/") {

      return pathname === "/";

    }

    return pathname === href ||
      pathname.startsWith(`${href}/`);

  };


  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    const value = searchValue.trim();


    if (!value) {

      return;

    }


    router.push(
      `/shop?search=${encodeURIComponent(value)}`
    );


    setSearchOpen(false);

    setSearchValue("");

  };


  return (

    <header className={styles.header}>

      <div className={styles.headerContainer}>


        {/* =====================================
            LOGO
        ===================================== */}

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


        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <nav className={styles.navigation}>

          {navLinks.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? styles.activeLink
                  : ""
              }
            >

              {link.name}

            </Link>

          ))}

        </nav>


        {/* =====================================
            HEADER ICONS
        ===================================== */}

        <div className={styles.headerIcons}>


          {/* SEARCH BUTTON */}

          <button
            type="button"
            className={styles.iconButton}
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
            aria-label="Search"
          >

            <Search
              size={23}
              strokeWidth={1.8}
            />

          </button>


          {/* ACCOUNT */}

          <Link
            href="/account"
            className={`${styles.accountButton} ${styles.iconButton}`}
            aria-label="Account"
          >

            <UserRound
              size={23}
              strokeWidth={1.8}
            />

            <span>Sign In</span>

          </Link>


          {/* CART */}

          <Link
            href="/cart"
            className={`${styles.cartButton} ${styles.iconButton}`}
            aria-label="Shopping Cart"
          >

            <ShoppingCart
              size={25}
              strokeWidth={1.8}
            />

            <span className={styles.cartNumber}>

              {cartCount}

            </span>

          </Link>


          {/* MOBILE MENU */}

          <button
            type="button"
            className={styles.menuButton}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Open menu"
          >

            {menuOpen ? (

              <X size={28} />

            ) : (

              <Menu size={28} />

            )}

          </button>


        </div>


        {/* =====================================
            SEARCH BOX
        ===================================== */}

        {searchOpen && (

          <form
            className={styles.searchDropdown}
            onSubmit={handleSearch}
          >

            <Search size={20} />

            <input
              type="text"
              placeholder="Search fresh produce..."
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              autoFocus
            />

            <button type="submit">

              Search

            </button>

          </form>

        )}


      </div>


      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <nav
        className={`${styles.mobileNavigation} ${
          menuOpen
            ? styles.mobileMenuOpen
            : ""
        }`}
      >

        {navLinks.map((link) => (

          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className={
              isActive(link.href)
                ? styles.mobileActiveLink
                : ""
            }
          >

            {link.name}

          </Link>

        ))}

      </nav>

    </header>

  );

}