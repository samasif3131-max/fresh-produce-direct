"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../../context/CartContext";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShoppingBasket,
} from "lucide-react";

import styles from "./Cart.module.css";

export default function CartPage() {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce((total: number, item: any) => {
    const price = Number(item.price.replace("£", ""));
    return total + price * item.quantity;
  }, 0);

  const delivery = subtotal > 0 ? 3.95 : 0;

  const total = subtotal + delivery;

  return (
    <main className={styles.cartPage}>
      <Header />

      {/* ================= HERO ================= */}

      <section className={styles.cartHero}>
        <div className={styles.cartHeroContent}>
          <span>FRESH • LOCAL • DELIVERED</span>

          <h1>Your Basket</h1>

          <p>
            Fresh local produce, carefully selected and ready for delivery.
          </p>
        </div>
      </section>

      {/* ================= CART CONTENT ================= */}

      <section className={styles.cartSection}>
        <div className={styles.cartContainer}>

          {/* ================= EMPTY CART ================= */}

          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>
                <ShoppingBasket size={55} />
              </div>

              <h2>Your basket is empty</h2>

              <p>
                Looks like you haven&apos;t added anything yet.
                Explore our fresh local produce and find something delicious.
              </p>

              <Link href="/shop" className={styles.shopButton}>
                Continue Shopping
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className={styles.cartLayout}>

              {/* ================= CART ITEMS ================= */}

              <div className={styles.cartItems}>

                <div className={styles.cartHeader}>
                  <div>
                    <span className={styles.sectionTag}>
                      YOUR ORDER
                    </span>

                    <h2>Shopping Basket</h2>

                    <p>
                      {cart.length} product
                      {cart.length !== 1 ? "s" : ""} in your basket
                    </p>
                  </div>

                  <Link
                    href="/shop"
                    className={styles.continueShopping}
                  >
                    Continue Shopping
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* ITEMS */}

                <div className={styles.itemsList}>
                  {cart.map((item: any) => {

                    const itemPrice = Number(
                      item.price.replace("£", "")
                    );

                    const itemTotal =
                      itemPrice * item.quantity;

                    return (
                      <article
                        className={styles.cartItem}
                        key={item.name}
                      >
                        {/* IMAGE */}

                        <div className={styles.itemImage}>
                          <img
                            src={item.image}
                            alt={item.name}
                          />
                        </div>

                        {/* INFO */}

                        <div className={styles.itemInfo}>
                          <div className={styles.itemTop}>
                            <div>
                              <h3>{item.name}</h3>

                              <p>{item.origin}</p>

                              <span>{item.unit}</span>
                            </div>

                            <button
                              className={styles.removeButton}
                              onClick={() =>
                                removeFromCart(item.name)
                              }
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={19} />
                            </button>
                          </div>

                          <div className={styles.itemBottom}>

                            {/* QUANTITY */}

                            <div className={styles.quantityControl}>
                              <button
                                onClick={() =>
                                  decreaseQuantity(item.name)
                                }
                              >
                                <Minus size={16} />
                              </button>

                              <span>
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  addToCart(item)
                                }
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* PRICE */}

                            <div className={styles.itemPrice}>
                              <span>
                                £{itemPrice.toFixed(2)} each
                              </span>

                              <strong>
                                £{itemTotal.toFixed(2)}
                              </strong>
                            </div>

                          </div>
                        </div>

                      </article>
                    );
                  })}
                </div>

              </div>


              {/* ================= ORDER SUMMARY ================= */}

              <aside className={styles.orderSummary}>

                <span className={styles.sectionTag}>
                  ORDER SUMMARY
                </span>

                <h2>Your Order</h2>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>

                  <strong>
                    £{subtotal.toFixed(2)}
                  </strong>
                </div>

                <div className={styles.summaryRow}>
                  <span>Delivery</span>

                  <strong>
                    £{delivery.toFixed(2)}
                  </strong>
                </div>

                <div className={styles.summaryDivider}></div>

                <div className={styles.totalRow}>
                  <span>Total</span>

                  <strong>
                    £{total.toFixed(2)}
                  </strong>
                </div>

                <button className={styles.checkoutButton}>
                  Proceed to Checkout
                  <ArrowRight size={19} />
                </button>

                <div className={styles.summaryNote}>
                  <ShoppingBag size={18} />

                  <p>
                    Fresh produce will be carefully prepared
                    for your selected delivery area.
                  </p>
                </div>

              </aside>

            </div>
          )}

        </div>
      </section>

      {/* ================= TRUST BAR ================= */}

      <section className={styles.trustSection}>
        <div className={styles.trustContainer}>

          <div>
            <span>🥬</span>
            <p>Fresh Local Produce</p>
          </div>

          <div>
            <span>🚚</span>
            <p>Delivered With Care</p>
          </div>

          <div>
            <span>🌱</span>
            <p>Supporting Local Growers</p>
          </div>

          <div>
            <span>💚</span>
            <p>A Brighter Tomorrow</p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}