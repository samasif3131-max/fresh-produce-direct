"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

import {
  Heart,
  ShoppingBasket,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  MapPin,
  Leaf,
  Check,
} from "lucide-react";

import styles from "./Product.module.css";

/* =========================================
   PRODUCTS DATA
========================================= */

const products = [
  {
    slug: "carrots",
    name: "Carrots",
    origin: "Local Lincolnshire Grower",
    unit: "Bunch",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh, locally grown carrots sourced from trusted Lincolnshire growers. Perfect for roasting, soups, salads and everyday family meals.",
  },

  {
    slug: "vine-tomatoes",
    name: "Vine Tomatoes",
    origin: "Local Grower",
    unit: "500g",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh and juicy vine tomatoes packed with natural flavour. Perfect for salads, sandwiches, sauces and home cooking.",
  },

  {
    slug: "white-potatoes",
    name: "White Potatoes",
    origin: "Local Grower",
    unit: "2kg",
    price: "£2.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=85",
    description:
      "Quality white potatoes grown locally and selected for freshness. Ideal for roasting, baking, mashing and everyday meals.",
  },

  {
    slug: "broccoli",
    name: "Broccoli",
    origin: "Local Grower",
    unit: "Each",
    price: "£1.80",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh green broccoli sourced from trusted growers. A delicious and versatile vegetable for healthy family meals.",
  },

  {
    slug: "british-apples",
    name: "British Apples",
    origin: "Local Orchard",
    unit: "500g",
    price: "£2.00",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1000&q=85",
    description:
      "Crisp and delicious British apples sourced from local orchards. Perfect for snacking, baking and family lunches.",
  },

  {
    slug: "bananas",
    name: "Bananas",
    origin: "Fairtrade",
    unit: "Bunch",
    price: "£1.20",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh Fairtrade bananas with a naturally sweet flavour. A perfect everyday fruit for breakfast and healthy snacks.",
  },

  {
    slug: "mixed-salad-leaves",
    name: "Mixed Salad Leaves",
    origin: "Local Grower",
    unit: "150g",
    price: "£1.80",
    category: "Salad & Leaves",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    description:
      "A fresh selection of mixed salad leaves sourced from local growers. Perfect for healthy lunches and family meals.",
  },

  {
    slug: "free-range-eggs",
    name: "Free Range Eggs",
    origin: "Local Farm",
    unit: "Box of 6",
    price: "£2.50",
    category: "Eggs",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh free range eggs from trusted local farms. Great for breakfasts, baking and everyday cooking.",
  },

  {
    slug: "brown-onions",
    name: "Brown Onions",
    origin: "Local Grower",
    unit: "1kg",
    price: "£1.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518511287567-53e660a7c9c0?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh brown onions with great flavour. An essential ingredient for everyday home cooking.",
  },

  {
    slug: "courgettes",
    name: "Courgettes",
    origin: "Local Grower",
    unit: "500g",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=85",
    description:
      "Fresh courgettes sourced from trusted local growers. Perfect for grilling, roasting and healthy recipes.",
  },

  {
    slug: "strawberries",
    name: "Strawberries",
    origin: "Local Grower",
    unit: "250g",
    price: "£2.50",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1000&q=85",
    description:
      "Sweet and delicious strawberries freshly selected for quality and flavour.",
  },

  {
    slug: "mixed-peppers",
    name: "Mixed Peppers",
    origin: "Local Grower",
    unit: "3 Pack",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1000&q=85",
    description:
      "A colourful selection of fresh mixed peppers, perfect for salads, roasting and family meals.",
  },
];

/* =========================================
   PRODUCT DETAIL PAGE
========================================= */

export default function ProductPage() {
  const params = useParams();

  const slug = params.product as string;

  const product = products.find(
    (item) => item.slug === slug
  );

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  /* =========================================
     PRODUCT NOT FOUND
  ========================================= */

  if (!product) {
    return (
      <main>
        <Header />

        <div className={styles.notFound}>
          <h1>Product Not Found</h1>

          <p>
            Sorry, we couldn't find this product.
          </p>

          <Link href="/shop">
            Back to Shop
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  const productInWishlist =
    isInWishlist(product.name);

  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  /* =========================================
     WISHLIST
  ========================================= */

  const handleWishlist = () => {
    if (productInWishlist) {
      removeFromWishlist(product.name);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className={styles.productPage}>
      <Header />

      {/* BREADCRUMB */}

      <section className={styles.breadcrumb}>
        <div className={styles.breadcrumbContainer}>
          <Link href="/shop">
            <ArrowLeft size={17} />
            Back to Shop
          </Link>

          <span>/</span>

          <span>{product.category}</span>

          <span>/</span>

          <strong>{product.name}</strong>
        </div>
      </section>

      {/* PRODUCT SECTION */}

      <section className={styles.productSection}>
        <div className={styles.productContainer}>

          {/* PRODUCT IMAGE */}

          <div className={styles.imageColumn}>
            <div className={styles.mainImage}>
              <img
                src={product.image}
                alt={product.name}
              />

              <button
                type="button"
                className={`${styles.heartButton} ${
                  productInWishlist
                    ? styles.heartActive
                    : ""
                }`}
                onClick={handleWishlist}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={22}
                  fill={
                    productInWishlist
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>
          </div>

          {/* PRODUCT DETAILS */}

          <div className={styles.detailsColumn}>
            <span className={styles.categoryTag}>
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <p className={styles.origin}>
              <MapPin size={18} />
              {product.origin}
            </p>

            <div className={styles.priceRow}>
              <span className={styles.price}>
                {product.price}
              </span>

              <span className={styles.unit}>
                {product.unit}
              </span>
            </div>

            <p className={styles.description}>
              {product.description}
            </p>

            {/* TRUST POINTS */}

            <div className={styles.trustPoints}>
              <div>
                <Check size={18} />
                Freshly selected
              </div>

              <div>
                <Check size={18} />
                Quality guaranteed
              </div>

              <div>
                <Check size={18} />
                Carefully delivered
              </div>
            </div>

            {/* QUANTITY */}

            <div className={styles.quantityArea}>
              <span>Quantity</span>

              <div className={styles.quantityBox}>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      quantity > 1
                        ? quantity - 1
                        : 1
                    )
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={17} />
                </button>

                <strong>{quantity}</strong>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* BUTTONS */}

            <div className={styles.productButtons}>
              <button
                type="button"
                className={styles.addToBasket}
                onClick={handleAddToCart}
              >
                <ShoppingBasket size={20} />
                Add to Basket
              </button>

              <button
                type="button"
                className={`${styles.wishlistAction} ${
                  productInWishlist
                    ? styles.wishlistActionActive
                    : ""
                }`}
                onClick={handleWishlist}
              >
                <Heart
                  size={20}
                  fill={
                    productInWishlist
                      ? "currentColor"
                      : "none"
                  }
                />

                {productInWishlist
                  ? "Saved to Wishlist"
                  : "Save to Wishlist"}
              </button>
            </div>

            {/* DELIVERY INFO */}

            <div className={styles.deliveryInfo}>
              <div>
                <Truck size={24} />

                <div>
                  <strong>
                    Fresh Delivery
                  </strong>

                  <span>
                    Delivered with care to your door
                  </span>
                </div>
              </div>

              <div>
                <Leaf size={24} />

                <div>
                  <strong>
                    Fresh & Local
                  </strong>

                  <span>
                    Supporting trusted local growers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}