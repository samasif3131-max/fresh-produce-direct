"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../../context/CartContext";

import {
  ArrowRight,
  Check,
  Heart,
  Leaf,
  MapPin,
  Package,
  ShoppingBasket,
  Tractor,
  Truck,
  Users,
  ShieldCheck,
} from "lucide-react";

import styles from "./OurBoxes.module.css";

/* =========================================
   BOXES DATA
========================================= */

const boxes = [
  {
    name: "Mixed Veg Box",
    title: "Mixed Veg Box",
    description: "A fresh selection of seasonal vegetables.",
    features: [
      "Seasonal variety",
      "Great value",
      "Perfect for everyday meals",
    ],
    price: "£12.50",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85",
    origin: "Fresh local produce",
    unit: "1 produce box",
  },
  {
    name: "Fruit Box",
    title: "Fruit Box",
    description: "A variety of fresh, seasonal fruits.",
    features: [
      "Seasonal favourites",
      "Great value for healthy snacking",
      "Perfect for families",
    ],
    price: "£12.50",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=85",
    origin: "Fresh seasonal fruit",
    unit: "1 produce box",
  },
  {
    name: "Family Box",
    title: "Family Box",
    description: "A larger box perfect for families.",
    features: [
      "A mix of fruit & vegetables",
      "Great value for families",
      "Everything you need for the week",
    ],
    price: "£20.00",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1000&q=85",
    origin: "Fresh local produce",
    unit: "1 family box",
  },
  {
    name: "Essentials Box",
    title: "Essentials Box",
    description: "All the everyday favourites.",
    features: [
      "Core seasonal vegetables",
      "Ideal for smaller households",
      "Great value",
    ],
    price: "£10.00",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=85",
    origin: "Fresh seasonal produce",
    unit: "1 produce box",
  },
];

/* =========================================
   OUR BOXES PAGE
========================================= */

export default function OurBoxesPage() {
  const { addToCart } = useCart();

  return (
    <main className={styles.ourBoxesPage}>
      <Header />

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className={styles.boxesHero}>
        <div className={styles.boxesHeroOverlay}></div>

        <div className={styles.boxesHeroContainer}>
          <div className={styles.boxesHeroContent}>
            <span className={styles.heroSmallTag}>
              FRESH PRODUCE DIRECT
            </span>

            <h1>Our Boxes</h1>

            <h2>
              Fresh, seasonal produce.
              <br />
              Locally sourced.
              <br />
              Delivered to your door.
            </h2>

            <p>
              Our veg and fruit boxes are packed with fresh, high quality
              produce sourced from local growers, giving you great value while
              supporting local farming and a more sustainable future.
            </p>

            <Link
              href="#choose-box"
              className={styles.boxesHeroButton}
            >
              Choose Your Box
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          FEATURES SECTION
      ===================================== */}

      <section className={styles.boxesFeatures}>
        <div className={styles.boxesFeaturesContainer}>

          <div className={styles.boxesFeature}>
            <MapPin />
            <span>
              Locally
              <br />
              Sourced Produce
            </span>
          </div>

          <div className={styles.boxesFeature}>
            <Tractor />
            <span>
              Supporting
              <br />
              Local Farmers
            </span>
          </div>

          <div className={styles.boxesFeature}>
            <Leaf />
            <span>
              Seasonal &
              <br />
              Sustainable
            </span>
          </div>

          <div className={styles.boxesFeature}>
            <Truck />
            <span>
              Delivered
              <br />
              To Your Door
            </span>
          </div>

          <div className={styles.boxesFeature}>
            <Heart />
            <span>
              Better for You
              <br />
              & Your Family
            </span>
          </div>

        </div>
      </section>

      {/* =====================================
          CHOOSE YOUR BOX
      ===================================== */}

      <section
        className={styles.chooseBoxSection}
        id="choose-box"
      >
        <div className={styles.chooseBoxHeading}>

          <span>FRESH FOR EVERY HOME</span>

          <h2>Choose Your Box</h2>

          <p>
            From everyday essentials to family favourites,
            there&apos;s a box for everyone.
          </p>

        </div>

        <div className={styles.ourBoxesGrid}>

          {boxes.map((box) => (
            <article
              className={styles.ourBoxCard}
              key={box.name}
            >
              <div className={styles.boxImage}>

                {box.popular && (
                  <span className={styles.popularBadge}>
                    MOST POPULAR
                  </span>
                )}

                <img
                  src={box.image}
                  alt={box.title}
                />

              </div>

              <div className={styles.ourBoxCardContent}>

                <h3>{box.title}</h3>

                <p className={styles.boxDescription}>
                  {box.description}
                </p>

                <ul>
                  {box.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.boxCardBottom}>

                  <strong>{box.price}</strong>

                  <button
                    type="button"
                    onClick={() => addToCart(box)}
                  >
                    <ShoppingBasket size={18} />
                    Add to Basket
                  </button>

                </div>

              </div>
            </article>
          ))}

        </div>
      </section>

      {/* =====================================
          WHAT'S IN OUR BOXES
      ===================================== */}

      <section className={styles.whatsInBox}>

        <div className={styles.whatsInBoxImage}>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=90"
            alt="Fresh seasonal produce"
          />
        </div>

        <div className={styles.whatsInBoxContent}>

          <span>SEASONAL & FRESH</span>

          <h2>What&apos;s in our boxes?</h2>

          <p>
            Our boxes change with the seasons, so you always get the freshest
            produce at its best. Contents may vary each week, but you can always
            expect a great mix of high quality, locally sourced fruit and veg.
          </p>

          <Link
            href="/shop"
            className={styles.seasonButton}
          >
            See What&apos;s In Season
            <ArrowRight size={19} />
          </Link>

        </div>

      </section>

      {/* =====================================
          CTA SECTION
      ===================================== */}

      <section className={styles.specificCta}>

        <div className={styles.specificCtaContent}>

          <div className={styles.ctaIcon}>
            <Package size={34} />
          </div>

          <div>
            <h2>Need Something Specific?</h2>

            <p>
              You can also add individual items to your order from our shop.
            </p>
          </div>

          <Link href="/shop">
            Visit Our Shop
            <ArrowRight size={19} />
          </Link>

        </div>

      </section>

      {/* =====================================
          FOOTER FEATURES
      ===================================== */}

      <section className={styles.boxesFooterFeatures}>

        <div className={styles.boxesFooterContainer}>

          <div>
            <Truck />
            <span>
              Local Delivery
              <br />
              To Your Area
            </span>
          </div>

          <div>
            <ShieldCheck />
            <span>
              Secure Online
              <br />
              Ordering
            </span>
          </div>

          <div>
            <Users />
            <span>
              Supporting
              <br />
              Local Communities
            </span>
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}