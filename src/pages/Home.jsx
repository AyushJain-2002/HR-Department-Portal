// import { Card, CardBody, Typography } from '@material-tailwind/react';
// import React from 'react'
// import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
 
//   return (
//     <div className="min-h-screen bg-gradient-to-r z from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white px-6 py-16">
     

     
//       {/* Hero Section */}
//       <div className="text-center mb-16 animate__animated animate__fadeIn">
//         <Typography variant="h1" className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide">
//           Admin Dashboard
//         </Typography>
//         <Typography variant="lead" className="text-lg md:text-2xl font-light mt-4 opacity-80">
//           Manage your data and insights in one place with ease and efficiency.
//         </Typography>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-screen-xl">
//         {/* Card 1 */}
//         <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl transform hover:scale-105">
//           <CardBody className="p-8">
//             <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
//               Total Sales
//             </Typography>
//             <Typography variant="h3" className="font-bold text-blue-600">
//               $45,320
//             </Typography>
//           </CardBody>
//         </Card>

//         {/* Card 2 */}
//         <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl transform hover:scale-105">
//           <CardBody className="p-8">
//             <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
//               Users
//             </Typography>
//             <Typography variant="h3" className="font-bold text-teal-600">
//               5,430
//             </Typography>
//           </CardBody>
//         </Card>

//         {/* Card 3 */}
//         <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl transform hover:scale-105">
//           <CardBody className="p-8">
//             <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
//               Active Sessions
//             </Typography>
//             <Typography variant="h3" className="font-bold text-orange-600">
//               1,250
//             </Typography>
//           </CardBody>
//         </Card>

//         {/* Card 4 */}
//         <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl transform hover:scale-105">
//           <CardBody className="p-8">
//             <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
//               New Orders
//             </Typography>
//             <Typography variant="h3" className="font-bold text-green-600">
//               350
//             </Typography>
//           </CardBody>
//         </Card>
//       </div>

//       {/* Call to Action Section */}
//       <div className="mt-16 text-center animate__animated animate__fadeIn animate__delay-1s">
//         <button className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-600 hover:text-white hover:shadow-2xl transition duration-300 transform hover:scale-105">
//           Start Managing
//         </button>
//       </div>
      
    
//     </div>
//   );
// }

// export default Home