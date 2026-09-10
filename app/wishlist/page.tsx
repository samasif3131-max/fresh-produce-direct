"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import {
  Heart,
  ShoppingBasket,
  Trash2,
  ArrowRight,
} from "lucide-react";

import styles from "./Wishlist.module.css";


export default function WishlistPage() {

  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();


  return (

    <main className={styles.wishlistPage}>

      <Header />


      {/* HERO */}

      <section className={styles.wishlistHero}>

        <div className={styles.heroContent}>

          <span>YOUR FAVOURITES</span>

          <h1>
            My Wishlist
          </h1>

          <p>
            Keep all your favourite fresh produce
            in one convenient place.
          </p>

        </div>

      </section>


      {/* WISHLIST CONTENT */}

      <section className={styles.wishlistSection}>

        <div className={styles.wishlistContainer}>


          {/* IF WISHLIST HAS PRODUCTS */}

          {wishlist.length > 0 ? (

            <>

              <div className={styles.wishlistHeader}>

                <div>

                  <span className={styles.sectionTag}>
                    YOUR FAVOURITES
                  </span>

                  <h2>
                    Saved Products
                  </h2>

                  <p>
                    {wishlist.length}{" "}
                    {wishlist.length === 1
                      ? "product"
                      : "products"}{" "}
                    saved to your wishlist.
                  </p>

                </div>

              </div>


              {/* PRODUCTS GRID */}

              <div className={styles.wishlistGrid}>

                {wishlist.map((product) => (

                  <article
                    key={product.name}
                    className={styles.wishlistCard}
                  >

                    {/* IMAGE */}

                    <div className={styles.productImage}>

                      <img
                        src={product.image}
                        alt={product.name}
                      />


                      {/* REMOVE */}

                      <button
                        className={styles.removeButton}
                        onClick={() =>
                          removeFromWishlist(product.name)
                        }
                        aria-label={`Remove ${product.name} from wishlist`}
                      >

                        <Heart
                          size={20}
                          fill="currentColor"
                        />

                      </button>

                    </div>


                    {/* CONTENT */}

                    <div className={styles.productContent}>

                      <h3>
                        {product.name}
                      </h3>

                      <p className={styles.productOrigin}>
                        {product.origin}
                      </p>

                      <span className={styles.productUnit}>
                        {product.unit}
                      </span>


                      <div className={styles.productFooter}>

                        <strong>
                          {product.price}
                        </strong>


                        <button
                          className={styles.addButton}
                          onClick={() =>
                            addToCart(product)
                          }
                        >

                          <ShoppingBasket size={17} />

                          Add to Basket

                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </>

          ) : (

            /* EMPTY WISHLIST */

            <div className={styles.emptyWishlist}>

              <div className={styles.emptyIcon}>
                <Heart size={45} />
              </div>

              <h2>
                Your Wishlist is Empty
              </h2>

              <p>
                Save your favourite fresh products
                and they'll appear here.
              </p>

              <a
                href="/shop"
                className={styles.shopButton}
              >

                Explore Our Shop

                <ArrowRight size={18} />

              </a>

            </div>

          )}

        </div>

      </section>


      <Footer />

    </main>

  );

}