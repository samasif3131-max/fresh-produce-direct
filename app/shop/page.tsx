"use client";

import { useState } from "react";

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
  },
  {
    name: "Vine Tomatoes",
    origin: "Local Grower",
    unit: "500g",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "White Potatoes",
    origin: "Local Grower",
    unit: "2kg",
    price: "£2.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Broccoli",
    origin: "Local Grower",
    unit: "Each",
    price: "£1.80",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "British Apples",
    origin: "Local Orchard",
    unit: "500g",
    price: "£2.00",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Bananas",
    origin: "Fairtrade",
    unit: "Bunch",
    price: "£1.20",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Mixed Salad Leaves",
    origin: "Local Grower",
    unit: "150g",
    price: "£1.80",
    category: "Salad & Leaves",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Free Range Eggs",
    origin: "Local Farm",
    unit: "Box of 6",
    price: "£2.50",
    category: "Eggs",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Brown Onions",
    origin: "Local Grower",
    unit: "1kg",
    price: "£1.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518511287567-53e660a7c9c0?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Courgettes",
    origin: "Local Grower",
    unit: "500g",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Strawberries",
    origin: "Local Grower",
    unit: "250g",
    price: "£2.50",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Mixed Peppers",
    origin: "Local Grower",
    unit: "3 Pack",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=85",
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


export default function ShopPage() {

  /* CART */

  const { addToCart } = useCart();


  /* WISHLIST */

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();


  /* CATEGORY */

  const [activeCategory, setActiveCategory] =
    useState("All Products");


  /* SEARCH */

  const [search, setSearch] = useState("");


  /* =========================================
     WISHLIST FUNCTION
  ========================================= */

  const handleWishlist = (product: typeof products[0]) => {

    if (isInWishlist(product.name)) {

      removeFromWishlist(product.name);

    } else {

      addToWishlist(product);

    }

  };


  /* =========================================
     FILTER PRODUCTS
  ========================================= */

  const filteredProducts = products.filter((product) => {

    const categoryMatch =
      activeCategory === "All Products" ||
      product.category === activeCategory;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;

  });


  return (

    <main className={styles.shopPage}>

      <Header />


      {/* HERO SECTION */}

      <section className={styles.shopHero}>

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContainer}>

          <div className={styles.heroContent}>

            <span className={styles.heroTag}>
              SEASONAL • LOCAL • QUALITY
            </span>

            <h1>
              Shop Fresh
              <br />
              Local Produce
            </h1>

            <p className={styles.heroSubtitle}>
              Seasonal. Local. Great Quality.
            </p>

            <p className={styles.heroText}>
              Discover fresh, high quality produce sourced from
              trusted growers and delivered with care.
            </p>

          </div>

        </div>

      </section>


      {/* FEATURE BADGES */}

      <section className={styles.featuresSection}>

        <div className={styles.featuresContainer}>

          <div className={styles.feature}>
            <MapPin />
            <span>Sourced Locally</span>
          </div>

          <div className={styles.feature}>
            <Tractor />
            <span>Supporting Local Growers</span>
          </div>

          <div className={styles.feature}>
            <Heart />
            <span>Better for You & Your Family</span>
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


      {/* MAIN SHOP AREA */}

      <section className={styles.shopSection}>

        <div className={styles.shopContainer}>


          {/* SIDEBAR */}

          <aside className={styles.sidebar}>

            <div className={styles.filterHeader}>
              <SlidersHorizontal size={21} />
              <h2>Filter Products</h2>
            </div>


            <div className={styles.filterGroup}>

              <h3>Categories</h3>

              {filterCategories.map(([name, count]) => (

                <label
                  key={name}
                  className={styles.checkboxItem}
                >

                  <span>

                    <input
                      type="checkbox"
                      checked={activeCategory === name}
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

              ))}

            </div>


            {/* PRICE */}

            <div className={styles.filterGroup}>

              <h3>Price Range</h3>

              <div className={styles.priceRange}>
                <span>£0</span>
                <span>£10+</span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                className={styles.rangeInput}
              />

            </div>


            {/* OTHER FILTERS */}

            <div className={styles.filterGroup}>

              <h3>Dietary / Other</h3>

              {[
                "Organic",
                "Locally Grown",
                "Seasonal",
                "On Offer",
              ].map((item) => (

                <label
                  key={item}
                  className={styles.simpleCheckbox}
                >

                  <input type="checkbox" />

                  <span>{item}</span>

                </label>

              ))}

            </div>


            <button className={styles.applyButton}>
              Apply Filters
            </button>


            {/* PROMO */}

            <div className={styles.sidebarPromo}>

              <div className={styles.promoOverlay}></div>

              <div className={styles.promoContent}>

                <span>LOCAL • SEASONAL • REAL</span>

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

                <button>
                  Meet Our Growers
                  <ArrowRight size={17} />
                </button>

              </div>

            </div>

          </aside>


          {/* PRODUCTS AREA */}

          <div className={styles.productsArea}>


            {/* PRODUCTS HEADER */}

            <div className={styles.productsHeader}>

              <div>

                <span className={styles.sectionTag}>
                  FRESH FOR EVERY HOME
                </span>

                <h2>
                  {activeCategory === "All Products"
                    ? "All Products"
                    : activeCategory}
                </h2>

                <p>
                  Fresh local produce, available to add to your order.
                </p>

              </div>


              <div className={styles.productsActions}>

                <div className={styles.searchBox}>

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />

                </div>


                <button className={styles.sortButton}>
                  Most Popular
                  <ChevronDown size={18} />
                </button>

              </div>

            </div>


            {/* PRODUCT GRID */}

            <div className={styles.productsGrid}>

              {filteredProducts.map((product) => {

                const productInWishlist =
                  isInWishlist(product.name);

                return (

                  <article
                    key={product.name}
                    className={styles.productCard}
                  >

                    <div className={styles.productImage}>

                      <img
                        src={product.image}
                        alt={product.name}
                      />


                      {/* WISHLIST BUTTON */}

                      <button
                        className={`${styles.wishlistButton} ${
                          productInWishlist
                            ? styles.wishlistActive
                            : ""
                        }`}
                        onClick={() =>
                          handleWishlist(product)
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


                    <div className={styles.productContent}>

                      <h3>{product.name}</h3>

                      <p className={styles.productOrigin}>
                        {product.origin}
                      </p>

                      <span className={styles.productUnit}>
                        {product.unit}
                      </span>


                      <div className={styles.productFooter}>

                        <strong>{product.price}</strong>


                        {/* ADD TO CART */}

                        <button
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBasket size={16} />
                          Add to Basket
                        </button>

                      </div>

                    </div>

                  </article>

                );

              })}

            </div>


            {/* EMPTY STATE */}

            {filteredProducts.length === 0 && (

              <div className={styles.noProducts}>

                <Search size={40} />

                <h3>No products found</h3>

                <p>
                  Try searching for something else.
                </p>

              </div>

            )}


            {/* PAGINATION */}

            <div className={styles.pagination}>

              <button>
                <ChevronLeft size={19} />
              </button>

              <button className={styles.pageActive}>
                1
              </button>

              <button>2</button>
              <button>3</button>
              <button>4</button>

              <button>
                <ChevronRight size={19} />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* MID PAGE PROMO */}

      <section className={styles.midPromo}>

        <div className={styles.midPromoOverlay}></div>

        <div className={styles.midPromoContainer}>

          <div className={styles.midPromoLeft}>

            <span>REAL FOOD</span>

            <h2>
              Real Food,
              <br />
              Real People,
              <br />
              Real Difference
            </h2>

          </div>


          <div className={styles.midPromoRight}>

            <p>
              From our fields to your table.
            </p>

            <button>
              Learn More
              <ArrowRight size={19} />
            </button>

          </div>

        </div>

      </section>


      <Footer />

    </main>

  );

}