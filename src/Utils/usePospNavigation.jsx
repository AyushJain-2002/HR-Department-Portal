import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchPospById } from "../store/NewReducers/authSlice";
const usePospNavigation = () => {
  const navigate = useNavigate();
  const {authState} = useAuth();
   const {user,posp,authToken} = authState;
  let userInfo=user;
  let userID=userInfo.id
  const currentUserData = useMemo(() => posp || user, [posp, user]);

  // Fetch user if not already loaded
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    if (!posp || posp.length === 0 && authToken) {
      fetchPospById(userID);
    }
  }, [navigate,posp, authToken]);

  // Handle Navigation Conditions
  useEffect(() => {
    if (!currentUserData) return;

    const {
      email_verification,
      documents_verification,
      training_seconds,
      can_exam,
      exam,
    } = currentUserData;

    if (email_verification === 0) {
      navigate("/email-verification");
    } else if (documents_verification === 0) {
      navigate("/posp-document");
    } else if (training_seconds < 86400) {
      navigate("/posp-training");
    } else if (training_seconds === 86400 && can_exam === 1) {
      navigate("/exam-instruction");
    } else if (exam === "fail" && can_exam === 0) {
      navigate("/posp-reattampt-mail");
    }else if (exam === "pass" && can_exam === 0) {
      navigate("/");
    }
  }, [currentUserData, navigate]);
};

export default usePospNavigation;
