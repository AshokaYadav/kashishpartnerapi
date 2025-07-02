// 'use client';

// import { useState } from 'react';
// import { useFilters } from '../fundRequest/Hooks/useFilters';

// interface Transaction {
//   id: number;
//   name: string;
//   amount: number;
//   date: string;
// }

// const Page = () => {
//   const transactions: Transaction[] = [
//     { id: 1, name: 'Alice', amount: 500, date: '2024-06-20' },
//     { id: 2, name: 'Bob', amount: 300, date: '2024-07-01' },
//     { id: 3, name: 'Charlie', amount: 1000, date: '2024-07-05' },
//     { id: 4, name: 'Alice', amount: 750, date: '2024-07-10' }
//   ];

//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [name, setname] = useState('');
//   // const [filtered, setFiltered] = useState<Transaction[]>(transactions);
//   // const{filteredData:filtered,applyFilters}=useFilters(transactions)


//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold text-blue-700">Filter Transactions</h1>

//       {/* 🔍 Filter Inputs */}
//       <div className="flex flex-wrap gap-4 items-end">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">From Date</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">To Date</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setname(e.target.value)}
//             placeholder="Search name"
//             className="border rounded p-2 w-full"
//           />
//         </div>

//         <button
//           onClick={()=>applyFilters({fromDate,toDate,name})}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Filter
//         </button>
//       </div>

//       {/* 🧾 Filtered Table */}
//       <table className="w-full table-auto border mt-6 text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">ID</th>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Amount</th>
//             <th className="border px-4 py-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.length > 0 ? (
//             filtered.map((t) => (
//               <tr key={t.id}>
//                 <td className="border px-4 py-2 text-center">{t.id}</td>
//                 <td className="border px-4 py-2 text-center">{t.name}</td>
//                 <td className="border px-4 py-2 text-center">₹{t.amount}</td>
//                 <td className="border px-4 py-2 text-center">{t.date}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center py-4 text-gray-500">
//                 No data found for selected filters.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Page;
