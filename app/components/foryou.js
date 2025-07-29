"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";

export default function ForYou() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products.slice(0, 8))); //ambil 8 produk pertama 
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; //ambil cart dari ls, kalau gaada ambil array kosong
    const existingIndex = cart.findIndex((item) => item.id === product.id); 

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1; //kalau barang ada, tambah 
    } else { //kalau blm tambahin produk ke cart
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); //simpan ke ls

    //notif pake swal
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `"${product.title}" has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-48 my-8 bg-white p-9 rounded-xl shadow border-2 border-blue-500">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">For You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => (window.location.href = `/desc?id=${product.id}`)}
            className="relative bg-white text-blue-600 rounded-2xl shadow-md p-5 flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-[0.99] hover:shadow-lg overflow-hidden"
          >
            <div className="relative w-24 h-24 mb-4 z-10">
              <Image
                src={product.thumbnail}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </div>

            <span className="text-base font-semibold text-center z-10">
              {product.title}
            </span>

            <span className="text-sm font-medium text-blue-600 text-center mt-auto z-10">
              IDR {product.price.toLocaleString()}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="absolute top-3 right-2 text-blue-600 hover:text-blue-800 transition-transform hover:scale-110 p-2 "
              aria-label={`Add ${product.title} to cart`}
              title={`Add ${product.title} to cart`}
            >
              <ShoppingCart size={20} />
            </button>

            <div
              className="absolute bottom-0 left-0 right-0 h-1/2
                bg-blue-300 bg-opacity-20 backdrop-blur-sm flex justify-center items-center
                opacity-0 translate-y-full group-hover:opacity-70 group-hover:translate-y-0
                transition-all duration-300 pointer-events-none z-10"
            >
              <span className="text-blue-800 font-semibold text-sm select-none">
                See Product
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
