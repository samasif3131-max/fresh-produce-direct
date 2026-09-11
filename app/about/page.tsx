"use client";

import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  ArrowRight,
  Leaf,
  Tractor,
  Heart,
  Sprout,
  Home,
  ShieldCheck,
  Users,
  Package,
  Truck,
  Box,
} from "lucide-react";

import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <Header />

      {/* ================= HERO SECTION ================= */}

      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>About Us</h1>

            <h2>
              Fresh local produce. Honest values.
              <br />
              A brighter tomorrow.
            </h2>

            <p>
              Fresh Produce Direct connects families with fresh,
              seasonal produce from trusted local growers, while
              supporting local communities and building a more
              sustainable future.
            </p>

            <div className={styles.heroButtons}>
              <Link
                href="/shop"
                className={styles.primaryButton}
              >
                Shop Our Boxes
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/growers"
                className={styles.secondaryButton}
              >
                Meet Our Growers
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroMessage}>
          <span>Fresh Food</span>
          <span>Stronger</span>
          <span>Communities</span>

          <Leaf size={30} />
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}

      <section className={styles.whoWeAre}>
        <div className={styles.whoImage}>
          <div className={styles.imageText}>
            Local
            <br />
            People
            <br />
            Real Change
          </div>
        </div>

        <div className={styles.whoContent}>
          <span className={styles.sectionTag}>
            OUR PURPOSE
          </span>

          <h2>Who We Are</h2>

          <p>
            Fresh Produce Direct is a family-founded business with
            a simple belief — everyone deserves access to fresh,
            nutritious food, and local growers deserve a stronger,
            fairer future.
          </p>

          <p>
            We work directly with trusted British growers to bring
            high-quality, seasonal produce straight to your door.
            By cutting out unnecessary middlemen, we make fresh,
            healthy food more accessible for families, while
            supporting local farms, rural communities and a more
            sustainable food system for generations to come.
          </p>
        </div>

        <div className={styles.sideMessage}>
          <Sprout size={58} />

          <span>
            Good Food
            <br />
            Brighter
            <br />
            Futures
          </span>
        </div>
      </section>

      {/* ================= VALUES ================= */}

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              OUR VALUES
            </span>

            <h2>What We Stand For</h2>

            <p>
              Everything we do is guided by a set of core values
              that keep us rooted in what matters.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Leaf size={42} />

              <h3>Freshness First</h3>

              <p>
                We’re passionate about providing the freshest,
                seasonal produce, full of flavour and goodness.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Tractor size={42} />

              <h3>Supporting Local Growers</h3>

              <p>
                We work with trusted British growers, helping
                their businesses thrive while keeping communities
                strong.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Heart size={42} />

              <h3>Affordable Family Produce</h3>

              <p>
                We believe everyone should have access to fresh,
                healthy food, without compromise.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Sprout size={42} />

              <h3>A Brighter Tomorrow</h3>

              <p>
                We’re committed to a more sustainable food system
                for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              OUR JOURNEY
            </span>

            <h2>Why Families Choose Us</h2>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyItem}>
              <Leaf size={40} />

              <div>
                <h3>Seasonal Produce</h3>

                <p>
                  Fresh, in season produce at its best, full of
                  flavour and nutrition.
                </p>
              </div>
            </div>

            <div className={styles.whyItem}>
              <Home size={40} />

              <div>
                <h3>Convenient Home Delivery</h3>

                <p>
                  Fresh produce delivered direct to your door,
                  on a day that suits you.
                </p>
              </div>
            </div>

            <div className={styles.whyItem}>
              <ShieldCheck size={40} />

              <div>
                <h3>Carefully Selected Quality</h3>

                <p>
                  We handpick the best produce from trusted local
                  growers so you can shop with confidence.
                </p>
              </div>
            </div>

            <div className={styles.whyItem}>
              <Users size={40} />

              <div>
                <h3>Supporting Local Communities</h3>

                <p>
                  Every box helps local families, strengthens rural
                  communities and supports a fairer food system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FROM FARM TO YOU ================= */}

      <section className={styles.journeySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              FROM FARM TO YOU
            </span>

            <h2>From Field to Front Door</h2>

            <p>
              A simple journey. A better food system. A brighter tomorrow.
            </p>
          </div>

          <div className={styles.journeyGrid}>
            <div className={styles.journeyItem}>
              <div className={styles.number}>1</div>

              <div className={styles.journeyIcon}>
                <Sprout size={30} />
              </div>

              <h3>Local Growers</h3>

              <p>
                We partner with trusted British farmers who grow
                with care and integrity.
              </p>
            </div>

            <div className={styles.journeyItem}>
              <div className={styles.number}>2</div>

              <div className={styles.journeyIcon}>
                <Leaf size={30} />
              </div>

              <h3>Fresh Picking</h3>

              <p>
                Produce is harvested at the peak of freshness,
                straight from the fields.
              </p>
            </div>

            <div className={styles.journeyItem}>
              <div className={styles.number}>3</div>

              <div className={styles.journeyIcon}>
                <Box size={30} />
              </div>

              <h3>Careful Packing</h3>

              <p>
                Your produce is carefully packed to keep it fresh
                and in perfect condition.
              </p>
            </div>

            <div className={styles.journeyItem}>
              <div className={styles.number}>4</div>

              <div className={styles.journeyIcon}>
                <Truck size={30} />
              </div>

              <h3>Delivered to Your Door</h3>

              <p>
                We bring the goodness directly to your home,
                fresh and ready to enjoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMITMENT ================= */}

      <section className={styles.commitmentSection}>
        <div className={styles.commitmentOverlay}></div>

        <div className={styles.container}>
          <div className={styles.commitmentContent}>
            <span className={styles.sectionTag}>
              OUR COMMITMENT
            </span>

            <h2>
              Better food. Stronger communities.
              <br />
              A healthier planet.
            </h2>

            <p>
              We’re committed to reducing food miles, minimising
              waste, and supporting sustainable farming practices.
              Through strong partnerships with local growers, we
              help protect the environment, support rural communities
              and bring fresh, healthy food to more families.
            </p>

            <Link
              href="/growers"
              className={styles.whiteButton}
            >
              Meet Our Growers
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.commitmentMessage}>
            Healthy Land
            <br />
            Healthy People
            <br />
            Brighter Tomorrows
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className={styles.finalCTA}>
        <div className={styles.finalOverlay}></div>

        <div className={styles.container}>
          <div className={styles.finalContent}>
            <h2>
              Ready to fill your home
              <br />
              with fresh produce?
            </h2>

            <p>
              Explore our range of fresh produce boxes, filled
              with the best local produce.
            </p>

            <Link
              href="/boxes"
              className={styles.primaryButton}
            >
              View Our Boxes
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className={styles.finalMessage}>
          Fresh Choices
          <br />
          Brighter Tomorrows
          <Leaf size={28} />
        </div>
      </section>

      <Footer />
    </main>
  );
}