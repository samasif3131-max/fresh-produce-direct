"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBasket,
  Check,
} from "lucide-react";

import styles from "./Register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleRegister = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError(
        "Please accept the Terms & Conditions."
      );
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    localStorage.setItem(
      "freshProduceUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "freshProduceLoggedIn",
      "true"
    );

    router.push("/account");
  };

  return (
    <main className={styles.registerPage}>
      <Header />

      {/* HERO */}
      <section className={styles.registerHero}>
        <div className={styles.container}>
          <span className={styles.heroTag}>
            JOIN FRESH PRODUCE DIRECT
          </span>

          <h1>Create Your Account</h1>

          <p>
            Join us today and enjoy fresh, quality produce
            from trusted local growers.
          </p>
        </div>
      </section>

      {/* REGISTER SECTION */}
      <section className={styles.registerSection}>
        <div className={styles.container}>
          <div className={styles.registerWrapper}>

            {/* LEFT SIDE */}
            <div className={styles.sideContent}>
              <span className={styles.sideTag}>
                FRESH • LOCAL • SIMPLE
              </span>

              <h2>
                Fresh Food,
                <br />
                Delivered Better.
              </h2>

              <p>
                Create your account and enjoy a simple way
                to shop for fresh, quality produce for you
                and your family.
              </p>

              <div className={styles.benefits}>
                <div>
                  <span>
                    <Check size={15} />
                  </span>
                  Manage your orders easily
                </div>

                <div>
                  <span>
                    <Check size={15} />
                  </span>
                  Save your favourite products
                </div>

                <div>
                  <span>
                    <Check size={15} />
                  </span>
                  Enjoy a faster checkout
                </div>

                <div>
                  <span>
                    <Check size={15} />
                  </span>
                  Support local growers
                </div>
              </div>
            </div>

            {/* REGISTER CARD */}
            <div className={styles.registerCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <ShoppingBasket size={28} />
                </div>

                <h2>Create Your Account</h2>

                <p>
                  Fill in your details below to get started.
                </p>
              </div>

              <form
                className={styles.registerForm}
                onSubmit={handleRegister}
              >

                {error && (
                  <div
                    style={{
                      background: "#fff1f1",
                      color: "#c62828",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* NAME */}
                <div className={styles.nameGrid}>
                  <div className={styles.inputGroup}>
                    <label>First Name</label>

                    <div className={styles.inputWrapper}>
                      <User size={18} />

                      <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) =>
                          setFirstName(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Last Name</label>

                    <div className={styles.inputWrapper}>
                      <User size={18} />

                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) =>
                          setLastName(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* EMAIL */}
                <div className={styles.inputGroup}>
                  <label>Email Address</label>

                  <div className={styles.inputWrapper}>
                    <Mail size={18} />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className={styles.inputGroup}>
                  <label>Password</label>

                  <div className={styles.inputWrapper}>
                    <Lock size={18} />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
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
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className={styles.inputGroup}>
                  <label>Confirm Password</label>

                  <div className={styles.inputWrapper}>
                    <Lock size={18} />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMS */}
                <label className={styles.terms}>
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) =>
                      setAcceptedTerms(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    I agree to the{" "}
                    <Link href="/terms">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* CREATE BUTTON */}
                <button
                  type="submit"
                  className={styles.createButton}
                >
                  Create Account

                  <ArrowRight size={19} />
                </button>

              </form>

              <div className={styles.loginBox}>
                <p>
                  Already have an account?
                </p>

                <Link href="/login">
                  Sign In
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}