"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../../context/AuthContext";

import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ArrowRight,
  ShoppingBasket,
  ChevronRight,
} from "lucide-react";

import styles from "./Account.module.css";

export default function AccountPage() {
  const router = useRouter();

  const { user, logout } = useAuth();

  /* USER LOGIN NA HO TO LOGIN PAGE PAR BHEJ DO */
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  /* SIGN OUT FUNCTION */
  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  /* PAGE LOAD HONE TAK */
  if (!user) {
    return null;
  }

  return (
    <main className={styles.accountPage}>
      <Header />

      {/* HERO */}
      <section className={styles.accountHero}>
        <div className={styles.container}>
          <span className={styles.heroTag}>
            MY ACCOUNT
          </span>

          <h1>Welcome Back, {user.firstName}!</h1>

          <p>
            Manage your account, orders, wishlist and delivery details
            all in one place.
          </p>
        </div>
      </section>

      {/* ACCOUNT CONTENT */}
      <section className={styles.accountSection}>
        <div className={styles.container}>

          {/* PROFILE CARD */}
          <div className={styles.profileCard}>
            <div className={styles.profileLeft}>

              <div className={styles.profileIcon}>
                <User size={32} />
              </div>

              <div>
                <span>WELCOME BACK</span>

                <h2>{user.name}</h2>

                <p>{user.email}</p>
              </div>

            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "600",
              }}
            >
              My Account

              <ArrowRight size={18} />
            </div>
          </div>

          {/* ACCOUNT GRID */}
          <div className={styles.accountGrid}>

            {/* ORDERS */}
            <Link
              href="/orders"
              className={styles.accountCard}
            >
              <div className={styles.cardIcon}>
                <Package size={27} />
              </div>

              <div className={styles.cardContent}>
                <h3>My Orders</h3>

                <p>
                  View your recent and previous orders.
                </p>
              </div>

              <ChevronRight
                className={styles.arrow}
                size={21}
              />
            </Link>

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className={styles.accountCard}
            >
              <div className={styles.cardIcon}>
                <Heart size={27} />
              </div>

              <div className={styles.cardContent}>
                <h3>My Wishlist</h3>

                <p>
                  View all your saved favourite products.
                </p>
              </div>

              <ChevronRight
                className={styles.arrow}
                size={21}
              />
            </Link>

            {/* ADDRESSES */}
            <Link
              href="/addresses"
              className={styles.accountCard}
            >
              <div className={styles.cardIcon}>
                <MapPin size={27} />
              </div>

              <div className={styles.cardContent}>
                <h3>Saved Addresses</h3>

                <p>
                  Manage your delivery and collection addresses.
                </p>
              </div>

              <ChevronRight
                className={styles.arrow}
                size={21}
              />
            </Link>

            {/* SETTINGS */}
            <Link
              href="/settings"
              className={styles.accountCard}
            >
              <div className={styles.cardIcon}>
                <Settings size={27} />
              </div>

              <div className={styles.cardContent}>
                <h3>Account Settings</h3>

                <p>
                  Update your personal account details.
                </p>
              </div>

              <ChevronRight
                className={styles.arrow}
                size={21}
              />
            </Link>

          </div>

          {/* SHOP CTA */}
          <div className={styles.shopCTA}>
            <div>
              <span>FRESH • LOCAL • QUALITY</span>

              <h2>Ready for your next order?</h2>

              <p>
                Discover fresh produce sourced from trusted growers.
              </p>
            </div>

            <Link
              href="/shop"
              className={styles.shopButton}
            >
              <ShoppingBasket size={19} />

              Shop Fresh Produce
            </Link>
          </div>

          {/* LOGOUT */}
          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <LogOut size={18} />

            Sign Out
          </button>

        </div>
      </section>

      <Footer />
    </main>
  );
}