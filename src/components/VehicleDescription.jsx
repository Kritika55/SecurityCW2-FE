// import React from "react";
// import BookNow from "./BookNow";

// const VehicleDescription = ({ vehicle, id }) => {
  
//   return (
//     <div className="flex bg-white mx-[10rem] text-gray-900 p-8">
//       <div className="container mx-auto">
//         {vehicle?.design && (
//           <>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold mb-4">Design</h1>
//               <p className="text-lg leading-relaxed">
//                 {vehicle?.design.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {vehicle?.design?.features.map((feature, index) => {
//                 <div
//                   key={index}
//                   className="border border-gray-300 p-4 rounded-lg"
//                 >
//                   <h2 className="text-xl font-semibold mb-2">
//                     {feature.name}
//                   </h2>
//                   <p className="text-sm">{feature.description}</p>
//                 </div>;
//               })}
//             </div>
//           </>
//         )}

//         {vehicle?.interior && (
//           <>
//             <div className="mt-8">
//               <h2 className="text-3xl font-semibold mb-4">Interior</h2>
//               <p className="text-lg leading-relaxed">
//                 {vehicle?.interior?.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//               {vehicle?.interior.features.map((feature, index) => (
//                 <div className="border border-gray-300 p-4 rounded-lg">
//                   <h2 className="text-xl font-semibold mb-2">{feature.name}</h2>
//                   <p className="text-sm">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//         {vehicle?.technology && (
//           <>
//             <div className="mt-8">
//               <h2 className="text-3xl font-semibold mb-4">Technology</h2>
//               <p className="text-lg leading-relaxed">{vehicle?.technology}</p>
//             </div>{" "}
//           </>
//         )}
//       </div>
//       <div className="w-1/2 p-8 sticky top-24 self-start border rounded-lg ml-6">
//         <BookNow id={id} />
//       </div>
//     </div>
//   );
// };

// export default VehicleDescription;
