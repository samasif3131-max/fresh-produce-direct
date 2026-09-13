"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

/* =========================================
   PRODUCT TYPE
========================================= */

type Product = {
  name: string;
  price: string;
  image: string;
  origin?: string;
  unit?: string;
  category?: string;
  quantity: number;
};

/* =========================================
   CART CONTEXT TYPE
========================================= */

type CartContextType = {
  cart: Product[];

  addToCart: (
    product: Omit<Product, "quantity">
  ) => void;

  increaseQuantity: (name: string) => void;

  decreaseQuantity: (name: string) => void;

  removeFromCart: (name: string) => void;

  clearCart: () => void;
};

/* =========================================
   CREATE CONTEXT
========================================= */

const CartContext = createContext<
  CartContextType | undefined
>(undefined);


/* =========================================
   CART PROVIDER
========================================= */

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [cart, setCart] = useState<Product[]>([]);


  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = (
    product: Omit<Product, "quantity">
  ) => {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) => item.name === product.name
        );


      /* PRODUCT ALREADY EXISTS */

      if (existingProduct) {

        return currentCart.map((item) =>

          item.name === product.name
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item

        );

      }


      /* ADD NEW PRODUCT */

      return [

        ...currentCart,

        {
          ...product,
          quantity: 1,
        },

      ];

    });

  };


  /* =========================================
     INCREASE QUANTITY
  ========================================= */

  const increaseQuantity = (name: string) => {

    setCart((currentCart) =>

      currentCart.map((item) =>

        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item

      )

    );

  };


  /* =========================================
     DECREASE QUANTITY
  ========================================= */

  const decreaseQuantity = (name: string) => {

    setCart((currentCart) =>

      currentCart
        .map((item) =>

          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item

        )

        .filter(
          (item) => item.quantity > 0
        )

    );

  };


  /* =========================================
     REMOVE PRODUCT
  ========================================= */

  const removeFromCart = (name: string) => {

    setCart((currentCart) =>

      currentCart.filter(
        (item) => item.name !== name
      )

    );

  };


  /* =========================================
     CLEAR CART
  ========================================= */

  const clearCart = () => {

    setCart([]);

  };


  /* =========================================
     PROVIDER
  ========================================= */

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


/* =========================================
   USE CART HOOK
========================================= */

export function useCart() {

  const context = useContext(CartContext);


  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }


  return context;

}