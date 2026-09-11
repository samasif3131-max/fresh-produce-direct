"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../../context/AuthContext";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBasket,
} from "lucide-react";

import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email address and password.");
      return;
    }

    setLoading(true);

    const success = login(
      email.trim().toLowerCase(),
      password
    );

    if (!success) {
      setError("Incorrect email address or password.");
      setLoading(false);
      return;
    }

    /*
      Remember Me abhi local authentication ke saath
      account session ko maintain karega.
    */
    if (rememberMe) {
      localStorage.setItem(
        "freshProduceRememberMe",
        "true"
      );
    } else {
      localStorage.removeItem(
        "freshProduceRememberMe"
      );
    }

    router.push("/account");
  };

  return (
    <main className={styles.loginPage}>
      <Header />

      {/* HERO */}
      <section className={styles.loginHero}>
        <div className={styles.container}>
          <span className={styles.heroTag}>
            WELCOME BACK
          </span>

          <h1>Sign In to Your Account</h1>

          <p>
            Access your account, manage your orders and continue shopping
            for fresh local produce.
          </p>
        </div>
      </section>

      {/* LOGIN SECTION */}
      <section className={styles.loginSection}>
        <div className={styles.container}>
          <div className={styles.loginWrapper}>

            {/* LOGIN CARD */}
            <div className={styles.loginCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <ShoppingBasket size={28} />
                </div>

                <h2>Welcome Back</h2>

                <p>
                  Enter your details below to sign in to your account.
                </p>
              </div>

              <form
                className={styles.loginForm}
                onSubmit={handleSubmit}
              >

                {/* ERROR MESSAGE */}
                {error && (
                  <div
                    style={{
                      background: "#fff1f1",
                      color: "#b42318",
                      border: "1px solid #fecaca",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      marginBottom: "18px",
                      fontSize: "14px",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* EMAIL */}
                <div className={styles.inputGroup}>
                  <label>Email Address</label>

                  <div className={styles.inputWrapper}>
                    <Mail size={19} />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className={styles.inputGroup}>
                  <div className={styles.passwordLabel}>
                    <label>Password</label>

                    <Link href="/forgot-password">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className={styles.inputWrapper}>
                    <Lock size={19} />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                    />

                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* REMEMBER */}
                <label className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}

                  <ArrowRight size={19} />
                </button>
              </form>

              {/* DIVIDER */}
              <div className={styles.divider}>
                <span>OR</span>
              </div>

              {/* REGISTER */}
              <div className={styles.registerBox}>
                <h3>New to Fresh Produce Direct?</h3>

                <p>
                  Create an account to manage your orders and enjoy a
                  faster shopping experience.
                </p>

                <Link
                  href="/register"
                  className={styles.registerButton}
                >
                  Create an Account
                </Link>
              </div>
            </div>

            {/* SIDE CONTENT */}
            <div className={styles.sideContent}>
              <span className={styles.sideTag}>
                FRESH • LOCAL • QUALITY
              </span>

              <h2>
                Fresh Produce,
                <br />
                Made Simple.
              </h2>

              <p>
                Sign in to manage your orders, save your favourite
                products and enjoy fresh produce from trusted growers.
              </p>

              <div className={styles.benefits}>
                <div>
                  <span>✓</span>
                  Manage your orders easily
                </div>

                <div>
                  <span>✓</span>
                  Save your favourite products
                </div>

                <div>
                  <span>✓</span>
                  Faster checkout experience
                </div>

                <div>
                  <span>✓</span>
                  Fresh produce from local growers
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}