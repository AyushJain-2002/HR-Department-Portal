import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchExamQuestions,
  submitExamResponses,
} from "../../../store/Actions/PospSignUpAction";
import Loading from "../../Loading";
import { logout, resetPosp } from "../../../store/Reducers/PospSignUpInSlice";
import Cookies from "js-cookie";
import { getDecryptedCookie } from "../../../Utils/secureCookie";

const PospExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Safely get user info with null checks
  const userInfoCookie = Cookies.get("userInfo");
  const userInfo = userInfoCookie ? getDecryptedCookie("userInfo") : null;
  const userid = userInfo?.id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const timerRef = useRef(null);

  const { user, posp, loading } = useSelector((state) => state.posp);
  const currentUser = user || posp;

  // Redirect if user is not allowed to take exam or not logged in
  useEffect(() => {
    if (!currentUser || currentUser.can_exam !== 1 || !userid) {
      navigate("/login");
    }
  }, [currentUser, navigate, userid]);

  const storedExamQuestions = sessionStorage.getItem("examQuestions");
  const examQuestions = storedExamQuestions
    ? JSON.parse(storedExamQuestions)
    : [];

  const hasSubmittedRef = useRef(false);

  const storedResponses = sessionStorage.getItem("examResponses");
  const [responses, setResponses] = useState(
    storedResponses ? JSON.parse(storedResponses) : []
  );

  useEffect(() => {
    sessionStorage.setItem("examResponses", JSON.stringify(responses));
  }, [responses]);

  const handleOptionChange = (questionId, selectedOption) => {
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter(
        (response) => response.questionId !== questionId
      );
      updatedResponses.push({ questionId, selectedOption });
      return updatedResponses;
    });
  };

  const cleanupAndRedirect = () => {
    // Clear all storage
    sessionStorage.removeItem("examQuestions");
    sessionStorage.removeItem("examStartTime");
    sessionStorage.removeItem("examResponses");
    Cookies.remove("authToken");
    Cookies.remove("userInfo");
    localStorage.clear();

    // Reset state and logout
    dispatch(resetPosp());
    dispatch(logout());


    // Force reload to ensure clean state
    window.location.href = "/login";
  };

  const handleSubmitExam = async () => {
    if (isSubmitting || hasSubmittedRef.current || !userid) return;
    setIsSubmitting(true);
    hasSubmittedRef.current = true;

    try {
      const storedResponses = sessionStorage.getItem("examResponses");
      const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];

      const unansweredQuestions = examQuestions.filter((question) => {
        return !parsedResponses.some((resp) => resp.questionId === question.id);
      });

      if (
        unansweredQuestions.length > 0 &&
        !window.confirm(
          `You have ${unansweredQuestions.length} unanswered questions. Submit anyway?`
        )
      ) {
        setIsSubmitting(false);
        hasSubmittedRef.current = false;
        return;
      }

      const exam_responses = examQuestions.map((question) => {
        const response = parsedResponses.find(
          (resp) => resp.questionId === question.id
        );
        return {
          question_id: question.id,
          user_answer: response ? response.selectedOption : null,
        };
      });

      const examData = {
        posp_id: parseInt(userid, 10),
        exam_responses: exam_responses,
      };

      await dispatch(submitExamResponses(examData));
        cleanupAndRedirect();

      // // Redirect after submission
      // setTimeout(() => {
      //   cleanupAndRedirect();
      // }, 1000); // Reduced from 5s to 2s for better UX

    } catch (error) {
      console.error("Error in handleSubmitExam:", error);
      alert(`Submission failed: ${error.message || "Please try again"}`);
      setIsSubmitting(false);
      hasSubmittedRef.current = false;
    }
  };

  useEffect(() => {
    const storedExamQuestions = sessionStorage.getItem("examQuestions");
    if (!storedExamQuestions && userid) {
      dispatch(fetchExamQuestions());
    }
  }, [dispatch, userid]);

  useEffect(() => {
    if (!userid) return;

    const examStartTime = sessionStorage.getItem("examStartTime");
    if (!examStartTime) {
      const startTime = Date.now();
      sessionStorage.setItem("examStartTime", startTime);
    }
    
    const interval = setInterval(() => {
      const startTime = parseInt(sessionStorage.getItem("examStartTime"), 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = 60 * 60 - elapsedTime;
      setTimeLeft(remainingTime);

      if (remainingTime <= 0 && !hasSubmittedRef.current) {
        clearInterval(interval);
        handleSubmitExam();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, userid]);

  useEffect(() => {
    if (!userid) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e) => {
      e.preventDefault();
      if (!hasSubmittedRef.current) {
        alert("You can't go back during the exam. Submitting exam...");
        handleSubmitExam();
      }
      cleanupAndRedirect();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, userid]);

  useEffect(() => {
    const handleUnload = (e) => {
      if (!hasSubmittedRef.current) {
        sessionStorage.removeItem("examQuestions");
        sessionStorage.removeItem("examStartTime");
        sessionStorage.removeItem("examResponses");
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    const currentQuestion = examQuestions[currentQuestionIndex];
    const hasAnswered = responses.some(
      (response) =>
        response.questionId === currentQuestion.id &&
        response.selectedOption !== undefined
    );

    if (!hasAnswered) {
      setResponses((prevResponses) => {
        const updatedResponses = prevResponses.filter(
          (response) => response.questionId !== currentQuestion.id
        );
        updatedResponses.push({
          questionId: currentQuestion.id,
          selectedOption: "",
        });
        return updatedResponses;
      });
    }

    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const navigateToQuestion = (index) => {
    const currentQuestion = examQuestions[currentQuestionIndex];
    const hasAnswered = responses.some(
      (response) =>
        response.questionId === currentQuestion.id &&
        response.selectedOption !== undefined
    );

    if (!hasAnswered) {
      setResponses((prevResponses) => {
        const updatedResponses = prevResponses.filter(
          (response) => response.questionId !== currentQuestion.id
        );
        updatedResponses.push({
          questionId: currentQuestion.id,
          selectedOption: "",
        });
        return updatedResponses;
      });
    }

    setCurrentQuestionIndex(index);
  };

  if (!userid || !currentUser || currentUser.can_exam !== 1) {
    return null; // Or return a loading spinner while redirect happens
  }

  const currentQuestion = examQuestions[currentQuestionIndex];

  return (   
    <div className="relative min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-['Inter']">
  {loading && <Loading />}
  <div className="max-w-7xl mx-auto">
    {/* Header with timer and question status */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-['Poppins']">
          POSP Training Exam
        </h1>
        <p className="text-gray-600 mt-1 text-sm">Answer all questions carefully</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-end gap-4">
        {/* Question status indicators */}
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-2">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-600">Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs text-gray-600">Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            <span className="text-xs text-gray-600">Not visited</span>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-xs font-medium text-gray-600">Time Remaining</p>
              <p className="text-lg font-bold text-blue-700">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row gap-6">
      {/* Question Panel */}
      <div className="lg:w-2/3 w-full">
        {currentQuestion && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                <span className="text-blue-600">
                  {currentQuestionIndex + 1}.
                </span>{" "}
                {currentQuestion.question}
              </h3>
              <div className="space-y-3">
                {["option_first", "option_two", "option_three", "option_four"].map(
                  (optionKey) => {
                    const isSelected = responses.find(
                      (response) =>
                        response.questionId === currentQuestion.id &&
                        response.selectedOption === currentQuestion[optionKey]
                    );

                    return (
                      <label
                        key={optionKey}
                        className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={currentQuestion[optionKey]}
                          onChange={() =>
                            handleOptionChange(
                              currentQuestion.id,
                              currentQuestion[optionKey]
                            )
                          }
                          checked={!!isSelected}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700">
                          {currentQuestion[optionKey]}
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>
            <div className="flex justify-between border-t pt-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-2 rounded-md font-medium text-sm ${
                  currentQuestionIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              {currentQuestionIndex === examQuestions.length - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md font-medium text-sm text-white ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Exam"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Questions Navigation Panel */}
      <div className="lg:w-1/3 w-full">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Questions Navigation
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            {examQuestions.map((question, index) => {
              const isAnswered = responses.some(
                (response) =>
                  response.questionId === question.id &&
                  response.selectedOption !== ""
              );
              const isCurrent = index === currentQuestionIndex;
              const isVisited = responses.some(
                (response) => response.questionId === question.id
              );

              return (
                <button
                  key={index}
                  onClick={() => navigateToQuestion(index)}
                  className={`flex items-center justify-center rounded-full h-10 w-10 text-sm font-medium transition-all ${
                    isCurrent
                      ? "ring-2 ring-blue-500 bg-blue-100 text-blue-700 scale-105"
                      : isAnswered
                      ? "bg-orange-500 text-white"
                      : isVisited
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleSubmitExam}
            disabled={isSubmitting}
            className={`w-full mt-6 py-2 rounded-md font-medium text-sm text-white ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Exam"}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default PospExam;







// import { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchExamQuestions,
//   submitExamResponses,
// } from "../../../store/Actions/PospSignUpAction";
// import Loading from "../../Loading";
// import { logout, resetPosp } from "../../../store/reducers/pospSignUpInSlice";
// import Cookies from "js-cookie";
// import { getDecryptedCookie } from "../../../Utils/secureCookie";

// const PospExam = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Safely get user info with null checks
//   const userInfoCookie = Cookies.get("userInfo");
//   const userInfo = userInfoCookie ? getDecryptedCookie("userInfo") : null;
//   const userid = userInfo?.id;

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60 * 60);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const timerRef = useRef(null);

//   const { user, posp, loading } = useSelector((state) => state.posp);
//   const currentUser = user || posp;

//   // Redirect if user is not allowed to take exam or not logged in
//   useEffect(() => {
//     if (!currentUser || currentUser.can_exam !== 1 || !userid) {
//       navigate("/login");
//     }
//   }, [currentUser, navigate, userid]);

//   const storedExamQuestions = sessionStorage.getItem("examQuestions");
//   const examQuestions = storedExamQuestions
//     ? JSON.parse(storedExamQuestions)
//     : [];

//   const hasSubmittedRef = useRef(false);

//   const storedResponses = sessionStorage.getItem("examResponses");
//   const [responses, setResponses] = useState(
//     storedResponses ? JSON.parse(storedResponses) : []
//   );

//   useEffect(() => {
//     sessionStorage.setItem("examResponses", JSON.stringify(responses));
//   }, [responses]);

//   const handleOptionChange = (questionId, selectedOption) => {
//     setResponses((prevResponses) => {
//       const updatedResponses = prevResponses.filter(
//         (response) => response.questionId !== questionId
//       );
//       updatedResponses.push({ questionId, selectedOption });
//       return updatedResponses;
//     });
//   };

//   const cleanupAndRedirect = () => {
//     // Clear all storage
//     sessionStorage.removeItem("examQuestions");
//     sessionStorage.removeItem("examStartTime");
//     sessionStorage.removeItem("examResponses");
//     Cookies.remove("authToken");
//     Cookies.remove("userInfo");
//     localStorage.clear();

//     // Reset state and logout
//     dispatch(resetPosp());
//     dispatch(logout());


//     // Force reload to ensure clean state
//     window.location.href = "/login";
//   };

//   const handleSubmitExam = async () => {
//     if (isSubmitting || hasSubmittedRef.current || !userid) return;
//     setIsSubmitting(true);
//     hasSubmittedRef.current = true;

//     try {
//       const storedResponses = sessionStorage.getItem("examResponses");
//       const parsedResponses = storedResponses ? JSON.parse(storedResponses) : [];

//       const unansweredQuestions = examQuestions.filter((question) => {
//         return !parsedResponses.some((resp) => resp.questionId === question.id);
//       });

//       if (
//         unansweredQuestions.length > 0 &&
//         !window.confirm(
//           `You have ${unansweredQuestions.length} unanswered questions. Submit anyway?`
//         )
//       ) {
//         setIsSubmitting(false);
//         hasSubmittedRef.current = false;
//         return;
//       }

//       const exam_responses = examQuestions.map((question) => {
//         const response = parsedResponses.find(
//           (resp) => resp.questionId === question.id
//         );
//         return {
//           question_id: question.id,
//           user_answer: response ? response.selectedOption : null,
//         };
//       });

//       const examData = {
//         posp_id: parseInt(userid, 10),
//         exam_responses: exam_responses,
//       };

//       await dispatch(submitExamResponses(examData));
//         cleanupAndRedirect();

//       // // Redirect after submission
//       // setTimeout(() => {
//       //   cleanupAndRedirect();
//       // }, 1000); // Reduced from 5s to 2s for better UX

//     } catch (error) {
//       console.error("Error in handleSubmitExam:", error);
//       alert(`Submission failed: ${error.message || "Please try again"}`);
//       setIsSubmitting(false);
//       hasSubmittedRef.current = false;
//     }
//   };

//   useEffect(() => {
//     const storedExamQuestions = sessionStorage.getItem("examQuestions");
//     if (!storedExamQuestions && userid) {
//       dispatch(fetchExamQuestions());
//     }
//   }, [dispatch, userid]);

//   useEffect(() => {
//     if (!userid) return;

//     const examStartTime = sessionStorage.getItem("examStartTime");
//     if (!examStartTime) {
//       const startTime = Date.now();
//       sessionStorage.setItem("examStartTime", startTime);
//     }
    
//     const interval = setInterval(() => {
//       const startTime = parseInt(sessionStorage.getItem("examStartTime"), 10);
//       const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//       const remainingTime = 60 * 60 - elapsedTime;
//       setTimeLeft(remainingTime);

//       if (remainingTime <= 0 && !hasSubmittedRef.current) {
//         clearInterval(interval);
//         handleSubmitExam();
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [dispatch, userid]);

//   useEffect(() => {
//     if (!userid) return;

//     window.history.pushState(null, "", window.location.href);

//     const handlePopState = (e) => {
//       e.preventDefault();
//       if (!hasSubmittedRef.current) {
//         alert("You can't go back during the exam. Submitting exam...");
//         handleSubmitExam();
//       }
//       cleanupAndRedirect();
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [navigate, userid]);

//   useEffect(() => {
//     const handleUnload = (e) => {
//       if (!hasSubmittedRef.current) {
//         sessionStorage.removeItem("examQuestions");
//         sessionStorage.removeItem("examStartTime");
//         sessionStorage.removeItem("examResponses");
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };

//     window.addEventListener("beforeunload", handleUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleUnload);
//     };
//   }, []);

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handleNext = () => {
//     const currentQuestion = examQuestions[currentQuestionIndex];
//     const hasAnswered = responses.some(
//       (response) =>
//         response.questionId === currentQuestion.id &&
//         response.selectedOption !== undefined
//     );

//     if (!hasAnswered) {
//       setResponses((prevResponses) => {
//         const updatedResponses = prevResponses.filter(
//           (response) => response.questionId !== currentQuestion.id
//         );
//         updatedResponses.push({
//           questionId: currentQuestion.id,
//           selectedOption: "",
//         });
//         return updatedResponses;
//       });
//     }

//     if (currentQuestionIndex < examQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const navigateToQuestion = (index) => {
//     const currentQuestion = examQuestions[currentQuestionIndex];
//     const hasAnswered = responses.some(
//       (response) =>
//         response.questionId === currentQuestion.id &&
//         response.selectedOption !== undefined
//     );

//     if (!hasAnswered) {
//       setResponses((prevResponses) => {
//         const updatedResponses = prevResponses.filter(
//           (response) => response.questionId !== currentQuestion.id
//         );
//         updatedResponses.push({
//           questionId: currentQuestion.id,
//           selectedOption: "",
//         });
//         return updatedResponses;
//       });
//     }

//     setCurrentQuestionIndex(index);
//   };

//   if (!userid || !currentUser || currentUser.can_exam !== 1) {
//     return null; // Or return a loading spinner while redirect happens
//   }

//   const currentQuestion = examQuestions[currentQuestionIndex];

//   return (   
//     <div className="relative min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-['Inter']">
//   {loading && <Loading />}
//   <div className="max-w-7xl mx-auto">
//     {/* Header with timer and question status */}
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//       <div className="mb-4 md:mb-0">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-['Poppins']">
//           POSP Training Exam
//         </h1>
//         <p className="text-gray-600 mt-1 text-sm">Answer all questions carefully</p>
//       </div>
      
//       <div className="flex flex-col sm:flex-row items-end gap-4">
//         {/* Question status indicators */}
//         <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-4 py-2">
//           <div className="flex items-center gap-1">
//             <div className="h-3 w-3 rounded-full bg-orange-500"></div>
//             <span className="text-xs text-gray-600">Answered</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
//             <span className="text-xs text-gray-600">Visited</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="h-3 w-3 rounded-full bg-gray-400"></div>
//             <span className="text-xs text-gray-600">Not visited</span>
//           </div>
//         </div>

//         {/* Timer */}
//         <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 shadow-sm">
//           <div className="flex items-center gap-2">
//             <svg
//               className="w-5 h-5 text-blue-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <div>
//               <p className="text-xs font-medium text-gray-600">Time Remaining</p>
//               <p className="text-lg font-bold text-blue-700">
//                 {formatTime(timeLeft)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="flex flex-col lg:flex-row gap-6">
//       {/* Question Panel */}
//       <div className="lg:w-2/3 w-full">
//         {currentQuestion && (
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 border border-gray-100">
//             <div className="mb-6">
//               <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
//                 <span className="text-blue-600">
//                   {currentQuestionIndex + 1}.
//                 </span>{" "}
//                 {currentQuestion.question}
//               </h3>
//               <div className="space-y-3">
//                 {["option_first", "option_two", "option_three", "option_four"].map(
//                   (optionKey) => {
//                     const isSelected = responses.find(
//                       (response) =>
//                         response.questionId === currentQuestion.id &&
//                         response.selectedOption === currentQuestion[optionKey]
//                     );

//                     return (
//                       <label
//                         key={optionKey}
//                         className={`flex items-center p-4 rounded-lg border-2 transition-all ${
//                           isSelected
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name={`question-${currentQuestion.id}`}
//                           value={currentQuestion[optionKey]}
//                           onChange={() =>
//                             handleOptionChange(
//                               currentQuestion.id,
//                               currentQuestion[optionKey]
//                             )
//                           }
//                           checked={!!isSelected}
//                           className="h-5 w-5 text-blue-600 focus:ring-blue-500"
//                         />
//                         <span className="ml-3 text-gray-700">
//                           {currentQuestion[optionKey]}
//                         </span>
//                       </label>
//                     );
//                   }
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-between border-t pt-4">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentQuestionIndex === 0}
//                 className={`px-6 py-2 rounded-md font-medium text-sm ${
//                   currentQuestionIndex === 0
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 Previous
//               </button>
//               {currentQuestionIndex === examQuestions.length - 1 ? (
//                 <button
//                   onClick={handleSubmitExam}
//                   disabled={isSubmitting}
//                   className={`px-6 py-2 rounded-md font-medium text-sm text-white ${
//                     isSubmitting
//                       ? "bg-blue-400 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Exam"}
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm"
//                 >
//                   Next
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Questions Navigation Panel */}
//       <div className="lg:w-1/3 w-full">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Questions Navigation
//           </h3>
//           <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 gap-2">
//             {examQuestions.map((question, index) => {
//               const isAnswered = responses.some(
//                 (response) =>
//                   response.questionId === question.id &&
//                   response.selectedOption !== ""
//               );
//               const isCurrent = index === currentQuestionIndex;
//               const isVisited = responses.some(
//                 (response) => response.questionId === question.id
//               );

//               return (
//                 <button
//                   key={index}
//                   onClick={() => navigateToQuestion(index)}
//                   className={`flex items-center justify-center rounded-full h-10 w-10 text-sm font-medium transition-all ${
//                     isCurrent
//                       ? "ring-2 ring-blue-500 bg-blue-100 text-blue-700 scale-105"
//                       : isAnswered
//                       ? "bg-orange-500 text-white"
//                       : isVisited
//                       ? "bg-yellow-400 text-gray-800"
//                       : "bg-gray-400 text-white"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//           <button
//             onClick={handleSubmitExam}
//             disabled={isSubmitting}
//             className={`w-full mt-6 py-2 rounded-md font-medium text-sm text-white ${
//               isSubmitting
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Exam"}
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default PospExam;