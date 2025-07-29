'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const uniqueCategories = [...new Set(data.products.map((p) => p.category))].slice(0, 4);
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
      <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-48 my-8 bg-white p-9 rounded-xl shadow border-2 border-blue-500">
    <div className="flex justify-between items-center mb-6 px-2">
      <h2 className="text-xl font-bold text-blue-600">Category</h2>
      <Link href="/categories" className="text-blue-600 font-medium hover:underline">
        See All
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        const product = products.find((p) => p.category === category);

        return (
          <div
            key={index}
            className="flex flex-col items-center border shadow-lg bg-whte rounded-xl p-4 text-blue-600 hover:bg-blue-300 transition-all duration-300 cursor-pointer"
          >
            {product?.thumbnail && (
              <Image
                src={product.thumbnail}
                alt={category}
                width={100}
                height={100}
                className="rounded-lg mb-3 object-cover w-20 h-24"
              />
            )}
            <p className="text-sm font-medium capitalize">{category}</p>
          </div>
        );
      })}
    </div>
      </section>

  );
}
