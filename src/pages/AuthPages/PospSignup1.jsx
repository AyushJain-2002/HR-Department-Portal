import {
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { Link, redirect } from "react-router-dom";
// import { resetSignupSuccess } from "../../store/Reducers/PospSignUpInSlice";
import {
  ArrowLeft,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  CircleUserRound,
} from "lucide-react";
// import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import Loading from '../Loading'
import { resetSignupSuccess} from "../../store/NewReducers/authSlice";
const PospSignup = () => {
  const [captcha, setCaptcha] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    email: "",
    pancard_number: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const logo = "/assets/images/logo.webp"; // Replace with your logo image path
  const headingText = "JOIN US AS A CERTIFIED POS";
  const [isAccepted, setIsAccepted] = useState(false); // State for checkbox
  const [errorMessage, setErrorMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(false);
  // const { message, loading, success, signupError ,user } = useSelector(
  //   (state) => state.posp
  // );
  const {registerUser,authState} = useAuth();
  const dispatch = useDispatch();
  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted); // Toggle checkbox state
  };

  useEffect(() => {
    return () => {
      dispatch(resetSignupSuccess()); // Reset when component unmounts
    };
  }, [dispatch]);

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "text-red-600"; // Weak
      case 2:
        return "text-orange-500"; // Medium
      case 3:
        return "text-green-600"; // Strong
      default:
        return "text-red-600"; // No color if the user hasn't typed anything
    }
  };

  const getStrengthText = () => {
    if (!isTyping) return "";
    switch (passwordStrength) {
      case 1:
        return "Weak Password";
      case 2:
        return "Medium Password";
      case 3:
        return "Strong Password";
        default:
          return "Weak Password";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value.length === 0) {
        // If the password field is empty, reset isTyping to false
        setIsTyping(false);
        setPasswordStrength(0); // Optionally reset password strength if the input is cleared
      } else {
        setIsTyping(true); // Mark as typing when user starts typing
  
        const hasLowerCase = /[a-z]/.test(value);
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasMinLength = value.length >= 8;
  
        let score = 0;
        if (hasMinLength) score++;
        if ((hasLowerCase || hasUpperCase) && hasNumber) score++;
        if (hasSpecialChar && (hasLowerCase || hasUpperCase)) score++;
  
        setPasswordStrength(score); // Update password strength based on the input
      }
    }

    if (name === "mobile_no") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === "pancard_number") {
      let formattedValue = value.replace(/[^0-9A-Za-z]/g, "");

      let letters = formattedValue.slice(0, 5).replace(/[0-9]/g, "");
      let numbers = formattedValue.slice(5, 9).replace(/\D/g, "");
      let letter = formattedValue.slice(9, 10).replace(/[0-9]/g, "");
      formattedValue = letters.toUpperCase() + numbers + letter.toUpperCase();
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.slice(0, 10);
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAccepted) {
      setErrorMessage("You must accept the Terms and Conditions to proceed.");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setPassMessage("Passwords do not match.");
      return;
    }

    setPassMessage("");
    setErrorMessage("");

    // setCaptcha(null); // Reset reCAPTCHA
    setPasswordStrength(0); // Reset password strength
    const filteredFormData = { ...formData };

    registerUser(filteredFormData);
  };
  useEffect(() => {
    if (success) {
      // setOpen(true);

      // Reset the form
      setFormData({
        name: "",
        mobile_no: "",
        email: "",
        pancard_number: "",
        password: "",
        password_confirmation: "",
      });
      setIsAccepted(false);
      // setCaptcha(null); // Reset reCAPTCHA
      setPasswordStrength(0); // Reset password strength'
if(user){
  if(user.role==="Posp"){
    if (user.email_verification === null ||user.email_verification===0) {
        navigate("/email-verification");
      } 

  }

}

     

    }
  }, [success]);

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: <CircleUserRound size={17} />,
    },
    {
      name: "mobile_no",
      label: "Mobile No.",
      type: "text",
      placeholder: "Enter your mobile number",
      icon: <Phone size={17} />,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      icon: <Mail size={17} />,
    },
    {
      name: "pancard_number",
      label: "PAN Card Number",
      type: "text",
      placeholder: "Enter your PAN card number",
      icon: <CreditCard size={17} />,
    },
  ];

  return (
    


<div className="relative h-screen w-full bg-gray-50">
  {loading && <Loading />}

  <div className="flex flex-col justify-center items-center font-pt_serif bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen  px-4 ">
    <div className="flex flex-col lg:flex-row items-stretch gap-x-6 gap-y-8 w-full max-w-screen-xl">
      
      {/* Video Section */}
      <div className=" rounded-lg w-full lg:w-1/2 aspect-video p-1.5 sm:p-0 flex justify-center items-center ">
        <video
          className="w-full  rounded-lg shadow-lg object-cover "
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
        >
          <source src="/assets/images/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Form Section */}
      <form
        className="bg-white flex flex-col justify-between shadow-lg rounded-lg p-6 border-t-4 border-blue-600 min-h-[625px] w-full lg:w-1/2"
        onSubmit={handleSubmit}
      >
        {/* Logo & Heading */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="h-20 w-30 object-cover" />
          <h3 className="text-2xl font-roboto font-bold text-blue-600 mt-2">
            {headingText}
          </h3>
        </div>

        {/* Input Fields Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col h-full">
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  icon={field.icon}
                  className="font-roboto w-full"
                  placeholder={field.placeholder}
                />
                <div className="text-red-500 text-xs mt-1 h-6 px-2">
                  {signupError?.errors?.[field.name] && (
                    <div>{signupError.errors[field.name][0]}</div>
                  )}
                  {field.name === "password_confirmation" && passMessage && (
                    <div>{passMessage}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                icon={
                  formData.password.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  ) : (
                    <Lock size={17} />
                  )
                }
                placeholder="Enter your password"
              />
              <div className="flex items-center justify-end mt-2 h-2">
                <span className={`ml-2 ${getStrengthColor()} text-sm font-semibold`}>
                  {getStrengthText()}
                </span>
              </div>
              {signupError?.errors?.password && (
                <div className="text-red-500 text-xs mt-1">
                  {signupError.errors.password[0]}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                label="Confirm Password"
                name="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.password_confirmation}
                onChange={handleChange}
                icon={
                  formData.password_confirmation.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  ) : (
                    <Lock size={17} />
                  )
                }
                placeholder="Confirm your password"
              />
              {signupError?.errors?.password_confirmation && (
                <div className="text-red-500 text-xs mt-2">
                  {signupError.errors.password_confirmation[0]}
                </div>
              )}
              {passMessage && (
                <div className="text-red-500 text-xs mt-2">{passMessage}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <div className="flex items-center gap-1">
              <Checkbox
                label={
                  <span className="text-sm">
                    I accept the{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 underline font-semibold"
                    >
                      Terms and Conditions and Privacy
                    </a>
                  </span>
                }
                checked={isAccepted}
                onChange={handleCheckboxChange}
              />
            </div>

            <div className="h-3">
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <Button type="submit" color="blue" className="w-full">
            Sign up
          </Button>

          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1 text-sm pt-2"
          >
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </div>
      </form>
    </div>
  </div>

  <Dialog
    open={open}
    handler={() => {
      setOpen(false);
      dispatch(resetSignupSuccess());
    }}
    size="sm"
  >
    <DialogHeader className="text-blue-600">
      Sign-Up Mail Sent Successfully!
    </DialogHeader>
    <DialogBody className="flex flex-col items-center">
      <img
        className="w-48 h-48"
        src="public/gif/mailSent.gif"
        alt="mail sent"
      />
      <p className="text-center mb-4">{message}</p>
      <Button color="blue" onClick={() => setOpen(false)}>
        Close
      </Button>
    </DialogBody>
  </Dialog>
</div>
 
  );
};

export default PospSignup;










