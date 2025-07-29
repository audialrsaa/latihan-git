'use client';

import { useEffect, useState } from 'react'; 
import Image from 'next/image'; 
import { ArrowLeft, ShoppingCart, Bell, UserCircle, Truck, CreditCard, MapPin, Minus, Plus } from 'lucide-react'; 
import Link from 'next/link'; 
import Swal from 'sweetalert2';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]); 
  const [selectedItems, setSelectedItems] = useState([]);

  const shippingCost = 2.23;
  const serviceFee = 1.43;

  useEffect(() => { //cllbck
    const buyNowItemJSON = localStorage.getItem('buyNowItem'); 
    const checkoutType = localStorage.getItem('type');

    switch (checkoutType) {
      case 'cart':
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        console.log(false, cart) //simpen product
        setSelectedItems(cart.map((_, i) => i));
        break;

      case 'buy-now':
        const buyNowItem = JSON.parse(buyNowItemJSON);
        setCartItems([buyNowItem]);
        console.log(true, buyNowItem) //simpan satu barang aj
        setSelectedItems([0]);
        break;
    
      default:
        window.location.href = '/home'; //data ga sesuai balik ke home
        break;
    }
  }, []);

  //updt kuantitas item
  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  //toal
  const totalItemPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  //total kuantitas all item (buat nampilin jumlah item yang benar)
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = totalItemPrice + shippingCost + serviceFee;

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-8 md:px-16 lg:px-32 relative">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b-2 border-blue-500 pb-2">
        {/* Header dengan navigasi kembali */}
        <Link href="/home" className="flex items-center gap-2 text-blue-700">
          <ArrowLeft />
          <span className="text-base sm:text-xl font-bold text-blue-700">MongStore | Checkout</span>
        </Link>
        <div className="flex gap-4 sm:gap-6 text-blue-600">
          {/* Tombol untuk navigasi ke cart dan profile */}
          <Link href="/cart">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
            <Bell className="w-6 h-6" />
          </button>
          <Link href="/profile">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <UserCircle className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bagian Kiri (Detail Pembelian dan Alamat Pengiriman) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Alamat Pengiriman */}
          <div className="border-2 border-blue-500 p-4 rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 items-center text-blue-600 font-bold">
                <MapPin />
                <span>Delivery Address</span>
              </div>
              <button className="text-sm text-blue-500 font-semibold">Change</button>
            </div>
            <p className="font-bold text-blue-800 mt-2">Ning Yuzhao | +62 8123456789</p>
            <p className="text-blue-700 text-sm">Jl. Bikini Bottom NO 23B Depok Jawa Barat</p>
          </div>

          {/* Detail Produk */}
          <div className="border-2 border-blue-500 p-4 rounded-xl">
            <h3 className="font-bold text-blue-600 mb-3">Detail Product</h3>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div className="flex-1 w-full">
                    <p className="font-bold text-sm text-blue-900 uppercase">{item.title}</p>
                    <p className="text-sm text-blue-700">IDR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
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
                      className="text-blue-500 ml-2 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-blue-500">No items in cart.</p>
            )}
          </div>
        </div>

        {/* Bagian Kanan (Metode Pembayaran dan Rincian Pembayaran) */}
        <div className="flex flex-col gap-6">
          {/* Metode Pembayaran */}
          <div className="border-2 border-blue-500 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center text-blue-600 font-bold">
                <CreditCard />
                <span>Payment Method</span>
              </div>
              <button className="text-sm text-blue-500 font-semibold">Change</button>
            </div>
            <p className="text-blue-800 font-semibold mt-2">Transfer to Virtual Account</p>
            <p className="text-sm mt-1 bg-blue-100 inline-block px-2 py-1 rounded text-blue-800">BCA</p>
          </div>

          {/* Metode Pengiriman */}
          <div className="border-2 border-blue-500 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center text-blue-600 font-bold">
                <Truck />
                <span>Shipping Method</span>
              </div>
              <button className="text-sm text-blue-500 font-semibold">Change</button>
            </div>
            <p className="text-blue-800 font-semibold mt-2">Economy</p>
            <p className="text-sm text-blue-600">IDR {shippingCost.toLocaleString()}</p>
          </div>

          {/* Rincian Pembayaran */}
          <div className="border-2 border-blue-500 p-4 rounded-xl">
            <h3 className="font-bold text-blue-700 mb-2">Payment details</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>Order Total ( {totalQuantity} Item{totalQuantity > 1 ? 's' : ''} ): <span className="float-right">IDR {totalItemPrice.toLocaleString()}</span></p>
              <p>Buyer Service Fee: <span className="float-right">IDR {serviceFee.toLocaleString()}</span></p>
              <p>Shipping Subtotal: <span className="float-right">IDR {shippingCost.toLocaleString()}</span></p>
              <hr className="my-2 border-blue-300" />
              <p className="font-bold">Total Payment: <span className="float-right">IDR {totalPrice.toLocaleString()}</span></p>
            </div>
            <button 
              onClick={() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Checkout Berhasil!',
                  text: 'Pesananmu berhasil dibuat.',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#2563EB', 
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('buyNowItem');  // hapus juga buyNowItem setelah checkout
                    window.location.href = '/home';
                  }
                });
              }}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
