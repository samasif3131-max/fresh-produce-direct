"use client";

import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useCart } from "../../context/CartContext";

import {
  CheckCircle2,
  ShoppingBasket,
  Truck,
  MapPin,
  ArrowRight,
  Leaf,
  Heart,
  PackageCheck,
} from "lucide-react";

import styles from "./OrderConfirmation.module.css";

export default function OrderConfirmationPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price.replace("£", ""));
    const quantity = item.quantity || 1;

    return total + price * quantity;
  }, 0);

  const deliveryCost = subtotal >= 30 ? 0 : 4.99;

  const total = subtotal + deliveryCost;

  const orderNumber = "FPD-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <main className={styles.confirmationPage}>
      <Header />

      {/* SUCCESS HERO */}
      <section className={styles.successHero}>
        <div className={styles.container}>
          <div className={styles.successIcon}>
            <CheckCircle2 size={58} />
          </div>

          <span className={styles.successTag}>
            ORDER SUCCESSFUL
          </span>

          <h1>Thank You for Your Order!</h1>

          <p>
            Your order has been received successfully and we're getting your
            fresh produce ready.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className={styles.confirmationSection}>
        <div className={styles.container}>
          <div className={styles.confirmationGrid}>

            {/* LEFT SIDE */}
            <div className={styles.mainContent}>

              {/* ORDER NUMBER */}
              <div className={styles.orderCard}>
                <div className={styles.orderIcon}>
                  <PackageCheck size={28} />
                </div>

                <div>
                  <span>Your Order Number</span>

                  <h2>{orderNumber}</h2>

                  <p>
                    Please keep this order number for your records.
                  </p>
                </div>
              </div>

              {/* WHAT HAPPENS NEXT */}
              <div className={styles.infoCard}>
                <span className={styles.sectionTag}>
                  WHAT HAPPENS NEXT
                </span>

                <h2>We're Preparing Your Fresh Produce</h2>

                <p className={styles.sectionText}>
                  Our team will carefully prepare your order and make sure
                  everything is fresh and ready for you.
                </p>

                <div className={styles.steps}>

                  <div className={styles.step}>
                    <div className={styles.stepIcon}>
                      <CheckCircle2 size={21} />
                    </div>

                    <div>
                      <strong>Order Received</strong>

                      <span>
                        We've received your order successfully.
                      </span>
                    </div>
                  </div>

                  <div className={styles.step}>
                    <div className={styles.stepIcon}>
                      <Leaf size={21} />
                    </div>

                    <div>
                      <strong>Fresh Produce Selected</strong>

                      <span>
                        Your items will be carefully selected for quality.
                      </span>
                    </div>
                  </div>

                  <div className={styles.step}>
                    <div className={styles.stepIcon}>
                      <Truck size={21} />
                    </div>

                    <div>
                      <strong>Ready for Delivery</strong>

                      <span>
                        We'll let you know when your order is on its way.
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* DELIVERY INFORMATION */}
              <div className={styles.infoCard}>
                <span className={styles.sectionTag}>
                  DELIVERY INFORMATION
                </span>

                <h2>Your Fresh Produce is on Its Way</h2>

                <div className={styles.deliveryInfo}>
                  <Truck size={26} />

                  <div>
                    <strong>Home Delivery</strong>

                    <p>
                      Your order will be carefully packed and delivered fresh
                      to your chosen address.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE ORDER SUMMARY */}
            <aside className={styles.orderSummary}>
              <div className={styles.summarySticky}>

                <div className={styles.summaryHeader}>
                  <div>
                    <span>ORDER SUMMARY</span>

                    <h2>Your Fresh Produce</h2>
                  </div>

                  <ShoppingBasket size={25} />
                </div>

                {/* PRODUCTS */}
                <div className={styles.summaryProducts}>

                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item.name}
                        className={styles.summaryProduct}
                      >
                        <div className={styles.productImage}>
                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <span>
                            {item.quantity || 1}
                          </span>
                        </div>

                        <div className={styles.productInfo}>
                          <strong>{item.name}</strong>

                          <small>
  Fresh Produce
</small>
                        </div>

                        <b>
                          £
                          {(
                            Number(
                              item.price.replace("£", "")
                            ) * (item.quantity || 1)
                          ).toFixed(2)}
                        </b>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noItems}>
                      Your order details are being prepared.
                    </p>
                  )}

                </div>

                {/* TOTALS */}
                <div className={styles.totals}>

                  <div>
                    <span>Subtotal</span>

                    <strong>
                      £{subtotal.toFixed(2)}
                    </strong>
                  </div>

                  <div>
                    <span>Delivery</span>

                    <strong>
                      {deliveryCost === 0
                        ? "FREE"
                        : `£${deliveryCost.toFixed(2)}`}
                    </strong>
                  </div>

                  <div className={styles.totalRow}>
                    <span>Total Paid</span>

                    <strong>
                      £{total.toFixed(2)}
                    </strong>
                  </div>

                </div>

                {/* THANK YOU */}
                <div className={styles.thankYouBox}>
                  <Heart size={18} />

                  <p>
                    Thank you for supporting local growers and choosing fresh,
                    quality produce.
                  </p>
                </div>

              </div>
            </aside>

          </div>

          {/* BUTTONS */}
          <div className={styles.actionButtons}>

            <Link
              href="/shop"
              className={styles.shopButton}
            >
              <ShoppingBasket size={19} />

              Continue Shopping
            </Link>

            <Link
              href="/"
              className={styles.homeButton}
            >
              Back to Home

              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}