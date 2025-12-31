import  { useState, useEffect, useMemo } from 'react';
import axios from "../../../config/axios";
import Cookies from 'js-cookie';
// import { logout } from "../../../store/Reducers/PospSignUpInSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Alert
} from '@material-tailwind/react';
import { toast } from 'react-toastify';
// import { fetchPospById } from "../../../../store/Actions/PospSignUpAction";
// import { fetchPospById } from "../../../store/Actions/PospSignUpAction";
import usePospNavigation from '../../../Utils/usePospNavigation';
import {useAuth} from "../../../hooks/useAuth";
import {logout} from "../../../store/NewReducers/authSlice";
// const token = Cookies.get("authToken");

const PospMailReExam = () => {
  // const { user, posp } = useSelector((state) => state.posp);
  const {authState} =useAuth();
  const {user,posp,authToken}=authState;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch posp data if user is null
  // useEffect(() => {

  //   if (!token) {
  //     window.location.reload();
  //     navigate("/login");
  //     return;
  //   }
  //   if (token!==null) {
  //     dispatch(fetchPospById());
  //   }
  // }, [dispatch, navigate, user]);
  usePospNavigation();

  // Combine user and posp data
  const currentUserData = useMemo(() => {
    return posp || user;
  }, [posp, user]);

  useEffect(() => {
    if (!currentUserData) return;
  
    const {
      email_verification,
      documents_verification,
      training,
      can_exam,
    } = currentUserData;
  
    if (email_verification === 0) {
      navigate("/email-verification");
    } else if (documents_verification === 0) {
      navigate("/posp-document");
    } else if (training === 86400 || can_exam === 1) {
      navigate("/exam-instruction");
    }
  }, [currentUserData, navigate]);
  
  const handleSendReattemptMail = async () => {
    if (authToken === null) {
      toast.error('user is  not login');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // const token = Cookies.get('authToken');
      const response = await axios.post(
        `/Posp/sendReattemptExam_Mail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setSuccess(true);
      } else {
        toast.success('Re-attempt exam mail sent successfully!');
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error sending reattempt mail:', error);

      if (error.response?.data?.error?.includes('Undefined array key "mobile_no"')) {
        setError('Profile information incomplete. Please update your mobile number before requesting re-attempt.');
      } else {
        const errorMsg = error.response?.data?.message ||
          error.response?.data?.error ||
          'Failed to send re-attempt exam mail';
        setError(errorMsg);
      }

      toast.error(error.response?.data?.message || 'Failed to send re-attempt exam mail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://www.notioninsurance.in/assets/Images/header/logo.webp"
                alt="Notion Insurance Logo"
                className="h-20 w-auto"
              />
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </header>

        <Card className="w-full max-w-md mx-auto mt-10">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Request Exam Re-attempt
            </Typography>
            <Typography variant="paragraph" color="gray">
              Click the button below to send a request for exam re-attempt. An email will be sent to the HR department.
            </Typography>

            {error && (
              <Alert color="red" className="mt-4">
                {error}
                {error.includes('mobile_no') && (
                  <Button
                    variant="text"
                    color="white"
                    size="sm"
                    className="ml-2 !underline"
                    onClick={() => window.location.href = '/profile'}
                  >
                    Update Profile
                  </Button>
                )}
              </Alert>
            )}

            {success && (
              <Alert color="green" className="mt-4">
                Reattempt exam notification email sent to HR successfully.
              </Alert>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              onClick={handleSendReattemptMail}
              disabled={isLoading}
              className="flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Sending Request...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  Send Re-attempt Request
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default PospMailReExam;
