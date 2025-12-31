import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout, resendEmailVerification } from "../../store/NewReducers/authSlice";
// import { logout } from "../../store/Reducers/PospSignUpInSlice";
import Loading from "../../pages/Loading";
import usePospNavigation from "../../Utils/usePospNavigation";

const EmailVerification = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // const { loading } = useSelector((state) => state.posp);
  const {authState} =useSelector((state) =>state.auth);
  const loading= authState?.loading;
  // Use custom hook for auth and navigation logic
  usePospNavigation();

  const handleResendEmail = async () => {
    setIsResendDisabled(true);
    setCountdown(60); // 60 seconds cooldown
    
    const result = dispatch(resendEmailVerification());
    
    if (result?.success) {
      toast.success(result.message || "Verification email sent successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error(result?.message || "Failed to resend verification email", {
        position: "top-right",
        autoClose: 5000,
      });
      // If error, allow immediate retry by resetting the countdown
      setIsResendDisabled(false);
      setCountdown(0);
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("elapsedTime");
    navigate("/login");
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loading />}

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

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            Verify Your Email Address
          </h4>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to{" "}
            <span className="font-semibold text-blue-600">{email}</span>. Please
            check your inbox and click the link to verify your account.
          </p>
          <button
            onClick={handleResendEmail}
            disabled={isResendDisabled}
            className={`mt-4 px-6 py-2 text-white rounded-lg transition-colors ${
              isResendDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isResendDisabled
              ? `Resend in ${countdown}s`
              : "Resend Verification Email"}
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Didn't receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </main>

      
    </div>
  );
};

export default EmailVerification;