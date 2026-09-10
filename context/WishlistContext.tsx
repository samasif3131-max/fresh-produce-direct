"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


type WishlistProduct = {
  name: string;
  origin: string;
  unit: string;
  price: string;
  category: string;
  image: string;
};


type WishlistContextType = {
  wishlist: WishlistProduct[];

  addToWishlist: (product: WishlistProduct) => void;

  removeFromWishlist: (name: string) => void;

  isInWishlist: (name: string) => boolean;
};


const WishlistContext =
  createContext<WishlistContextType | undefined>(undefined);


export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [wishlist, setWishlist] =
    useState<WishlistProduct[]>([]);


  const addToWishlist = (
    product: WishlistProduct
  ) => {

    setWishlist((current) => {

      const alreadyExists = current.some(
        (item) => item.name === product.name
      );

      if (alreadyExists) {
        return current;
      }

      return [...current, product];

    });

  };


  const removeFromWishlist = (
    name: string
  ) => {

    setWishlist((current) =>
      current.filter(
        (item) => item.name !== name
      )
    );

  };


  const isInWishlist = (
    name: string
  ) => {

    return wishlist.some(
      (item) => item.name === name
    );

  };


  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}


export function useWishlist() {

  const context = useContext(WishlistContext);

  if (!context) {

    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );

  }

  return context;

}