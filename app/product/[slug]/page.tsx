"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  Leaf,
  MapPin,
  Check,
} from "lucide-react";

import styles from "./Product.module.css";


/* =========================================
   PRODUCTS DATA
========================================= */

const products = [
  {
    name: "Carrots",
    slug: "carrots",
    origin: "Local Lincolnshire Grower",
    unit: "Bunch",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh, crunchy carrots sourced from trusted local growers. Perfect for roasting, soups, salads and everyday cooking.",
  },

  {
    name: "Vine Tomatoes",
    slug: "vine-tomatoes",
    origin: "Local Grower",
    unit: "500g",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=1200&q=85",
    description:
      "Sweet and juicy vine tomatoes, carefully selected for freshness and flavour.",
  },

  {
    name: "White Potatoes",
    slug: "white-potatoes",
    origin: "Local Grower",
    unit: "2kg",
    price: "£2.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=85",
    description:
      "Versatile fresh white potatoes, ideal for roasting, mashing, baking and family meals.",
  },

  {
    name: "Broccoli",
    slug: "broccoli",
    origin: "Local Grower",
    unit: "Each",
    price: "£1.80",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh green broccoli packed with flavour and perfect for healthy meals.",
  },

  {
    name: "British Apples",
    slug: "british-apples",
    origin: "Local Orchard",
    unit: "500g",
    price: "£2.00",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=85",
    description:
      "Crisp and delicious British apples sourced from quality local orchards.",
  },

  {
    name: "Bananas",
    slug: "bananas",
    origin: "Fairtrade",
    unit: "Bunch",
    price: "£1.20",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh bananas, perfect for breakfast, smoothies and healthy snacks.",
  },

  {
    name: "Mixed Salad Leaves",
    slug: "mixed-salad-leaves",
    origin: "Local Grower",
    unit: "150g",
    price: "£1.80",
    category: "Salad & Leaves",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
    description:
      "A fresh selection of mixed salad leaves, ready for delicious and healthy meals.",
  },

  {
    name: "Free Range Eggs",
    slug: "free-range-eggs",
    origin: "Local Farm",
    unit: "Box of 6",
    price: "£2.50",
    category: "Eggs",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh free range eggs from trusted local farms.",
  },

  {
    name: "Brown Onions",
    slug: "brown-onions",
    origin: "Local Grower",
    unit: "1kg",
    price: "£1.50",
    category: "Potatoes & Roots",
    image:
      "https://images.unsplash.com/photo-1518511287567-53e660a7c9c0?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh brown onions, an essential ingredient for everyday cooking.",
  },

  {
    name: "Courgettes",
    slug: "courgettes",
    origin: "Local Grower",
    unit: "500g",
    price: "£1.50",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh courgettes with a mild flavour, perfect for roasting and cooking.",
  },

  {
    name: "Strawberries",
    slug: "strawberries",
    origin: "Local Grower",
    unit: "250g",
    price: "£2.50",
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=85",
    description:
      "Sweet, juicy strawberries carefully selected for freshness and flavour.",
  },

  {
    name: "Mixed Peppers",
    slug: "mixed-peppers",
    origin: "Local Grower",
    unit: "3 Pack",
    price: "£2.00",
    category: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1200&q=85",
    description:
      "A colourful selection of fresh mixed peppers for delicious meals.",
  },
];


/* =========================================
   PRODUCT PAGE
========================================= */

export default function ProductPage() {

  const params = useParams();

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : "";


  const { addToCart } = useCart();


  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();


  const [quantity, setQuantity] =
    useState(1);


  /* FIND PRODUCT */

  const product = products.find(
    (item) => item.slug === slug
  );


  /* PRODUCT NOT FOUND */

  if (!product) {

    return (

      <main>

        <Header />

        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "30px",
          }}
        >

          <h1>Product not found</h1>

          <Link href="/shop">
            ← Back to Shop
          </Link>

        </div>

        <Footer />

      </main>

    );

  }


  const productInWishlist =
    isInWishlist(product.name);


  /* WISHLIST */

  const handleWishlist = () => {

    if (productInWishlist) {

      removeFromWishlist(product.name);

    } else {

      addToWishlist(product);

    }

  };


  /* ADD TO CART */

  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {

      addToCart(product);

    }

  };


  return (

    <main className={styles.productPage}>

      <Header />


      {/* BREADCRUMB */}

      <section className={styles.breadcrumb}>

        <div className={styles.container}>

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



      {/* PRODUCT DETAILS */}

      <section className={styles.productSection}>

        <div className={styles.container}>


          <div className={styles.productGrid}>


            {/* PRODUCT IMAGE */}

            <div className={styles.imageColumn}>

              <div className={styles.mainImage}>

                <img
                  src={product.image}
                  alt={product.name}
                />


                <button
                  type="button"
                  className={`${styles.wishlistButton} ${
                    productInWishlist
                      ? styles.wishlistActive
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



            {/* PRODUCT INFO */}

            <div className={styles.infoColumn}>


              <span className={styles.categoryTag}>
                {product.category}
              </span>


              <h1>
                {product.name}
              </h1>


              <div className={styles.origin}>

                <MapPin size={18} />

                {product.origin}

              </div>


              <div className={styles.price}>
                {product.price}
              </div>


              <div className={styles.unit}>
                Sold per {product.unit}
              </div>


              <p className={styles.description}>
                {product.description}
              </p>



              {/* QUANTITY */}

              <div className={styles.quantitySection}>

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
                  >

                    <Minus size={18} />

                  </button>


                  <strong>
                    {quantity}
                  </strong>


                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                  >

                    <Plus size={18} />

                  </button>


                </div>

              </div>



              {/* ADD TO BASKET */}

              <button
                type="button"
                className={styles.addButton}
                onClick={handleAddToCart}
              >

                <ShoppingBasket size={20} />

                Add {quantity} to Basket

              </button>



              {/* WISHLIST */}

              <button
                type="button"
                className={styles.wishlistTextButton}
                onClick={handleWishlist}
              >

                <Heart
                  size={19}
                  fill={
                    productInWishlist
                      ? "currentColor"
                      : "none"
                  }
                />

                {productInWishlist
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}

              </button>



              {/* FEATURES */}

              <div className={styles.productFeatures}>


                <div>

                  <Truck size={22} />

                  <div>

                    <strong>
                      Fresh Delivery
                    </strong>

                    <span>
                      Delivered with care
                    </span>

                  </div>

                </div>


                <div>

                  <Leaf size={22} />

                  <div>

                    <strong>
                      Fresh & Local
                    </strong>

                    <span>
                      Quality produce
                    </span>

                  </div>

                </div>


                <div>

                  <Check size={22} />

                  <div>

                    <strong>
                      Quality Checked
                    </strong>

                    <span>
                      Carefully selected
                    </span>

                  </div>

                </div>


              </div>


            </div>


          </div>



          {/* EXTRA INFORMATION */}

          <div className={styles.extraInfo}>


            <div>

              <h2>
                About this product
              </h2>

              <p>
                We carefully select fresh produce from trusted growers
                to make sure you receive great quality food for your home.
              </p>

            </div>


            <div>

              <h2>
                Why choose local?
              </h2>

              <p>
                Supporting local growers helps communities while giving
                you access to fresh seasonal produce.
              </p>

            </div>


          </div>


        </div>

      </section>


      <Footer />

    </main>

  );

}