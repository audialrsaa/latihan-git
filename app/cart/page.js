'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Bell, User, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    setSelectedItems(storedCart.map((_, i) => i)); // semua item terpilih
  }, []);

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const checkout = () => {
    localStorage.setItem('type', 'cart');
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    window.location.href = '/checkout';
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((_, i) => i));
    }
  };

  const toggleItemSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const getSelectedTotal = () => {
    return selectedItems.reduce((total, index) => {
      const item = cartItems[index];
      return item ? total + item.price * item.quantity : total;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-32 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-3">
        <div className="flex items-center gap-3 text-blue-700">
          <Link href="/home">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">MongStore | Cart Page</h1>
        </div>
        <div className="flex items-center gap-4 text-blue-700">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
            <Bell className="h-6 w-6" />
          </button>
          <Link href="/profile">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <User className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-2 text-blue-600 font-medium">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length && cartItems.length > 0}
              onChange={toggleSelectAll}
              className="w-5 h-5 accent-blue-600"
            />
            <span>Select All</span>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center border-2 border-blue-500 p-4 rounded-xl mb-4 gap-4"
              >
                <div className="flex items-start sm:items-center gap-4 w-full">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleItemSelection(index)}
                  />
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-blue-700 text-sm sm:text-base">{item.title}</p>
                    <p className="text-blue-600 font-medium mt-1 text-sm">
                      IDR {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 sm:ml-auto">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="border border-blue-600 px-2 py-1 rounded text-blue-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-blue-500">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="border border-blue-600 px-2 py-1 rounded text-blue-600"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => {
                      const updated = [...cartItems];
                      updated.splice(index, 1);
                      setCartItems(updated);
                      localStorage.setItem('cart', JSON.stringify(updated));
                      setSelectedItems(updated.map((_, i) => i));
                    }}
                    className="text-blue-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[320px] border-2 border-blue-500 p-6 rounded-xl">
          <h2 className="font-bold text-blue-700 mb-4 text-lg">Order Details</h2>
          <div className="text-sm text-blue-800 space-y-2">
            <p className="flex justify-between">
              <span>
                Order Total ({selectedItems.length} Item{selectedItems.length > 1 ? 's' : ''})
              </span>
              <span>
                IDR {selectedItems.length > 0 ? getSelectedTotal().toLocaleString() : '0'}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Buyer Service Fee:</span>
              <span>IDR {selectedItems.length > 0 ? '1.43' : '0.00'}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Subtotal:</span>
              <span>IDR {selectedItems.length > 0 ? '2.23' : '0.00'}</span>
            </p>
            <hr />
            <p className="flex justify-between font-bold">
              <span>Total Item:</span>
              <span>
                IDR{' '}
                {selectedItems.length > 0
                  ? (getSelectedTotal() + 1.43 + 2.23).toLocaleString()
                  : '0'}
              </span>
            </p>
          </div>
          <button
            onClick={checkout}
            disabled={selectedItems.length === 0}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
