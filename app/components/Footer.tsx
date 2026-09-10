import Link from "next/link";
import { useCart } from "../../context/CartContext";
import {
  Truck,
  ShieldCheck,
  Users,
  Leaf,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* ================= FOOTER TOP ================= */}

      <div className={styles.footerTop}>
        <div className={styles.footerContainer}>

          {/* BRAND */}

          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <img
                src="/logo.png"
                alt="Fresh Produce Direct"
              />
            </Link>

            <p>
              Fresh, seasonal produce sourced locally and delivered
              directly to your door.
            </p>

            <div className={styles.footerMessage}>
              <span>Good Food.</span>
              <strong>Stronger Communities.</strong>
            </div>
          </div>


          {/* QUICK LINKS */}

          <div className={styles.footerColumn}>
            <h3>Explore</h3>

            <Link href="/">Home</Link>
            <Link href="/our-boxes">Our Boxes</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About Us</Link>
            <Link href="/our-growers">Our Growers</Link>
          </div>


          {/* HELP */}

          <div className={styles.footerColumn}>
            <h3>Information</h3>

            <Link href="/delivery">Delivery</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/account">My Account</Link>
            <Link href="/cart">My Basket</Link>
          </div>


          {/* CONTACT */}

          <div className={styles.footerContact}>
            <h3>Get In Touch</h3>

            <a href="mailto:hello@freshproducedirect.co.uk">
              <Mail size={18} />
              hello@freshproducedirect.co.uk
            </a>

            <a href="tel:+440000000000">
              <Phone size={18} />
              0000 000 000
            </a>

            <div className={styles.location}>
              <MapPin size={18} />

              <span>
                Fresh Produce Direct
                <br />
                Supporting Local Communities
              </span>
            </div>
          </div>

        </div>
      </div>


      {/* ================= FOOTER BENEFITS ================= */}

      <div className={styles.footerBenefits}>
        <div className={styles.benefitsContainer}>

          <div className={styles.benefit}>
            <Truck />
            <span>
              Local Delivery
              <br />
              To Your Area
            </span>
          </div>


          <div className={styles.benefit}>
            <ShieldCheck />
            <span>
              Secure Online
              <br />
              Ordering
            </span>
          </div>


          <div className={styles.benefit}>
            <Leaf />
            <span>
              Freshness
              <br />
              Guaranteed
            </span>
          </div>


          <div className={styles.benefit}>
            <Users />
            <span>
              Supporting
              <br />
              Local Communities
            </span>
          </div>

        </div>
      </div>


      {/* ================= FOOTER BOTTOM ================= */}

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContainer}>

          <p>
            © {new Date().getFullYear()} Fresh Produce Direct.
            All Rights Reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms-and-conditions">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}