import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Shield,
  KeyRound,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { resetPassword } from "../../store/Actions/PospSignUpAction";

import AuthLayout from "./AuthPageLayout"; // <<--- IMPORT AUTH LAYOUT

const Reset_Password = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { passwordResetError, passwordResetLoading, passwordResetSuccess } =
    useSelector((state) => state.posp);

  useEffect(() => {
    const resetEmail = localStorage.getItem("resetEmail");

    if (!resetEmail) {
      navigate("/login");
      toast.error("Please use the forgot password link from login page");
    } else {
      setEmail(resetEmail);
    }
  }, [navigate]);

  useEffect(() => {
    if (!password) return setPasswordStrength(0);

    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;

    if (password.length >= minLength) strength++;
    if (hasLetter && hasNumber) strength++;
    if (hasSpecial) strength++;

    setPasswordStrength(strength);
  }, [password]);

  useEffect(() => {
    if (passwordResetSuccess) {
      toast.success("Password reset successfully!");

      localStorage.removeItem("resetEmail");

      setTimeout(() => navigate("/login"), 2500);
    }

    if (passwordResetError) {
      toast.error(passwordResetError || "Failed to reset password!");
      setLoading(false);
    }

    setLoading(passwordResetLoading);
  }, [
    passwordResetSuccess,
    passwordResetError,
    passwordResetLoading,
    navigate,
  ]);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }

    if (!hasLetter || !hasNumber || !hasSpecial) {
      return "Password must include letters, numbers, and special characters";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    if (password !== password_confirmation) {
      setPasswordError("Passwords do not match!");
      return;
    }

    // dispatch(
    //   resetPassword({
    //     email,
    //     otp: parseInt(otp, 10),
    //     password,
    //     password_confirmation,
    //   })
    // );
  };

  const getStrengthColor = () => {
    return [
      "bg-gray-300",
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
    ][passwordStrength];
  };

  const getStrengthText = () => {
    return ["", "Weak", "Medium", "Strong"][passwordStrength];
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">

          <div className="text-center mb-6">
            <img
              src="https://www.notioninsurance.in/assets/images/header/logo.webp"
              alt="Logo"
              className="h-20 mx-auto"
            />
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              Create a new secure password
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="email"
                value={email}
                disabled
                className="w-full pl-10 pr-3 py-3.5 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full pl-10 pr-3 py-3.5 border rounded-lg"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {password && (
                <div className="space-y-1">
                  <div className="h-1 w-full bg-gray-200 rounded-full">
                    <div
                      className={`h-full ${getStrengthColor()} rounded-full transition-all`}
                      style={{ width: `${(passwordStrength / 3) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Shield size={12} className="mr-1" />
                    Password strength:
                    <span className="ml-1 font-medium">{getStrengthText()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={password_confirmation}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3.5 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {passwordError && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                {passwordError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-white bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex items-center justify-center text-blue-600 text-sm mx-auto"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to login
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </AuthLayout>
  );
};

export default Reset_Password;
