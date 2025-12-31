import React from 'react';
import {useAuth} from "../../../hooks/hookIndex"
import { Link, useNavigate } from 'react-router-dom';
import usePospNavigation from "../../../Utils/usePospNavigation";


const POSPInstructions = () => {
  const navigate = useNavigate();
  usePospNavigation();
const {logout} =useAuth();

  const handleLogout = () => {
    (logout());
    navigate("/login");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <img
              src="https://www.notioninsurance.in/assets/Images/header/logo.webp"
              alt="Notion Insurance Logo"
              className="h-20 w-auto"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow flex items-center justify-center px-4 py-10">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Exam Instructions</h2>
            <ul className="list-disc list-inside text-gray-700 text-left space-y-2">
              <li>Ensure a stable internet connection during the exam.</li>
              <li>Do not refresh or close the browser tab while taking the exam.</li>
              <li>Each question has a limited time. Answer before time runs out.</li>
              <li>Once submitted, answers cannot be changed.</li>
              <li>Use only allowed resources. Unauthorized help is prohibited.</li>
              <li>Click the "Start Exam" button below to begin.</li>
            </ul>

            <Link
              to="/posp-exam"
              className="inline-block mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
            >
              Start Exam
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default POSPInstructions;
