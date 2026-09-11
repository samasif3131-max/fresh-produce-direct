"use client";

import { useState } from "react";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useCart } from "../../context/CartContext";

import {
  ArrowLeft,
  MapPin,
  Truck,
  ShoppingBasket,
  CheckCircle,
  CreditCard,
  Lock,
} from "lucide-react";

import styles from "./Checkout.module.css";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price.replace("£", ""));
    const quantity = item.quantity || 1;

    return total + price * quantity;
  }, 0);

  const deliveryCost =
    deliveryMethod === "delivery"
      ? subtotal >= 30
        ? 0
        : 4.99
      : 0;

  const total = subtotal + deliveryCost;

  return (
    <main className={styles.checkoutPage}>
      <Header />

      {/* HERO */}
      <section className={styles.checkoutHero}>
        <div className={styles.container}>
          <span className={styles.heroTag}>SECURE CHECKOUT</span>

          <h1>Complete Your Order</h1>

          <p>
            Just a few more details and your fresh produce will be on its way.
          </p>
        </div>
      </section>

      {/* CHECKOUT */}
      <section className={styles.checkoutSection}>
        <div className={styles.container}>
          {/* BACK TO CART */}
          <Link href="/cart" className={styles.backButton}>
            <ArrowLeft size={18} />
            Back to Basket
          </Link>

          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <ShoppingBasket size={55} />

              <h2>Your Basket is Empty</h2>

              <p>
                Add some delicious fresh produce before heading to checkout.
              </p>

              <Link href="/shop" className={styles.shopButton}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className={styles.checkoutGrid}>
              {/* LEFT SIDE */}
              <div className={styles.checkoutForms}>
                {/* CONTACT */}
                <div className={styles.formCard}>
                  <div className={styles.cardTitle}>
                    <div className={styles.number}>1</div>

                    <div>
                      <h2>Contact Information</h2>
                      <p>We'll use these details to contact you about your order.</p>
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.fullWidth}>
                      <label>Email Address</label>

                      <input
                        type="email"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label>First Name</label>

                      <input
                        type="text"
                        placeholder="First name"
                      />
                    </div>

                    <div>
                      <label>Last Name</label>

                      <input
                        type="text"
                        placeholder="Last name"
                      />
                    </div>

                    <div className={styles.fullWidth}>
                      <label>Phone Number</label>

                      <input
                        type="tel"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* DELIVERY METHOD */}
                <div className={styles.formCard}>
                  <div className={styles.cardTitle}>
                    <div className={styles.number}>2</div>

                    <div>
                      <h2>Delivery Method</h2>
                      <p>Choose how you would like to receive your order.</p>
                    </div>
                  </div>

                  <div className={styles.deliveryOptions}>
                    <button
                      type="button"
                      className={`${styles.deliveryOption} ${
                        deliveryMethod === "delivery"
                          ? styles.deliveryActive
                          : ""
                      }`}
                      onClick={() => setDeliveryMethod("delivery")}
                    >
                      <Truck size={24} />

                      <div>
                        <strong>Home Delivery</strong>

                        <span>
                          {subtotal >= 30
                            ? "FREE delivery on orders over £30"
                            : "£4.99 delivery"}
                        </span>
                      </div>

                      <div className={styles.radioCircle}>
                        {deliveryMethod === "delivery" && (
                          <div />
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`${styles.deliveryOption} ${
                        deliveryMethod === "collection"
                          ? styles.deliveryActive
                          : ""
                      }`}
                      onClick={() => setDeliveryMethod("collection")}
                    >
                      <MapPin size={24} />

                      <div>
                        <strong>Local Collection</strong>

                        <span>Collect your order for FREE</span>
                      </div>

                      <div className={styles.radioCircle}>
                        {deliveryMethod === "collection" && (
                          <div />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className={styles.formCard}>
                  <div className={styles.cardTitle}>
                    <div className={styles.number}>3</div>

                    <div>
                      <h2>
                        {deliveryMethod === "delivery"
                          ? "Delivery Address"
                          : "Collection Details"}
                      </h2>

                      <p>
                        {deliveryMethod === "delivery"
                          ? "Tell us where you would like your order delivered."
                          : "We'll use your details to prepare your collection."}
                      </p>
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.fullWidth}>
                      <label>Address Line 1</label>

                      <input
                        type="text"
                        placeholder="House number and street"
                      />
                    </div>

                    <div className={styles.fullWidth}>
                      <label>Address Line 2</label>

                      <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                      />
                    </div>

                    <div>
                      <label>Town / City</label>

                      <input
                        type="text"
                        placeholder="Town or city"
                      />
                    </div>

                    <div>
                      <label>Postcode</label>

                      <input
                        type="text"
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                </div>

                {/* PAYMENT */}
                <div className={styles.formCard}>
                  <div className={styles.cardTitle}>
                    <div className={styles.number}>4</div>

                    <div>
                      <h2>Payment</h2>
                      <p>Your payment details are securely protected.</p>
                    </div>
                  </div>

                  <div className={styles.paymentBox}>
                    <CreditCard size={25} />

                    <div>
                      <strong>Payment Method</strong>

                      <span>
                        Payment integration will be connected next.
                      </span>
                    </div>

                    <Lock size={18} />
                  </div>
                </div>

                {/* PLACE ORDER */}
                <Link
                  href="/order-confirmation"
                  className={styles.placeOrderButton}
                >
                  <CheckCircle size={21} />

                  Place Order Securely
                </Link>

                <div className={styles.securityText}>
                  <Lock size={15} />

                  Your information is securely protected.
                </div>
              </div>

              {/* RIGHT SIDE ORDER SUMMARY */}
              <aside className={styles.orderSummary}>
                <div className={styles.summarySticky}>
                  <div className={styles.summaryHeader}>
                    <h2>Your Order</h2>

                    <span>{cart.length} Items</span>
                  </div>

                  <div className={styles.summaryProducts}>
                    {cart.map((item) => (
                      <div
                        key={item.name}
                        className={styles.summaryProduct}
                      >
                        <div className={styles.summaryImage}>
                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <span>{item.quantity || 1}</span>
                        </div>

                        <div className={styles.summaryInfo}>
                          <strong>{item.name}</strong>

                          <small>{item.unit}</small>
                        </div>

                        <b>
                          £
                          {(
                            Number(item.price.replace("£", "")) *
                            (item.quantity || 1)
                          ).toFixed(2)}
                        </b>
                      </div>
                    ))}
                  </div>

                  <div className={styles.summaryCalculations}>
                    <div>
                      <span>Subtotal</span>

                      <strong>£{subtotal.toFixed(2)}</strong>
                    </div>

                    <div>
                      <span>Delivery</span>

                      <strong>
                        {deliveryCost === 0
                          ? "FREE"
                          : `£${deliveryCost.toFixed(2)}`}
                      </strong>
                    </div>

                    {deliveryMethod === "delivery" &&
                      subtotal < 30 && (
                        <p className={styles.deliveryNotice}>
                          Add £{(30 - subtotal).toFixed(2)} more for FREE delivery!
                        </p>
                      )}

                    <div className={styles.totalRow}>
                      <span>Total</span>

                      <strong>£{total.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className={styles.summaryBenefits}>
                    <div>
                      <CheckCircle size={17} />
                      Fresh quality produce
                    </div>

                    <div>
                      <CheckCircle size={17} />
                      Secure checkout
                    </div>

                    <div>
                      <CheckCircle size={17} />
                      Local growers supported
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}