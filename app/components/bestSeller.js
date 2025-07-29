'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export default function BestSeller() {
  const [bestSell, setBestSell] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setBestSell(data.products.slice(0, 4)); // ambil 4 produk pertama
    }
    fetchData();
  }, []);

  return (
    <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-48 my-8 bg-white p-9 rounded-xl shadow border-2 border-blue-500">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-blue-600">Best Seller</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSell.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center  shadow-md bg-white rounded-xl p-4 text-blue-600 hover:bg-blue-300 transition-all duration-300 w-full"
          >
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-lg mb-3 object-cover w-20 h-24"
              />
            )}
            <h3 className="text-center text-sm font-medium capitalize mb-1 w-full truncate">{item.title}</h3>
            <p className="text-center text-sm font-semibold mb-2 w-full">
              IDR {item.price.toLocaleString('id-ID')}
            </p>
            <button
              className="text-blue-600 mt-2 p-2 rounded transition-all duration-300 hover:scale-125"
              onClick={() => {
                console.log(`Tambah ke keranjang: ${item.title}`);
              }}
            >
              <ShoppingCart size={24} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
