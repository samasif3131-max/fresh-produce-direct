"use client";

import { useState } from "react";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Leaf,
  Truck,
  Users,
  CheckCircle,
} from "lucide-react";

import styles from "./Contact.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Please complete your name, email address and message.");
      return;
    }

    if (!email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setStatus(
        "Thanks! Your message has been received. Our friendly team will get back to you soon."
      );

      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 900);
  };

  return (
    <main className={styles.contactPage}>
      <Header />

      {/* ================= HERO ================= */}

      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              WE'D LOVE TO HEAR FROM YOU
            </span>

            <h1>
              Let's Talk
              <br />
              Fresh Produce.
            </h1>

            <p>
              Have a question about our produce, deliveries or local growers?
              Our friendly team is always happy to help.
            </p>

            <a
              href="#contact-form"
              className={styles.heroButton}
            >
              Get In Touch
              <ArrowRight size={19} />
            </a>
          </div>
        </div>

        <div className={styles.heroMessage}>
          <span>Fresh Food</span>
          <span>Friendly People</span>

          <Leaf size={28} />
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}

      <section className={styles.contactInfo}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Phone size={25} />
              </div>

              <h3>Give Us A Call</h3>

              <p>
                Our friendly team is here to help with your questions.
              </p>

              <a href="tel:+441754270128">
                Call Our Team
                <ArrowRight size={16} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Mail size={25} />
              </div>

              <h3>Send Us An Email</h3>

              <p>
                Send us a message and we'll get back to you as soon as possible.
              </p>

              <a href="mailto:info@freshproducedirect.co.uk">
                Email Us
                <ArrowRight size={16} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <MapPin size={25} />
              </div>

              <h3>Our Local Area</h3>

              <p>
                Proudly supporting families and local growers around Spalding
                and Donington.
              </p>

              <Link href="/delivery">
                View Delivery Areas
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Clock size={25} />
              </div>

              <h3>We're Here To Help</h3>

              <p>
                Get in touch and our team will respond as quickly as possible.
              </p>

              <a href="#contact-form">
                Send A Message
                <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}

      <section
        className={styles.formSection}
        id="contact-form"
      >
        <div className={styles.container}>
          <div className={styles.formGrid}>

            {/* LEFT CONTENT */}

            <div className={styles.formIntro}>
              <span className={styles.sectionTag}>
                GET IN TOUCH
              </span>

              <h2>
                We're Here
                <br />
                To Help.
              </h2>

              <p>
                Whether you have a question about your order, want to know
                more about our delivery areas or simply want to learn more
                about Fresh Produce Direct, we'd love to hear from you.
              </p>

              <div className={styles.contactPoints}>
                <div>
                  <CheckCircle size={20} />

                  <span>
                    Friendly local customer support
                  </span>
                </div>

                <div>
                  <CheckCircle size={20} />

                  <span>
                    Help with orders and deliveries
                  </span>
                </div>

                <div>
                  <CheckCircle size={20} />

                  <span>
                    Questions about our fresh produce
                  </span>
                </div>
              </div>

              <div className={styles.formDecorativeText}>
                Local Food
                <br />
                Friendly Service
                <Leaf size={35} />
              </div>
            </div>

            {/* FORM */}

            <div className={styles.formCard}>
              <h3>Send Us A Message</h3>

              <p>
                Fill in the form below and we'll get back to you soon.
              </p>

              <form onSubmit={handleSubmit}>

                <div className={styles.twoInputs}>
                  <div className={styles.inputGroup}>
                    <label>Your Name *</label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Email Address *</label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>What Can We Help With?</label>

                  <select
                    value={subject}
                    onChange={(event) =>
                      setSubject(event.target.value)
                    }
                  >
                    <option value="">
                      Select a subject
                    </option>

                    <option value="Order">
                      My Order
                    </option>

                    <option value="Delivery">
                      Delivery Question
                    </option>

                    <option value="Produce">
                      Fresh Produce
                    </option>

                    <option value="Growers">
                      Our Growers
                    </option>

                    <option value="Other">
                      Something Else
                    </option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Your Message *</label>

                  <textarea
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                  />
                </div>

                {status && (
                  <div
                    className={
                      status.startsWith("Thanks")
                        ? styles.successMessage
                        : styles.errorMessage
                    }
                  >
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading
                    ? "Sending..."
                    : "Send Message"}

                  <Send size={18} />
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ================= LOCAL PROMISE ================= */}

      <section className={styles.promiseSection}>
        <div className={styles.promiseOverlay}></div>

        <div className={styles.container}>
          <div className={styles.promiseContent}>
            <span className={styles.sectionTag}>
              OUR LOCAL PROMISE
            </span>

            <h2>
              Fresh Produce.
              <br />
              Local People.
              <br />
              Real Care.
            </h2>

            <p>
              We're proud to be part of our local community, connecting
              families with fresh produce and supporting the growers who
              make it possible.
            </p>

            <Link
              href="/growers"
              className={styles.whiteButton}
            >
              Meet Our Growers
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.promiseMessage}>
            Stronger
            <br />
            Communities
            <br />
            Brighter
            <br />
            Futures
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}

      <section className={styles.quickSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              EXPLORE MORE
            </span>

            <h2>How Can We Help?</h2>

            <p>
              Find the information you're looking for quickly.
            </p>
          </div>

          <div className={styles.quickGrid}>

            <Link
              href="/delivery"
              className={styles.quickCard}
            >
              <Truck size={32} />

              <h3>Delivery Information</h3>

              <p>
                Check delivery areas, days and options.
              </p>

              <ArrowRight size={19} />
            </Link>

            <Link
              href="/growers"
              className={styles.quickCard}
            >
              <Users size={32} />

              <h3>Meet Our Growers</h3>

              <p>
                Discover the local people behind your produce.
              </p>

              <ArrowRight size={19} />
            </Link>

            <Link
              href="/our-boxes"
              className={styles.quickCard}
            >
              <Leaf size={32} />

              <h3>Our Fresh Boxes</h3>

              <p>
                Explore our range of fresh produce boxes.
              </p>

              <ArrowRight size={19} />
            </Link>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className={styles.finalCTA}>
        <div className={styles.finalOverlay}></div>

        <div className={styles.container}>
          <div className={styles.finalContent}>
            <span>FRESH • LOCAL • QUALITY</span>

            <h2>
              Ready To Enjoy
              <br />
              Fresh Produce?
            </h2>

            <p>
              Explore our fresh produce and discover the difference local
              food can make.
            </p>

            <Link
              href="/our-boxes"
              className={styles.finalButton}
            >
              Shop Our Boxes
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className={styles.finalMessage}>
          Fresh Choices
          <br />
          Brighter Tomorrow
          <Leaf size={27} />
        </div>
      </section>

      <Footer />
    </main>
  );
}