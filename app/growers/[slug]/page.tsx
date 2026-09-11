"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {
  ArrowLeft,
  MapPin,
  Leaf,
  Tractor,
  ShoppingBasket,
  ArrowRight,
} from "lucide-react";

import styles from "./GrowerDetail.module.css";

const growersData: Record<string, any> = {
  "fenland-family-farm": {
    name: "Fenland Family Farm",
    type: "Seasonal Vegetables",
    location: "Donington",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1800&q=90",
    description:
      "Fenland Family Farm is passionate about growing fresh, seasonal vegetables with care, experience and respect for the land.",
  },

  "riverside-orchards": {
    name: "Riverside Orchards",
    type: "Apples & Pears",
    location: "Lincoln",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=1800&q=90",
    description:
      "Riverside Orchards produces delicious traditional orchard fruit, carefully grown and harvested at the perfect time.",
  },

  "meadow-hen-farm": {
    name: "Meadow Hen Farm",
    type: "Free Range Eggs",
    location: "South Holland",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1800&q=90",
    description:
      "Meadow Hen Farm produces high-quality free range eggs while maintaining high standards of animal welfare and sustainable farming.",
  },

  "green-acres-growers": {
    name: "Green Acres Growers",
    type: "Salad & Leafy Greens",
    location: "Spalding",
    image:
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1800&q=90",
    description:
      "Green Acres Growers supplies crisp, fresh salad leaves and leafy greens directly from their local growing operation.",
  },
};

export default function GrowerDetailPage() {
  const params = useParams();

  const slug = params.slug as string;

  const grower = growersData[slug];

  if (!grower) {
    return (
      <main>
        <Header />

        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1>Grower not found</h1>

          <Link href="/growers">
            Back to Our Growers
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.detailPage}>
      <Header />

      {/* HERO */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(12, 48, 30, 0.88),
              rgba(12, 48, 30, 0.45),
              rgba(12, 48, 30, 0.1)
            ),
            url(${grower.image})
          `,
        }}
      >
        <div className={styles.container}>
          <Link
            href="/growers"
            className={styles.backButton}
          >
            <ArrowLeft size={18} />
            Back to Our Growers
          </Link>

          <div className={styles.heroContent}>
            <span>TRUSTED LOCAL GROWER</span>

            <h1>{grower.name}</h1>

            <h2>{grower.type}</h2>

            <div className={styles.location}>
              <MapPin size={18} />
              {grower.location}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div>
              <span className={styles.tag}>
                ABOUT THE GROWER
              </span>

              <h2>
                Fresh Produce,
                <br />
                Grown With Care.
              </h2>

              <p>{grower.description}</p>

              <p>
                We&apos;re proud to work with growers like{" "}
                {grower.name}, helping bring fresh, seasonal food
                directly from local farms to families.
              </p>

              {/* SHOP BUTTON - CORRECT LINK */}
              <Link
                href="/our-boxes"
                className={styles.shopButton}
              >
                <ShoppingBasket size={18} />
                Shop Fresh Produce
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className={styles.infoCard}>
              <Tractor size={42} />

              <h3>Local Farming</h3>

              <p>
                Supporting local agriculture and stronger rural
                communities.
              </p>

              <Leaf size={42} />

              <h3>Fresh & Seasonal</h3>

              <p>
                Carefully grown produce harvested at its best.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}