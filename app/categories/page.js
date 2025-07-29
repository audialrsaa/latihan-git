'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AllCategories() {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    async function fetchData() {  
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();

      const grouped = {};
      data.products.forEach((product) => {
        const category = product.category; //ambl dt dr produk
        if (!grouped[category]) {
          grouped[category] = []; //klw blm ad kategori, buat array br
        }
        grouped[category].push(product); //add prodk ke cat yg sesuai
      });

      setProductsByCategory(grouped);
    }
    fetchData();
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
    <section className="min-h-screen bg-white p-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/home" className="flex items-center gap-2 text-blue-600 hover:underline">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold text-blue-600">MongStore | Category Page</h2>
        </div>

        {/* Kategori */}
        {Object.entries(productsByCategory).map(([category, products]) => (
          <div
            key={category}
            className="mb-10 border border-blue-400 rounded-xl p-5 shadow-sm"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-5 capitalize">{category}</h3>

            {/* Produk List */}
            <div className="flex gap-24 overflow-x-auto pb-2">
              {products.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="group relative w-[180px] bg-white border border-blue-300 rounded-lg p-4 shadow-md flex-shrink-0 flex flex-col justify-between cursor-pointer group transition-transform duration-200 hover:scale-[0.99] hover:shadow-lg overflow-hidden"
                >
                  {/* Cart Button Atas */}
                  <div className="absolute top-2 right-2 z-20">
                    <button
                      onClick={() => addToCart(item)}
                      className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                      title="Tambah ke Keranjang"
                    >
                      <ShoppingCart size={22} />
                    </button>
                  </div>

                  {/* Link dan Gambar */}
                  <Link href={`/desc?id=${item.id}`}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="rounded-md object-contain mx-auto max-h-40 mb-3"
                    />
                    <h4 className="mt-8 text-sm font-medium text-center text-blue-600 truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-center text-blue-600 font-semibold mt-3">
                      IDR {item.price.toLocaleString('id-ID')}
                    </p>
                  </Link>

                  {/* BOTTOM HALF OVERLAY */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-300 bg-opacity-30 
                    backdrop-blur-sm flex justify-center items-center opacity-0 
                    group-hover:opacity-90 transition-all duration-300 pointer-events-none z-10 rounded-b-lg"
                  >
                    <span className="text-blue-800 font-semibold text-sm select-none">
                      See Product
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
