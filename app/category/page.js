// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, ArrowLeft } from 'lucide-react';

// export default function AllCategories() {
//   const [productsByCategory, setProductsByCategory] = useState({}); //simpan data perkategori

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch('https://dummyjson.com/products');
//       const data = await res.json();

//       const grouped = {};
//       data.products.forEach((product) => {
//         const category = product.category;
//         if (!grouped[category]) {
//           grouped[category] = [];
//         }
//         grouped[category].push(product);
//       });

//       setProductsByCategory(grouped);
//     }
//     fetchData();
//   }, []);

//   return (
//     <section className="min-h-screen bg-white p-9">
//       <div className="max-w-screen-xl mx-auto mb-8">
//         <div className="flex justify-between items-center mb-6 px-2">
//           <div className="flex items-center gap-4">
//             <Link href="/" className="flex items-center gap-2 text-blue-600 hover:underline">
//               <ArrowLeft className="w-5 h-5" />
//             </Link>
//             <h2 className="text-2xl font-bold text-blue-600">Category</h2>
//           </div>
//         </div>

//         {Object.entries(productsByCategory).map(([category, products]) => (
//           <div key={category} className="mb-8">
//             <h3 className="text-xl font-semibold text-blue-600 mb-4">{category}</h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.slice(0, 4).map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col items-center bg-white border-2 border-blue-500 rounded-lg p-4 text-blue-500 hover:bg-blue-300 transition-all duration-300 w-56 ml-5"
//                 >
//                   {item.thumbnail && (
//                     <Image
//                       src={item.thumbnail}
//                       alt={item.title}
//                       width={100}
//                       height={100}
//                       className="rounded-lg mb-3 object-cover w-20 h-24"
//                     />
//                   )}
//                   <h3 className="text-center text-sm font-medium capitalize mb-1 w-full truncate">{item.title}</h3>
//                   <p className="text-center text-sm font-semibold mb-2 w-full">
//                     IDR {item.price.toLocaleString('id-ID')}
//                   </p>
//                   <button
//                     className="text-blue-500 mt-2 p-2 rounded transition-all duration-300 hover:scale-125"
//                     onClick={() => {
//                       console.log(`Tambah ke keranjang: ${item.title}`);
//                     }}
//                   >
//                     <ShoppingCart size={24} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
