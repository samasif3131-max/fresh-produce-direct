"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  ArrowRight,
  Truck,
  CalendarDays,
  House,
  Leaf,
  MapPin,
  Settings,
  Coins,
  Headphones,
  ShoppingBasket,
  Package,
  CheckCircle2,
  ChevronDown,
  Mail,
} from "lucide-react";

import {
  checkPostcodeDelivery,
  formatPostcode,
  type DeliveryCheckResult,
} from "../lib/postcode";

import styles from "./Delivery.module.css";

/* =========================================
   FAQ DATA
========================================= */

const faqs = [
  {
    question: "What areas do you deliver to?",
    answer:
      "We currently deliver to selected areas around Spalding, Donington and surrounding villages. Enter your postcode above to check whether your area is currently covered.",
  },
  {
    question: "How much does delivery cost?",
    answer:
      "Delivery charges are simple and transparent. Your delivery area and any applicable delivery fee can be confirmed when your postcode is checked.",
  },
  {
    question: "What days do you deliver?",
    answer:
      "Delivery days depend on your delivery zone. Once your postcode is covered, available delivery days can be shown for your area.",
  },
  {
    question: "What happens if nobody is home?",
    answer:
      "If you're not home, we offer leave-safe options where suitable. Please provide any delivery instructions when placing your order.",
  },
  {
    question: "Can I change my delivery day?",
    answer:
      "Where possible, contact us as soon as possible and we'll do our best to accommodate your requested delivery change.",
  },
  {
    question: "Are you expanding to more areas?",
    answer:
      "Yes. We're always looking at ways to support more local communities as Fresh Produce Direct continues to grow.",
  },
];

/* =========================================
   POSTCODE CHECKER
========================================= */

function PostcodeChecker({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] =
    useState<DeliveryCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!postcode.trim()) {
      setResult({
        serviceable: false,
        reason: "INVALID_POSTCODE",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const deliveryResult = checkPostcodeDelivery(postcode);

      setResult(deliveryResult);
      setLoading(false);
    }, 700);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPostcode(event.target.value);
    setResult(null);
  };

  return (
    <div
      className={
        compact
          ? styles.postcodeCheckerCompact
          : styles.postcodeChecker
      }
    >
      <div className={styles.postcodeRow}>
        <div className={styles.postcodeInput}>
          <MapPin size={20} />

          <input
            type="text"
            placeholder="Enter your postcode"
            value={postcode}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCheck();
              }
            }}
            aria-label="Enter your postcode"
          />
        </div>

        <button
          type="button"
          className={styles.checkButton}
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <>
          {result.serviceable ? (
            <div
              className={styles.successMessage}
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 size={19} />

              <div>
                <strong>
                  Great news! We deliver to{" "}
                  {result.postcode ||
                    formatPostcode(postcode)}
                </strong>

                {result.zone && (
                  <span>
                    Your delivery area: {result.zone.name}
                    <br />
                    Delivery days:{" "}
                    {result.zone.deliveryDays.join(" & ")}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div
              className={styles.errorMessage}
              role="alert"
              aria-live="assertive"
            >
              {result.reason === "INVALID_POSTCODE"
                ? postcode.trim()
                  ? "Please enter a valid UK postcode."
                  : "Please enter your postcode."
                : `Sorry, we're not delivering to ${
                    result.postcode ||
                    formatPostcode(postcode)
                  } yet.`}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* =========================================
   DELIVERY PAGE
========================================= */

export default function DeliveryPage() {
  const [openFAQ, setOpenFAQ] =
    useState<number | null>(null);

  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] =
    useState("");

  const handleNewsletter = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setNewsletterMessage(
        "Please enter a valid email address."
      );
      return;
    }

    setNewsletterMessage(
      "Thanks! We'll let you know when delivery expands to your area."
    );

    setEmail("");
  };

  return (
    <main className={styles.deliveryPage}>
      <Header />

      {/* =========================================
          HERO
      ========================================= */}

      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              LOCAL • FRESH • RELIABLE
            </span>

            <h1>
              Local Delivery
              <br />
              Straight To Your Door
            </h1>

            <p>
              Fresh produce. Delivered to your area.
              <br />
              On time, every time.
            </p>

            <PostcodeChecker />

            <a
              href="#delivery-coverage"
              className={styles.heroCTA}
            >
              Check If We Deliver To You
              <ArrowRight size={20} />
            </a>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.deliveryBadge}>
              <span>Fresh Produce</span>

              <strong>
                Delivered Locally
              </strong>

              <Leaf size={30} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BENEFITS
      ========================================= */}

      <section className={styles.benefitsBar}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <Truck />

              <div>
                <h3>Local Delivery</h3>

                <p>
                  Supporting Local Communities
                </p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <CalendarDays />

              <div>
                <h3>Flexible Delivery Days</h3>

                <p>
                  To Suit Your Routine
                </p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <House />

              <div>
                <h3>Leave Safe Options</h3>

                <p>
                  Available
                </p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <Leaf />

              <div>
                <h3>Freshness Guaranteed</h3>

                <p>
                  Picked, packed and delivered with care
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          DELIVERY INFORMATION
      ========================================= */}

      <section
        className={styles.deliveryInfo}
        id="delivery-information"
      >
        <div className={styles.decorLeafOne}>
          <Leaf />
        </div>

        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>DELIVERY MADE SIMPLE</span>

            <h2>
              Our Delivery Information
            </h2>

            <p>
              Everything you need to know about getting
              your fresh produce delivered.
            </p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <MapPin />
              </div>

              <h3>Delivery Areas</h3>

              <p>
                We currently deliver to selected areas
                around Spalding, Donington and surrounding
                villages. Check your postcode below to see
                if we deliver to your area.
              </p>

              <a href="#delivery-coverage">
                Check Your Postcode
                <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <CalendarDays />
              </div>

              <h3>Delivery Days</h3>

              <p>
                We offer flexible delivery days throughout
                the week depending on your location and
                delivery schedule.
              </p>

              <a href="#how-delivery-works">
                View Available Days
                <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Settings />
              </div>

              <h3>How It Works</h3>

              <p>
                You choose your produce, we pick and pack
                it fresh, then deliver it directly to your
                door.
              </p>

              <a href="#how-delivery-works">
                Learn More
                <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <House />
              </div>

              <h3>Leave Safe</h3>

              <p>
                Can't be in? No problem. We offer leave
                safe options so your fresh produce can
                still be delivered.
              </p>

              <a href="#delivery-faq">
                Find Out More
                <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Coins />
              </div>

              <h3>Delivery Costs</h3>

              <p>
                Our delivery charges are simple and
                transparent, with free delivery on selected
                orders.
              </p>

              <a href="#delivery-faq">
                View Delivery Prices
                <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Headphones />
              </div>

              <h3>Need Help?</h3>

              <p>
                Our friendly team is here to help with any
                delivery questions.
              </p>

              <Link href="/contact">
                Contact Us
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          DELIVERY COVERAGE
      ========================================= */}

      <section
        className={styles.coverageSection}
        id="delivery-coverage"
      >
        <div className={styles.container}>
          <div className={styles.coverageGrid}>
            <div className={styles.coverageContent}>
              <span className={styles.lightTag}>
                DELIVERY COVERAGE
              </span>

              <h2>
                Check Our
                <br />
                Delivery Coverage
              </h2>

              <p>
                We currently deliver to Spalding,
                Donington and surrounding villages.
              </p>

              <p>
                Enter your postcode to see if we deliver
                to your area.
              </p>

              <PostcodeChecker compact />

              <div className={styles.expandingText}>
                <Leaf size={24} />

                <span>
                  Expanding to more areas soon!
                </span>
              </div>
            </div>

            <div className={styles.mapVisual}>
              <div className={styles.mapGridLines} />

              <div
                className={`${styles.mapRoad} ${styles.roadOne}`}
              />

              <div
                className={`${styles.mapRoad} ${styles.roadTwo}`}
              />

              <div
                className={`${styles.mapRoad} ${styles.roadThree}`}
              />

              <div
                className={`${styles.mapLocation} ${styles.locationSpalding}`}
              >
                <MapPin size={23} />

                <strong>
                  Spalding
                </strong>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationDonington}`}
              >
                <MapPin size={20} />

                <strong>
                  Donington
                </strong>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationPinchbeck}`}
              >
                <MapPin size={18} />

                <span>
                  Pinchbeck
                </span>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationWeston}`}
              >
                <MapPin size={18} />

                <span>
                  Weston
                </span>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationMoulton}`}
              >
                <MapPin size={18} />

                <span>
                  Moulton
                </span>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationSurfleet}`}
              >
                <MapPin size={18} />

                <span>
                  Surfleet
                </span>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationHolbeach}`}
              >
                <MapPin size={18} />

                <span>
                  Holbeach
                </span>
              </div>

              <div
                className={`${styles.mapLocation} ${styles.locationSutton}`}
              >
                <MapPin size={18} />

                <span>
                  Long Sutton
                </span>
              </div>

              <div className={styles.coverageBadge}>
                <strong>
                  Delivering
                  <br />
                  Fresher Food to
                  <br />
                  Local Communities
                </strong>

                <Truck size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          HOW DELIVERY WORKS
      ========================================= */}

      <section
        className={styles.processSection}
        id="how-delivery-works"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>
              FRESH FROM FARM TO DOOR
            </span>

            <h2>
              How Delivery Works
            </h2>

            <p>
              From our fields to your table – fresh,
              simple and local.
            </p>
          </div>

          <div className={styles.processGrid}>
            <div className={styles.processItem}>
              <div className={styles.stepNumber}>
                1
              </div>

              <div className={styles.processIcon}>
                <ShoppingBasket />
              </div>

              <h3>
                Choose Your Produce
              </h3>

              <p>
                Select from our boxes or shop fresh
                produce online.
              </p>
            </div>

            <ArrowRight
              className={styles.processArrow}
            />

            <div className={styles.processItem}>
              <div className={styles.stepNumber}>
                2
              </div>

              <div className={styles.processIcon}>
                <Package />
              </div>

              <h3>
                We Pick & Pack
              </h3>

              <p>
                Our local growers pick and pack your
                order fresh.
              </p>
            </div>

            <ArrowRight
              className={styles.processArrow}
            />

            <div className={styles.processItem}>
              <div className={styles.stepNumber}>
                3
              </div>

              <div className={styles.processIcon}>
                <Truck />
              </div>

              <h3>
                We Deliver
              </h3>

              <p>
                We bring it to your door on your chosen
                day.
              </p>
            </div>

            <ArrowRight
              className={styles.processArrow}
            />

            <div className={styles.processItem}>
              <div className={styles.stepNumber}>
                4
              </div>

              <div className={styles.processIcon}>
                <Leaf />
              </div>

              <h3>
                Enjoy Fresh Produce
              </h3>

              <p>
                Unpack, enjoy and feel the difference!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FAQ
      ========================================= */}

      <section
        className={styles.faqSection}
        id="delivery-faq"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>
              HELP & SUPPORT
            </span>

            <h2>
              Delivery FAQs
            </h2>

            <p>
              Got a question? We've got you covered.
            </p>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div
                className={styles.faqItem}
                key={faq.question}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() =>
                    setOpenFAQ(
                      openFAQ === index
                        ? null
                        : index
                    )
                  }
                  aria-expanded={
                    openFAQ === index
                  }
                >
                  <span>
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={
                      openFAQ === index
                        ? styles.rotateIcon
                        : ""
                    }
                  />
                </button>

                <div
                  className={
                    openFAQ === index
                      ? styles.faqAnswerOpen
                      : styles.faqAnswer
                  }
                >
                  <p>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          WAITING LIST
      ========================================= */}

      <section className={styles.waitingSection}>
        <div className={styles.waitingOverlay} />

        <div className={styles.container}>
          <div className={styles.waitingGrid}>
            <div className={styles.waitingContent}>
              <span>
                STAY UPDATED
              </span>

              <h2>
                Not in our delivery
                area yet?
              </h2>

              <p>
                Join our waiting list and we'll let you
                know when we expand.
              </p>

              <form
                className={styles.waitingForm}
                onSubmit={handleNewsletter}
              >
                <div>
                  <Mail size={19} />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setNewsletterMessage("");
                    }}
                    aria-label="Email address"
                  />
                </div>

                <button type="submit">
                  Join Updates
                  <ArrowRight size={18} />
                </button>
              </form>

              {newsletterMessage && (
                <p
                  className={
                    styles.newsletterMessage
                  }
                >
                  {newsletterMessage}
                </p>
              )}
            </div>

            <div className={styles.waitingMessage}>
              <span>
                More
              </span>

              <span>
                Communities
              </span>

              <span>
                Healthier Futures
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}