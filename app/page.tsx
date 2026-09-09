"use client";

import { useState } from "react";

import {
  Search,
  UserRound,
  ShoppingCart,
  Leaf,
  MapPin,
  House,
  ArrowRight,
  Tractor,
  Heart,
  Sprout,
  Truck,
  ShieldCheck,
  Users,
  Menu,
  X,
} from "lucide-react";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="homepage">

      {/* ================= HEADER ================= */}

      <header className="header">
        <div className="header-container">

          {/* LOGO */}
          <div className="logo">
            <img src="/logo.png" alt="Fresh Produce Direct" />
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="navigation">
            <a className="active" href="#">Home</a>
            <a href="#boxes">Our Boxes</a>
            <a href="#shop">Shop</a>
            <a href="#about">About Us</a>
            <a href="#growers">Our Growers</a>
            <a href="#delivery">Delivery</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* HEADER ICONS */}
          <div className="header-icons">

            <button aria-label="Search">
              <Search size={25} strokeWidth={1.8} />
            </button>

            <button className="account-btn" aria-label="Account">
              <UserRound size={25} strokeWidth={1.8} />
              <span>Sign In</span>
            </button>

            <button className="cart-btn" aria-label="Cart">
              <ShoppingCart size={27} strokeWidth={1.8} />
              <span className="cart-number">0</span>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              {menuOpen ? (
                <X size={28} strokeWidth={2} />
              ) : (
                <Menu size={30} strokeWidth={2} />
              )}
            </button>

          </div>

        </div>

        {/* ================= MOBILE MENU ================= */}

        <nav className={`mobile-navigation ${menuOpen ? "show" : ""}`}>

          <a
            className="active"
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#boxes"
            onClick={() => setMenuOpen(false)}
          >
            Our Boxes
          </a>

          <a
            href="#shop"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </a>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </a>

          <a
            href="#growers"
            onClick={() => setMenuOpen(false)}
          >
            Our Growers
          </a>

          <a
            href="#delivery"
            onClick={() => setMenuOpen(false)}
          >
            Delivery
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

        </nav>

      </header>


      {/* ================= HERO ================= */}

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


            <button className="delivery-button">
              Find Your Delivery Area
              <ArrowRight size={22} />
            </button>


            <div className="postcode-box">

              <div className="postcode-input">
                <MapPin size={20} />

                <input
                  type="text"
                  placeholder="Enter your postcode"
                />
              </div>

              <button>Check</button>

            </div>

          </div>


          {/* RIGHT SIDE */}

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


      {/* ================= BENEFITS ================= */}

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


      {/* ================= PRODUCE BOXES ================= */}

      <section className="produce-boxes" id="boxes">

        <div className="section-heading">

          <h2>Our Produce Boxes</h2>

          <p>
            Fresh, flexible and great value. Choose the box that's right for you.
          </p>

        </div>


        <div className="boxes-grid">

          {boxes.map((box) => (

            <article className="produce-card" key={box.title}>

              <img src={box.image} alt={box.title} />

              <div className="card-content">

                <h3>{box.title}</h3>

                <p>{box.description}</p>

                <strong>{box.price}</strong>

                <button>View Box</button>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= GROWERS BANNER ================= */}

      <section className="growers-banner" id="growers">

        <div className="growers-background"></div>

        <div className="growers-content">

          <div className="growers-left">

            <h2>
              Real Food
              <br />
              Real People
              <br />
              Real Difference
            </h2>

          </div>


          <div className="growers-right">

            <p>
              We work with trusted local growers to bring you the freshest
              produce, while supporting our local community and a more
              sustainable future for generations to come.
            </p>

            <button>
              Meet Our Growers
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-item">
            <Truck />
            <span>
              Local Delivery
              <br />
              To Your Area
            </span>
          </div>

          <div className="footer-item">
            <ShieldCheck />
            <span>
              Secure Online
              <br />
              Ordering
            </span>
          </div>

          <div className="footer-item">
            <Leaf />
            <span>
              Freshness
              <br />
              Guaranteed
            </span>
          </div>

          <div className="footer-item">
            <Users />
            <span>
              Supporting
              <br />
              Local Communities
            </span>
          </div>

          <div className="footer-message">
            <span>Quality Produce.</span>
            <strong>A Brighter Tomorrow.</strong>
          </div>

        </div>

      </footer>

    </main>
  );
}