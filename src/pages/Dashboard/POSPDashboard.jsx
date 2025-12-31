import { Typography, Button } from '@material-tailwind/react';
import { useDispatch} from "react-redux";

import {logout} from '../../store/Reducers/PospSignUpInSlice';
// import {logoutAll} from '../../Utils/cookieUtils';
// import usePospNavigation from '../../Utils/usePospNavigation';

const POSPDashboard = () => {
  const dispatch = useDispatch();

//  usePospNavigation();

  const externalLoginUrl = 'https://www.notioninsurance.in/newportal/index/signin';

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("elapsedTime");
    // logoutAll('/login');
  };


  return (

<div className="min-h-screen bg-gray-50 flex flex-col">
  {/* Header */}
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://www.notioninsurance.in/assets/Images/header/logo.webp"
          alt="Notion Insurance Logo"
          className="h-20 w-auto"
        />
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  </header>

  {/* Centered Card Container - Enhanced */}
  <main className="flex-1 flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center mx-auto my-auto">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
      <Typography variant="small" color="blue-gray" className="mt-4">
        POSP Login
      </Typography>
      <Button
        color="blue"
        size="lg"
        className="mt-4"
        onClick={() => window.location.href = externalLoginUrl}
      >
        Go to POSP Portal
      </Button>
    </div>
  </main>
</div>

  );
};

export default POSPDashboard;