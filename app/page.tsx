"use client";

import { useState } from "react";
import Link from "next/link";

import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  Leaf,
  MapPin,
  House,
  ArrowRight,
  Tractor,
  Heart,
  Sprout,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/* =========================================
   PRODUCE BOXES DATA
========================================= */

const boxes = [
  {
    title: "Mixed Veg Box",
    description: "A fresh selection of seasonal vegetables.",
    price: "From £12.50",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Fruit Box",
    description: "A variety of fresh, seasonal fruits.",
    price: "From £12.50",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Family Box",
    description: "A larger box perfect for families.",
    price: "From £20.00",
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Essentials Box",
    description: "All the everyday favourites.",
    price: "From £10.00",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80",
  },
];

/* =========================================
   TYPES
========================================= */

type DeliveryResult = {
  serviceable: boolean;
  postcode?: string;
  zone?: {
    name?: string;
    deliveryDays?: string[];
    minimumOrder?: number;
    deliveryFee?: number;
    freeDeliveryThreshold?: number;
  };
  reason?: string;
};

/* =========================================
   HOME PAGE
========================================= */

export default function Home() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const [deliveryResult, setDeliveryResult] =
    useState<DeliveryResult | null>(null);

  /* =========================================
     POSTCODE CHECK
  ========================================= */

  const checkPostcode = async () => {
    const cleanedPostcode = postcode.trim();

    /* EMPTY POSTCODE */

    if (!cleanedPostcode) {
      setDeliveryResult({
        serviceable: false,
        reason: "Please enter your postcode.",
      });

      return;
    }

    try {
      setLoading(true);
      setDeliveryResult(null);

      const response = await fetch(
        "/api/delivery/check-postcode",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            postcode: cleanedPostcode,
          }),
        }
      );

      /*
       =========================================
       IMPORTANT FIX

       This prevents:

       Unexpected token '<'
       "<!DOCTYPE..." is not valid JSON
       =========================================
      */

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The postcode API returned an invalid response. Please check that the API route exists."
        );
      }

      const data: DeliveryResult = await response.json();

      setDeliveryResult(data);
    } catch (error) {
      console.error("Postcode check error:", error);

      setDeliveryResult({
        serviceable: false,
        reason:
          "Something went wrong checking your postcode. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     ENTER KEY
  ========================================= */

  const handlePostcodeKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      checkPostcode();
    }
  };

  /* =========================================
     NORMALISE POSTCODE INPUT
  ========================================= */

  const handlePostcodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostcode(event.target.value.toUpperCase());
  };

  return (
    <main className="homepage">

      {/* =========================================
         HEADER
      ========================================= */}

      <Header />

      {/* =========================================
         HERO
      ========================================= */}

      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-container">

          {/* LEFT CONTENT */}

          <div className="hero-content">

            <h1>
              Fresh Produce
              <br />
              Direct to Your Door
            </h1>

            <p className="hero-description">
              Local produce. Local growers. A brighter tomorrow.
            </p>

            {/* HERO FEATURES */}

            <div className="hero-features">

              <div className="hero-feature">

                <Leaf />

                <span>
                  Fresh
                  <br />
                  Seasonal Produce
                </span>

              </div>

              <div className="hero-feature">

                <MapPin />

                <span>
                  Sourced
                  <br />
                  Locally
                </span>

              </div>

              <div className="hero-feature">

                <House />

                <span>
                  Delivered
                  <br />
                  To Your Door
                </span>

              </div>

            </div>

            {/* DELIVERY PAGE BUTTON */}

            <Link
              href="/delivery"
              className="delivery-button"
            >
              Find Your Delivery Area

              <ArrowRight size={22} />

            </Link>

            {/* =========================================
               POSTCODE CHECKER
            ========================================= */}

            <div className="postcode-section">

              <div className="postcode-box">

                <div className="postcode-input">

                  <MapPin size={20} />

                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    value={postcode}
                    onChange={handlePostcodeChange}
                    onKeyDown={handlePostcodeKeyDown}
                    disabled={loading}
                  />

                </div>

                <button
                  type="button"
                  onClick={checkPostcode}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check"}
                </button>

              </div>

              {/* =========================================
                 SUCCESS MESSAGE
              ========================================= */}

              {deliveryResult?.serviceable && (

                <div className="postcode-success">

                  <div className="postcode-result-icon">

                    <CheckCircle2 size={22} />

                  </div>

                  <div>

                    <strong>
                      Great news! We deliver to{" "}
                      {deliveryResult.postcode || postcode}
                    </strong>

                    {deliveryResult.zone?.name && (

                      <p>
                        Your delivery area:{" "}
                        {deliveryResult.zone.name}
                      </p>

                    )}

                    {deliveryResult.zone?.deliveryDays &&
                      deliveryResult.zone.deliveryDays.length > 0 && (

                        <p>
                          Delivery days:{" "}
                          {deliveryResult.zone.deliveryDays.join(" & ")}
                        </p>

                      )}

                    <Link
                      href="/shop"
                      className="continue-shopping"
                    >
                      Continue to Shop

                      <ArrowRight size={17} />

                    </Link>

                  </div>

                </div>

              )}

              {/* =========================================
                 ERROR MESSAGE
              ========================================= */}

              {deliveryResult &&
                !deliveryResult.serviceable && (

                  <div className="postcode-error">

                    <XCircle size={21} />

                    <div>

                      <strong>

                        {deliveryResult.reason ===
                        "OUTSIDE_DELIVERY_AREA"
                          ? `We're not delivering to ${
                              deliveryResult.postcode || postcode
                            } just yet.`
                          : deliveryResult.reason ===
                            "INVALID_POSTCODE"
                          ? "Please enter a valid UK postcode."
                          : deliveryResult.reason ||
                            "Unable to check your postcode."}

                      </strong>

                      {deliveryResult.reason ===
                        "OUTSIDE_DELIVERY_AREA" && (

                        <p>
                          We're expanding quickly. Check our delivery
                          areas and we'll let you know when we reach
                          your location.
                        </p>

                      )}

                      <Link
                        href="/delivery"
                        className="view-delivery-link"
                      >

                        View Delivery Areas

                        <ArrowRight size={16} />

                      </Link>

                    </div>

                  </div>

                )}

            </div>

          </div>

          {/* =========================================
             RIGHT SIDE
          ========================================= */}

          <div className="hero-right">

            <div className="community-badge">

              <span>Good Food</span>

              <strong>Stronger</strong>

              <span>Communities</span>

            </div>

            <div className="produce-image-wrap">

              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=90"
                alt="Fresh seasonal vegetables"
              />

              <div className="wooden-box">

                <span>FRESHER</span>
                <span>FAIRER</span>
                <span>GREENER</span>
                <span>HAPPIER</span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
         BENEFITS
      ========================================= */}

      <section className="benefits">

        <div className="benefits-container">

          <div className="benefit">

            <Tractor />

            <span>
              Supporting
              <br />
              Local Farmers
            </span>

          </div>

          <div className="benefit">

            <Leaf />

            <span>
              Seasonal &
              <br />
              Sustainable
            </span>

          </div>

          <div className="benefit">

            <Heart />

            <span>
              Better for
              <br />
              You & Your Family
            </span>

          </div>

          <div className="benefit">

            <Sprout />

            <span>
              A Brighter
              <br />
              Tomorrow
            </span>

          </div>

        </div>

      </section>

      {/* =========================================
         PRODUCE BOXES
      ========================================= */}

      <section
        className="produce-boxes"
        id="boxes"
      >

        <div className="section-heading">

          <h2>Our Produce Boxes</h2>

          <p>
            Fresh, flexible and great value. Choose the box
            that's right for you.
          </p>

        </div>

        <div className="boxes-grid">

          {boxes.map((box) => (

            <article
              className="produce-card"
              key={box.title}
            >

              <img
                src={box.image}
                alt={box.title}
              />

              <div className="card-content">

                <h3>{box.title}</h3>

                <p>{box.description}</p>

                <strong>{box.price}</strong>

                <Link
                  href="/our-boxes"
                  className="view-box-button"
                >

                  View Box

                  <ArrowRight size={17} />

                </Link>

              </div>

            </article>

          ))}

        </div>

        {/* VIEW ALL BOXES */}

        <div className="homepage-section-button">

          <Link href="/our-boxes">

            View All Produce Boxes

            <ArrowRight size={19} />

          </Link>

        </div>

      </section>

      {/* =========================================
         GROWERS BANNER
      ========================================= */}

      <section
        className="growers-banner"
        id="growers"
      >

        <div className="growers-background"></div>

        <div className="growers-content">

          {/* LEFT */}

          <div className="growers-left">

            <h2>
              Real Food
              <br />
              Real People
              <br />
              Real Difference
            </h2>

          </div>

          {/* RIGHT */}

          <div className="growers-right">

            <p>
              We work with trusted local growers to bring you
              the freshest produce, while supporting our local
              community and a more sustainable future for
              generations to come.
            </p>

            {/* GROWERS PAGE */}

            <Link
              href="/growers"
              className="growers-button"
            >

              Meet Our Growers

              <ArrowRight size={20} />

            </Link>

          </div>

        </div>

      </section>

      {/* =========================================
         FOOTER
      ========================================= */}

      <Footer />

    </main>
  );
}