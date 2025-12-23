import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Assuming these are your actions
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  fetchExamQuestions,
  submitExamResponses,
} from "../../../../store/Actions/PospSignUpAction";
import { Button, Card } from "@material-tailwind/react";

const PospExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examQuestions, success, loading } = useSelector(
    (state) => state.posp
  );

  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    dispatch(fetchExamQuestions());

    const examStartTime = localStorage.getItem("examStartTime");
    if (!examStartTime) {
      const startTime = Date.now();
      localStorage.setItem("examStartTime", startTime);
      setExamStarted(true);
    }

    const interval = setInterval(() => {
      const startTime = parseInt(localStorage.getItem("examStartTime"), 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = 60 * 60 - elapsedTime;
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        handleSubmitExam();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleOptionChange = (questionId, selectedOption) => {
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter(
        (response) => response.questionId !== questionId
      );
      updatedResponses.push({ questionId, selectedOption });
      return updatedResponses;
    });
  };

  const handleSubmitExam = () => {
    const pospId = Cookies.get("userId"); // Assuming pospId is stored in cookies
    const allResponses = examQuestions.map((question) => {
      const response = responses.find(
        (resp) => resp.questionId === question.id
      );
      return {
        question_id: question.id,
        user_answer: response ? response.selectedOption : "", // Mark unanswered as `null`
      };
    });
    const examData = {
      posp_id: pospId,
      exam_responses: allResponses,
    };
    console.log(examData);
    // dispatch(submitExamResponses(examData));

    // navigate('/exam-results');
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex + 5 < examQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 5);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 5);
    }
  };

  // Get the 5 questions to display based on the current index
  const questionsToDisplay = examQuestions.slice(
    currentQuestionIndex,
    currentQuestionIndex + 5
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="flex flex-col items-center py-5 justify-center min-h-screen bg-gray-50">
      {/* Heading and Reminders Section */}
      <div className="text-start flex justify-between mb-8 w-full max-w-5xl">
        <div className="text-base ">
          <h1 className="text-2xl font-bold mb-2">POSP Training Exam</h1>
          {/* <p>⚠️ Reminder:</p> */}
          <ul className="text-red-600">
            <li>1. Read all questions carefully.</li>
            <li>2. Select the most appropriate option.</li>
            <li>3. Do not rush; make sure your answers are correct.</li>
          </ul>
        </div>
        <div className="timer mb-6 text-bold text-xl">
          <p className="font-bold">
            Time Left: <br /> {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Display 5 questions at a time */}
      <div className="w-full flex flex-col gap-4  max-w-5xl p-6 bg-white shadow rounded-lg">
        {questionsToDisplay.map((question, index) => (
          <div key={index}>
            <h5 className="text-lg font-semibold mb-4">
              {currentQuestionIndex + index + 1}. {question.question}
            </h5>
            <div className="flex flex-col gap-4">
              {[
                "option_first",
                "option_two",
                "option_three",
                "option_four",
              ].map((optionKey) => (
                <label
                  key={optionKey}
                  className="flex text-base items-center gap-3"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={question[optionKey] || ""} // Fallback to empty string
                    onChange={() =>
                      handleOptionChange(question.id, question[optionKey])
                    }
                    checked={responses.find(
                      (response) =>
                        response.questionId === question.id &&
                        response.selectedOption === question[optionKey]
                    )}
                  />
                  {question[optionKey] || "Default Option"}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full max-w-5xl mt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex + 5 >= examQuestions.length ? (
          <button
            onClick={handleSubmitExam}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PospExam;
