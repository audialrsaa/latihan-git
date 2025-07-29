'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Bell, User, Minus, Plus } from 'lucide-react';

export default function ProductDescPage() {
  const searchParams = useSearchParams(); //ambl param dri url
  const productId = searchParams.get('id'); //ambl nilai id dri url
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); //jumlah default yg dipilih

  useEffect(() => {
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then(setProduct);
    }
  }, [productId]); //jaalan klw id prdk brubah

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingIndex = cart.findIndex((item) => item.id === product.id); //cek produk

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/cart';
  };

  const buyNow = () => {
    if (!product.id) return; //klw id gd jgn lnjut

    const buyNowItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
    };

    localStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
    localStorage.setItem('type', 'buy-now');

    window.location.href = '/checkout';
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-8 md:px-16 lg:px-48">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-2">
        <Link href="/home" className="flex items-center gap-2 text-blue-700">
          <ArrowLeft />
          <span className="text-xl sm:text-2xl font-bold text-blue-700">MongStore | Description Page</span>
        </Link>
        <div className="flex gap-6 text-blue-600">
          <Link href="/cart">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <ShoppingCart className="w-6 h-6 cursor" />
            </button>
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
            <Bell className="w-6 h-6 cursor-pointer" />
          </button>
          <Link href="/profile">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <User className="w-6 h-6 cursor-pointer" />
            </button>
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-white rounded-xl p-6 sm:p-8 mb-10 shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="mx-auto">
            {product?.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={180}
                height={180}
                className="rounded-xl object-contain"
              />
            ) : (
              <div className="w-[180px] h-[180px] bg-gray-200 rounded-xl" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">{product?.title || ''}</h2>
            <p className="text-sm text-blue-600 mb-1">84.3RB Rating | 100RB+ Sold</p>
            <p className="text-2xl font-bold text-blue-800 mb-2">
              {product?.price ? `IDR ${product.price.toLocaleString()}` : ''}
            </p>
            <p className="text-sm text-blue-600 mb-4">
              Shipping <span className="font-medium">Guaranteed On-Time Delivery</span>
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-blue-500">Quantity</span>
              <button
                onClick={() => changeQuantity(-1)}
                className="border border-blue-600 px-2 py-1 rounded text-blue-600"
              >
                <Minus size={14} />
              </button>
              <span className="w-2 text-center text-blue-500">{quantity}</span>
              <button
                onClick={() => changeQuantity(1)}
                className="border border-blue-600 px-2 py-1 rounded text-blue-600"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="text-sm text-gray-700 mb-4">
              <h3 className="font-bold text-blue-700 mb-2">Product Description</h3>
              <p>{product?.description || ''}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="border border-blue-600 text-blue-600 hover:bg-blue-300 font-semibold px-4 py-2 rounded"
              >
                Add To Cart
              </button>
              <button
                onClick={buyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4 border border-blue-500 rounded-lg p-4 bg-white shadow-sm">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/f0/a9/51/f0a9515ee9e8fd7722704a3d8457f0bc.jpg')",
            }}
          />
          <div>
            <p className="font-semibold text-blue-800">Aeri Uchinaga</p>
            <p className="text-sm text-gray-700">
              Libre L’Eau Nue feels like confidence in a bottle — soft, sensual, and unforgettable. It lingers like second skin.
            </p>
            <p className="text-yellow-500 text-sm mt-1">★★★★★</p>
          </div>
        </div>

        <div className="flex items-start gap-4 border border-blue-500 rounded-lg p-4 bg-white shadow-sm">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/bb/32/47/bb32476785303536f59f3ef057fbfb0c.jpg')",
            }}
          />
          <div>
            <p className="font-semibold text-blue-800">Asa Enami</p>
            <p className="text-sm text-gray-700">
              A delicate yet powerful scent. Floral, fresh, and effortlessly elegant — it truly defines modern femininity.
            </p>
            <p className="text-yellow-500 text-sm mt-1">★★★★★</p>
          </div>
        </div>

        <div className="flex items-start gap-4 border border-blue-500 rounded-lg p-4 bg-white shadow-sm">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/13/75/19/1375191690bd8b209b315d0fd2440443.jpg')",
            }}
          />
          <div>
            <p className="font-semibold text-blue-800">Kim So-won</p>
            <p className="text-sm text-gray-700">
              Wearing Libre L’Eau Nue is like wrapping yourself in a sheer veil of luxury. It’s intimate, warm, and addictive.
            </p>
            <p className="text-yellow-500 text-sm mt-1">★★★★★</p>
          </div>
        </div>
      </div>
    </div>
  );
}
