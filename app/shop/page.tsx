"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import {
  MapPin,
  Tractor,
  Heart,
  Sprout,
  Store,
  Carrot,
  Apple,
  Leaf,
  CircleDot,
  Egg,
  Package,
  Tag,
  ChevronDown,
  SlidersHorizontal,
  Search,
  ShoppingBasket,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "./Shop.module.css";

/* =========================================
   PRODUCTS DATA
========================================= */

const products = [
  {
    name: "Carrots",
    origin: "Local Lincolnshire Grower",
    unit: "Bunch",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 98,
  },
  {
    name: "Vine Tomatoes",
    origin: "Local Grower",
    unit: "500g",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 95,
  },
  {
    name: "White Potatoes",
    origin: "Local Grower",
    unit: "2kg",
    price: "£2.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 92,
  },
  {
    name: "Broccoli",
    origin: "Local Grower",
    unit: "Each",
    price: "£1.80",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: true,
    popularity: 94,
  },
  {
    name: "British Apples",
    origin: "Local Orchard",
    unit: "500g",
    price: "£2.00",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 97,
  },
  {
    name: "Bananas",
    origin: "Fairtrade",
    unit: "Bunch",
    price: "£1.20",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: false,
    seasonal: false,
    onOffer: true,
    popularity: 99,
  },
  {
    name: "Mixed Salad Leaves",
    origin: "Local Grower",
    unit: "150g",
    price: "£1.80",
    category: "Salad & Leaves",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 88,
  },
  {
    name: "Free Range Eggs",
    origin: "Local Farm",
    unit: "Box of 6",
    price: "£2.50",
    category: "Eggs",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: false,
    onOffer: false,
    popularity: 91,
  },
  {
    name: "Brown Onions",
    origin: "Local Grower",
    unit: "1kg",
    price: "£1.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518977956815-dee0063e6f9c?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: true,
    onOffer: true,
    popularity: 90,
  },
  {
    name: "Courgettes",
    origin: "Local Grower",
    unit: "500g",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 85,
  },
  {
    name: "Strawberries",
    origin: "Local Grower",
    unit: "250g",
    price: "£2.50",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: true,
    popularity: 96,
  },
  {
    name: "Mixed Peppers",
    origin: "Local Grower",
    unit: "3 Pack",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 89,
  },

  /* PAGE 2 */

  {
    name: "Fresh Spinach",
    origin: "Local Grower",
    unit: "200g",
    price: "£1.80",
    category: "Salad & Leaves",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 82,
  },
  {
    name: "Sweetcorn",
    origin: "Local Grower",
    unit: "2 Pack",
    price: "£2.20",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 80,
  },
  {
    name: "Red Peppers",
    origin: "Local Grower",
    unit: "3 Pack",
    price: "£2.30",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: true,
    popularity: 78,
  },

  /* PAGE 3 */

  {
    name: "Green Cabbage",
    origin: "Local Grower",
    unit: "Each",
    price: "£1.40",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1594282486552-05f2bbf1b0f0?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 76,
  },
  {
    name: "Fresh Lemons",
    origin: "Quality Grower",
    unit: "4 Pack",
    price: "£1.80",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: false,
    seasonal: true,
    onOffer: false,
    popularity: 75,
  },
  {
    name: "Fresh Pears",
    origin: "Local Orchard",
    unit: "500g",
    price: "£2.20",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: true,
    popularity: 74,
  },

  /* PAGE 4 */

  {
    name: "Fresh Mushrooms",
    origin: "Local Grower",
    unit: "250g",
    price: "£1.90",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: false,
    onOffer: false,
    popularity: 72,
  },
  {
    name: "Garden Herbs",
    origin: "Local Grower",
    unit: "100g",
    price: "£1.50",
    category: "Herbs",
    image:
      "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: false,
    popularity: 70,
  },
  {
    name: "Fresh Parsley",
    origin: "Local Grower",
    unit: "100g",
    price: "£1.20",
    category: "Herbs",
    image:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: true,
    onOffer: true,
    popularity: 68,
  },

  /* PAGE 5 */

  {
    name: "Farmhouse Bread",
    origin: "Local Bakery",
    unit: "1 Loaf",
    price: "£2.80",
    category: "Pantry Basics",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: false,
    onOffer: false,
    popularity: 65,
  },
  {
    name: "Local Honey",
    origin: "Local Beekeeper",
    unit: "340g",
    price: "£4.50",
    category: "Pantry Basics",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=85",
    organic: true,
    locallyGrown: true,
    seasonal: false,
    onOffer: true,
    popularity: 63,
  },
  {
    name: "Free Range Large Eggs",
    origin: "Local Farm",
    unit: "Box of 12",
    price: "£4.00",
    category: "Eggs",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=85",
    organic: false,
    locallyGrown: true,
    seasonal: false,
    onOffer: false,
    popularity: 60,
  },
];

/* =========================================
   CATEGORIES
========================================= */

const categories = [
  { name: "All Products", icon: Store },
  { name: "Vegetables", icon: Carrot },
  { name: "Fruit", icon: Apple },
  { name: "Salad & Leaves", icon: Leaf },
  { name: "Herbs", icon: Sprout },
  { name: "Potatoes & Roots", icon: CircleDot },
  { name: "Eggs", icon: Egg },
  { name: "Pantry Basics", icon: Package },
  { name: "Special Offers", icon: Tag },
];

const filterCategories = [
  ["Vegetables", "34"],
  ["Fruit", "22"],
  ["Salad & Leaves", "12"],
  ["Herbs", "10"],
  ["Potatoes & Roots", "8"],
  ["Eggs", "6"],
  ["Pantry Basics", "9"],
  ["Special Offers", "6"],
];

/* =========================================
   SHOP PAGE
========================================= */

export default function ShopPage() {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [activeCategory, setActiveCategory] =
    useState("All Products");

  const [search, setSearch] = useState("");

  const [price, setPrice] = useState(10);
  const [appliedPrice, setAppliedPrice] = useState(10);

  const [organic, setOrganic] = useState(false);
  const [locallyGrown, setLocallyGrown] = useState(false);
  const [seasonal, setSeasonal] = useState(false);
  const [onOffer, setOnOffer] = useState(false);

  const [appliedOrganic, setAppliedOrganic] =
    useState(false);

  const [appliedLocallyGrown, setAppliedLocallyGrown] =
    useState(false);

  const [appliedSeasonal, setAppliedSeasonal] =
    useState(false);

  const [appliedOnOffer, setAppliedOnOffer] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("popular");

  const [currentPage, setCurrentPage] =
    useState(1);

  /* =========================================
     SEARCH FROM HEADER
  ========================================= */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setSearch(params.get("search") || "");
  }, []);

  /* =========================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeCategory,
    search,
    appliedPrice,
    appliedOrganic,
    appliedLocallyGrown,
    appliedSeasonal,
    appliedOnOffer,
    sortBy,
  ]);

  /* =========================================
     PRODUCT SLUG
  ========================================= */

  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  /* =========================================
     WISHLIST
  ========================================= */

  const handleWishlist = (
    product: (typeof products)[0]
  ) => {
    if (isInWishlist(product.name)) {
      removeFromWishlist(product.name);
    } else {
      addToWishlist(product);
    }
  };

  /* =========================================
     APPLY FILTERS
  ========================================= */

  const handleApplyFilters = () => {
    setAppliedPrice(price);
    setAppliedOrganic(organic);
    setAppliedLocallyGrown(locallyGrown);
    setAppliedSeasonal(seasonal);
    setAppliedOnOffer(onOffer);
  };

  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const clearFilters = () => {
    setPrice(10);
    setAppliedPrice(10);

    setOrganic(false);
    setLocallyGrown(false);
    setSeasonal(false);
    setOnOffer(false);

    setAppliedOrganic(false);
    setAppliedLocallyGrown(false);
    setAppliedSeasonal(false);
    setAppliedOnOffer(false);

    setActiveCategory("All Products");
  };

  /* =========================================
     FILTER + SORT PRODUCTS
  ========================================= */

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const productPrice = Number(
        product.price.replace("£", "")
      );

      let categoryMatch = true;

      if (activeCategory === "Special Offers") {
        categoryMatch = product.onOffer;
      } else if (
        activeCategory !== "All Products"
      ) {
        categoryMatch =
          product.category === activeCategory;
      }

      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const priceMatch =
        productPrice <= appliedPrice;

      const organicMatch =
        !appliedOrganic || product.organic;

      const locallyGrownMatch =
        !appliedLocallyGrown ||
        product.locallyGrown;

      const seasonalMatch =
        !appliedSeasonal ||
        product.seasonal;

      const onOfferMatch =
        !appliedOnOffer ||
        product.onOffer;

      return (
        categoryMatch &&
        searchMatch &&
        priceMatch &&
        organicMatch &&
        locallyGrownMatch &&
        seasonalMatch &&
        onOfferMatch
      );
    });

    return [...result].sort((a, b) => {
      const priceA = Number(
        a.price.replace("£", "")
      );

      const priceB = Number(
        b.price.replace("£", "")
      );

      switch (sortBy) {
        case "price-low":
          return priceA - priceB;

        case "price-high":
          return priceB - priceA;

        case "name":
          return a.name.localeCompare(b.name);

        case "popular":
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [
    activeCategory,
    search,
    appliedPrice,
    appliedOrganic,
    appliedLocallyGrown,
    appliedSeasonal,
    appliedOnOffer,
    sortBy,
  ]);

  /* =========================================
     PAGINATION
     PAGE 1 = 12 PRODUCTS
     PAGE 2+ = 3 PRODUCTS
  ========================================= */

  const totalPages = 5;

  const paginatedProducts = useMemo(() => {
    if (currentPage === 1) {
      return filteredProducts.slice(0, 12);
    }

    const startIndex =
      12 + (currentPage - 2) * 3;

    return filteredProducts.slice(
      startIndex,
      startIndex + 3
    );
  }, [filteredProducts, currentPage]);

  /* =========================================
     PAGE CHANGE
  ========================================= */

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  /* =========================================
     CLEAR SEARCH
  ========================================= */

  const clearSearch = () => {
    setSearch("");

    const url = new URL(
      window.location.href
    );

    url.searchParams.delete("search");

    window.history.replaceState(
      {},
      "",
      url.pathname
    );
  };

  return (
    <main className={styles.shopPage}>
      <Header />

      {/* HERO */}

      <section className={styles.shopHero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              SEASONAL • LOCAL • QUALITY
            </span>

            <h1
              style={{
                color: "#f4f8f5",
              }}
            >
              Shop Fresh
              <br />
              Local Produce
            </h1>

            <p className={styles.heroSubtitle}>
              Seasonal. Local. Great Quality.
            </p>

            <p className={styles.heroText}>
              Discover fresh, high quality produce
              sourced from trusted growers and
              delivered with care.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.feature}>
            <MapPin />
            <span>Sourced Locally</span>
          </div>

          <div className={styles.feature}>
            <Tractor />
            <span>
              Supporting Local Growers
            </span>
          </div>

          <div className={styles.feature}>
            <Heart />
            <span>
              Better for You & Your Family
            </span>
          </div>

          <div className={styles.feature}>
            <Sprout />
            <span>A Brighter Tomorrow</span>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}

      <section className={styles.categorySection}>
        <div className={styles.categoryContainer}>
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  setActiveCategory(category.name)
                }
                className={`${styles.categoryItem} ${
                  activeCategory === category.name
                    ? styles.activeCategory
                    : ""
                }`}
              >
                <div className={styles.categoryIcon}>
                  <Icon size={25} />
                </div>

                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* MAIN SHOP */}

      <section className={styles.shopSection}>
        <div className={styles.shopContainer}>
          {/* SIDEBAR */}

          <aside className={styles.sidebar}>
            <div className={styles.filterHeader}>
              <SlidersHorizontal size={21} />
              <h2>Filter Products</h2>
            </div>

            {/* CATEGORY FILTER */}

            <div className={styles.filterGroup}>
              <h3>Categories</h3>

              {filterCategories.map(
                ([name, count]) => (
                  <label
                    key={name}
                    className={styles.checkboxItem}
                  >
                    <span>
                      <input
                        type="checkbox"
                        checked={
                          activeCategory === name
                        }
                        onChange={() =>
                          setActiveCategory(
                            activeCategory === name
                              ? "All Products"
                              : name
                          )
                        }
                      />

                      <span>{name}</span>
                    </span>

                    <small>({count})</small>
                  </label>
                )
              )}
            </div>

            {/* PRICE */}

            <div className={styles.filterGroup}>
              <h3>Price Range</h3>

              <div className={styles.priceRange}>
                <span>£0</span>

                <strong>
                  £{price}
                  {price === 10 ? "+" : ""}
                </strong>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="0.50"
                value={price}
                onChange={(event) =>
                  setPrice(
                    Number(event.target.value)
                  )
                }
                className={styles.rangeInput}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#777",
                  marginTop: "6px",
                }}
              >
                <span>£0</span>
                <span>£10+</span>
              </div>
            </div>

            {/* OTHER FILTERS */}

            <div className={styles.filterGroup}>
              <h3>Dietary / Other</h3>

              <label
                className={styles.simpleCheckbox}
              >
                <input
                  type="checkbox"
                  checked={organic}
                  onChange={(event) =>
                    setOrganic(
                      event.target.checked
                    )
                  }
                />

                <span>Organic</span>
              </label>

              <label
                className={styles.simpleCheckbox}
              >
                <input
                  type="checkbox"
                  checked={locallyGrown}
                  onChange={(event) =>
                    setLocallyGrown(
                      event.target.checked
                    )
                  }
                />

                <span>Locally Grown</span>
              </label>

              <label
                className={styles.simpleCheckbox}
              >
                <input
                  type="checkbox"
                  checked={seasonal}
                  onChange={(event) =>
                    setSeasonal(
                      event.target.checked
                    )
                  }
                />

                <span>Seasonal</span>
              </label>

              <label
                className={styles.simpleCheckbox}
              >
                <input
                  type="checkbox"
                  checked={onOffer}
                  onChange={(event) =>
                    setOnOffer(
                      event.target.checked
                    )
                  }
                />

                <span>On Offer</span>
              </label>
            </div>

            <button
              type="button"
              className={styles.applyButton}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={clearFilters}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "11px 16px",
                borderRadius: "8px",
                border: "1px solid #d8ded9",
                background: "#fff",
                color: "#174d2d",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Clear Filters
            </button>

            {/* PROMO */}

            <div className={styles.sidebarPromo}>
              <div
                className={styles.promoOverlay}
              ></div>

              <div
                className={styles.promoContent}
              >
                <span>
                  LOCAL • SEASONAL • REAL
                </span>

                <h3>
                  Supporting
                  <br />
                  Local Growers
                </h3>

                <p>
                  Fresh produce.
                  <br />
                  Stronger communities.
                </p>

                <Link href="/growers">
                  Meet Our Growers
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}

          <div className={styles.productsArea}>
            <div className={styles.productsHeader}>
              <div>
                <span className={styles.sectionTag}>
                  FRESH FOR EVERY HOME
                </span>

                <h2>
                  {activeCategory ===
                  "All Products"
                    ? "All Products"
                    : activeCategory}
                </h2>

                <p>
                  Fresh local produce, available to
                  add to your order.
                </p>
              </div>

              <div className={styles.productsActions}>
                {/* SEARCH */}

                <div className={styles.searchBox}>
                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* WORKING SORT DROPDOWN */}

                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value
                      )
                    }
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      width: "170px",
                      padding:
                        "12px 42px 12px 16px",
                      border:
                        "1px solid #d9e0d8",
                      borderRadius: "8px",
                      background: "#fff",
                      color: "#174d2d",
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="popular">
                      Most Popular
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="name">
                      Name: A to Z
                    </option>
                  </select>

                  <ChevronDown
                    size={18}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#174d2d",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}

            <div className={styles.productsGrid}>
              {paginatedProducts.map(
                (product) => {
                  const productInWishlist =
                    isInWishlist(product.name);

                  const productSlug =
                    createSlug(product.name);

                  return (
                    <article
                      key={product.name}
                      className={
                        styles.productCard
                      }
                    >
                      <div
                        className={
                          styles.productImage
                        }
                      >
                        <Link
                          href={`/shop/${productSlug}`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        </Link>

                        {product.onOffer && (
                          <span
                            style={{
                              position:
                                "absolute",
                              top: "12px",
                              left: "12px",
                              zIndex: 2,
                              padding:
                                "5px 9px",
                              borderRadius:
                                "20px",
                              background:
                                "#174d2d",
                              color: "#fff",
                              fontSize:
                                "11px",
                              fontWeight: 700,
                            }}
                          >
                            OFFER
                          </span>
                        )}

                        <button
                          type="button"
                          className={`${styles.wishlistButton} ${
                            productInWishlist
                              ? styles.wishlistActive
                              : ""
                          }`}
                          onClick={() =>
                            handleWishlist(
                              product
                            )
                          }
                          aria-label={`Add ${product.name} to wishlist`}
                        >
                          <Heart
                            size={19}
                            fill={
                              productInWishlist
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      <div
                        className={
                          styles.productContent
                        }
                      >
                        <Link
                          href={`/shop/${productSlug}`}
                          style={{
                            textDecoration:
                              "none",
                            color: "inherit",
                          }}
                        >
                          <h3>
                            {product.name}
                          </h3>
                        </Link>

                        <p
                          className={
                            styles.productOrigin
                          }
                        >
                          {product.origin}
                        </p>

                        <span
                          className={
                            styles.productUnit
                          }
                        >
                          {product.unit}
                        </span>

                        <div
                          className={
                            styles.productFooter
                          }
                        >
                          <strong>
                            {product.price}
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              addToCart(
                                product
                              )
                            }
                          >
                            <ShoppingBasket
                              size={16}
                            />
                            Add to Basket
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>

            {/* EMPTY */}

            {filteredProducts.length === 0 && (
              <div className={styles.noProducts}>
                <Search size={40} />

                <h3>No products found</h3>

                <p>
                  Try changing your filters or
                  search.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    clearFilters();
                    clearSearch();
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* PAGINATION */}

            {filteredProducts.length > 0 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  style={{
                    opacity:
                      currentPage === 1
                        ? 0.45
                        : 1,
                    cursor:
                      currentPage === 1
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <ChevronLeft size={19} />
                </button>

                {[1, 2, 3, 4, 5].map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        changePage(page)
                      }
                      className={
                        currentPage === page
                          ? styles.pageActive
                          : ""
                      }
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    changePage(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  style={{
                    opacity:
                      currentPage === totalPages
                        ? 0.45
                        : 1,
                    cursor:
                      currentPage === totalPages
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MID PROMO */}

      <section className={styles.midPromo}>
        <div
          className={styles.midPromoOverlay}
        ></div>

        <div
          className={styles.midPromoContainer}
        >
          <div
            className={styles.midPromoLeft}
          >
            <span>REAL FOOD</span>

            <h2>
              Real Food,
              <br />
              Real People,
              <br />
              Real Difference
            </h2>
          </div>

          <div
            className={styles.midPromoRight}
          >
            <p>
              From our fields to your table.
            </p>

            <Link href="/about">
              Learn More
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}