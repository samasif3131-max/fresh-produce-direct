"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("Thank you! You are subscribed.");
    setEmail("");
  };

  return (
    <footer className={styles.footer}>

      <div className={styles.footerGlow}></div>

      <div className={styles.footerContainer}>

        {/* LOGO */}
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.logoLink}>
            <img
              src="/logo.png"
              alt="Fresh Produce Direct"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* QUICK LINKS */}
        <div className={styles.linkColumn}>
          <h3>Quick Links</h3>

          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/our-boxes">Our Boxes</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About Us</Link>
          </div>
        </div>

        {/* CUSTOMER CARE */}
        <div className={styles.linkColumn}>
          <h3>Customer Care</h3>

          <div className={styles.links}>
            <Link href="/delivery">Delivery</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        {/* EMPTY SPACE
            This keeps the exact spacing from the reference footer
            where the social section used to be. */}
        <div className={styles.socialSpacer}></div>

        {/* NEWSLETTER */}
        <div className={styles.newsletterColumn}>
          <h3>Join Our Newsletter</h3>

          <p>
            Get the latest produce, offers and news.
          </p>

          <form
            className={styles.newsletterForm}
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              aria-label="Your email address"
            />

            <button type="submit">
              Subscribe
              <ArrowUpRight size={15} />
            </button>
          </form>

          {message && (
            <div
              className={`${styles.newsletterMessage} ${
                message.includes("Thank")
                  ? styles.success
                  : styles.error
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* A BRIGHTER TOMORROW */}
        <div className={styles.tomorrowColumn}>
          <div className={styles.tomorrowText}>
            <span>A Brighter</span>
            <span>Tomorrow.</span>
          </div>

          <div className={styles.leaf}>
            <Leaf size={28} fill="currentColor" />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomContainer}>

          <p>
            © {new Date().getFullYear()} Fresh Produce Direct. All rights
            reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms &amp; Conditions
            </Link>

            <Link href="/cookies">
              Cookie Policy
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}