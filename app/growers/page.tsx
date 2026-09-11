"use client";

import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  ArrowRight,
  Leaf,
  Sprout,
  MapPin,
  CheckCircle,
  Package,
  Truck,
  Handshake,
  Users,
  ShieldCheck,
} from "lucide-react";

import styles from "./Growers.module.css";

const growers = [
  {
    name: "Fenland Family Farm",
    type: "Seasonal vegetables",
    description:
      "Fresh field-grown produce with a focus on quality and flavour.",
    location: "Donington",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=85",
    slug: "fenland-family-farm",
  },
  {
    name: "Riverside Orchards",
    type: "Apples & pears",
    description:
      "Traditional orchard fruit grown with care and harvested in season.",
    location: "Lincoln",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=900&q=85",
    slug: "riverside-orchards",
  },
  {
    name: "Meadow Hen Farm",
    type: "Free range eggs",
    description:
      "Ethically produced eggs from a trusted local farm.",
    location: "South Holland",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=85",
    slug: "meadow-hen-farm",
  },
  {
    name: "Green Acres Growers",
    type: "Salad & leafy greens",
    description:
      "Crisp, fresh leaves supplied direct from local growers.",
    location: "Spalding",
    image:
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=85",
    slug: "green-acres-growers",
  },
];

export default function GrowersPage() {
  return (
    <main className={styles.growersPage}>
      <Header />

      {/* ================= HERO ================= */}

      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Our Growers</h1>

            <h2>
              Trusted local farmers. Fresher produce.
              <br />
              Stronger communities.
            </h2>

            <p>
              Fresh Produce Direct works with trusted local growers to bring
              fresh, seasonal produce directly to families, while supporting
              local farming, healthier communities and a brighter tomorrow.
            </p>

            <div className={styles.heroButtons}>
              <a
                href="#featured-growers"
                className={styles.primaryButton}
              >
                Meet Our Growers
                <ArrowRight size={18} />
              </a>

              {/* CORRECT OUR BOXES LINK */}
              <Link
                href="/our-boxes"
                className={styles.secondaryButton}
              >
                Shop Our Boxes
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroMessage}>
          <span>Real Food</span>
          <span>Stronger</span>
          <span>Communities</span>

          <Leaf size={30} />
        </div>
      </section>

      {/* ================= WHY GROWERS MATTER ================= */}

      <section className={styles.impactSection}>
        <div className={styles.impactImage}>
          <div className={styles.impactImageText}>
            Good
            <br />
            Growers
            <br />
            Brighter
            <br />
            Futures
          </div>
        </div>

        <div className={styles.impactContent}>
          <span className={styles.sectionTag}>
            OUR IMPACT
          </span>

          <h2>Why Our Growers Matter</h2>

          <p>
            Our growers are at the heart of everything we do. By working with
            local farmers, we bring you fresher, tastier produce with lower
            food miles, support rural communities and help create fairer,
            more sustainable supply chains.
          </p>

          <p>
            Choosing local means better food, stronger communities and a
            healthier environment for future generations.
          </p>
        </div>

        <div className={styles.impactMessage}>
          <Sprout size={60} />

          <span>
            Local
            <br />
            People
            <br />
            Real Change
          </span>
        </div>
      </section>

      {/* ================= FEATURED GROWERS ================= */}

      <section
        className={styles.featuredSection}
        id="featured-growers"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              OUR GROWERS
            </span>

            <h2>Featured Growers</h2>

            <p>
              Meet some of the local farmers who proudly supply Fresh Produce
              Direct.
            </p>
          </div>

          <div className={styles.growersGrid}>
            {growers.map((grower) => (
              <div
                className={styles.growerCard}
                key={grower.slug}
              >
                <div className={styles.growerImage}>
                  <img
                    src={grower.image}
                    alt={grower.name}
                  />
                </div>

                <div className={styles.growerContent}>
                  <h3>{grower.name}</h3>

                  <h4>{grower.type}</h4>

                  <p>{grower.description}</p>

                  <div className={styles.location}>
                    <MapPin size={16} />
                    {grower.location}
                  </div>

                  <Link
                    href={`/growers/${grower.slug}`}
                    className={styles.viewButton}
                  >
                    View Grower
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}

      <section className={styles.journeySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              OUR JOURNEY
            </span>

            <h2>From Farm to Front Door</h2>

            <p>
              A simple journey. A brighter tomorrow.
            </p>
          </div>

          <div className={styles.journeyGrid}>
            <div className={styles.journeyItem}>
              <div className={styles.number}>1</div>

              <div>
                <Sprout size={36} />

                <h3>Grown Locally</h3>

                <p>
                  Our trusted growers cultivate seasonal produce with care
                  and expertise.
                </p>
              </div>
            </div>

            <div className={styles.journeyItem}>
              <div className={styles.number}>2</div>

              <div>
                <CheckCircle size={36} />

                <h3>Carefully Selected</h3>

                <p>
                  We handpick the best produce to ensure the highest quality
                  and freshness.
                </p>
              </div>
            </div>

            <div className={styles.journeyItem}>
              <div className={styles.number}>3</div>

              <div>
                <Package size={36} />

                <h3>Packed Fresh</h3>

                <p>
                  Your produce is carefully packed to keep it fresh and in
                  perfect condition.
                </p>
              </div>
            </div>

            <div className={styles.journeyItem}>
              <div className={styles.number}>4</div>

              <div>
                <Truck size={36} />

                <h3>Delivered To Your Door</h3>

                <p>
                  We bring the goodness directly to you, fresh and ready to
                  enjoy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionTag}>
              OUR VALUES
            </span>

            <h2>What We Look For In Our Growers</h2>

            <p>
              We partner with growers who share our values and commitment to
              a better food future.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Leaf size={42} />

              <div>
                <h3>Quality Produce</h3>

                <p>
                  Great tasting, seasonal produce, grown with care.
                </p>
              </div>
            </div>

            <div className={styles.valueCard}>
              <Sprout size={42} />

              <div>
                <h3>Sustainable Methods</h3>

                <p>
                  Environmentally responsible farming for healthier
                  tomorrows.
                </p>
              </div>
            </div>

            <div className={styles.valueCard}>
              <Users size={42} />

              <div>
                <h3>Local Commitment</h3>

                <p>
                  Invested in local communities and rural livelihoods.
                </p>
              </div>
            </div>

            <div className={styles.valueCard}>
              <Handshake size={42} />

              <div>
                <h3>Trusted Relationships</h3>

                <p>
                  Long-term partnerships built on fairness and shared values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNER SECTION ================= */}

      <section className={styles.partnerSection}>
        <div className={styles.partnerOverlay}></div>

        <div className={styles.container}>
          <div className={styles.partnerContent}>
            <span className={styles.sectionTag}>
              SUPPORTING LOCAL GROWERS
            </span>

            <h2>
              Stronger Growers
              <br />
              Healthier Communities
            </h2>

            <p>
              We&apos;re proud to support British growers, helping to create
              a fairer, more sustainable food system for generations to
              come.
            </p>

            <Link
              href="/contact"
              className={styles.partnerButton}
            >
              Become a Grower Partner
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className={styles.partnerMessage}>
            Healthy Land
            <br />
            Healthy People
            <br />
            Brighter Tomorrows
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}

      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            <div>
              <Leaf size={35} />

              <span>
                <strong>Seasonal Produce</strong>
                Fresh, in season, full of flavour
              </span>
            </div>

            <div>
              <MapPin size={35} />

              <span>
                <strong>Locally Sourced</strong>
                From trusted local growers
              </span>
            </div>

            <div>
              <ShieldCheck size={35} />

              <span>
                <strong>Freshness Guaranteed</strong>
                Picked and delivered with care
              </span>
            </div>

            <div>
              <Users size={35} />

              <span>
                <strong>Supporting Rural Communities</strong>
                Stronger farms and communities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className={styles.finalCTA}>
        <div className={styles.finalOverlay}></div>

        <div className={styles.container}>
          <div className={styles.finalContent}>
            <h2>Ready to taste the difference?</h2>

            <p>
              Shop our range of fresh produce boxes and support local growers.
            </p>

            {/* CORRECT OUR BOXES LINK */}
            <Link
              href="/our-boxes"
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
          Brighter Tomorrow
          <Leaf size={28} />
        </div>
      </section>

      <Footer />
    </main>
  );
}