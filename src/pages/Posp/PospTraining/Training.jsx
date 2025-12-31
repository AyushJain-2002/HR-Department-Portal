import usePospNavigation from "../../../Utils/usePospNavigation";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import {
  
  fetchPospById,
  fetchTrainingSeconds,
  updateTrainingSeconds,
} from "../../../store/Actions/PospSignUpAction";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/Reducers/PospSignUpInSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./mainContent";

const Training = () => {
  const [activeSection, setActiveSection] = useState("CHAPTER-01");
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const dispatch = useDispatch();
  const { training, posp, user } = useSelector((state) => state.posp);
  const elapsedTimeRef = useRef(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [apiTriggered, setApiTriggered] = useState(false);
  const initialTrainingTimeRef = useRef(0);
  const [inactivityStartTime, setInactivityStartTime] = useState(null);

  const [showCompletion, setShowCompletion] = useState(false);
  const navigate = useNavigate();
 
  // Use the custom navigation hook
  usePospNavigation();

  // Combine user and posp data
  const currentUserData = useMemo(() => posp || user, [posp, user]);

  // Training timer logic
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token && currentUserData) {
      dispatch(fetchTrainingSeconds());
    }
  }, [dispatch, currentUserData]);
 
  // useEffect(() => {
  //   if (training?.training_seconds !== undefined) {
  //     initialTrainingTimeRef.current = training.training_seconds;
  //     elapsedTimeRef.current = training.training_seconds;
  //     localStorage.setItem("elapsedTime", elapsedTimeRef.current);
  //     setIsTimerRunning(true);
      
  //     if (training.training_seconds >= 86400) {
  //       setIsTimerRunning(false);
  //       setShowCompletion(true);
  //     }
  //   }
  // }, [training?.training_seconds]);
  useEffect(() => {
    if (training?.training_seconds !== undefined) {
      // Try to restore from localStorage first
      const savedElapsedTime = parseInt(localStorage.getItem("elapsedTime"), 10);
      const isValidSavedTime = !isNaN(savedElapsedTime) && savedElapsedTime >= training.training_seconds;
  
      const startTime = isValidSavedTime ? savedElapsedTime : training.training_seconds;
  
      initialTrainingTimeRef.current = startTime;
      elapsedTimeRef.current = startTime;
      localStorage.setItem("elapsedTime", startTime);
      setIsTimerRunning(true);
  
      if (startTime >= 86400) {
        setIsTimerRunning(false);
        setShowCompletion(true);
      }
    }
  }, [training?.training_seconds]);
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (isTimerRunning && elapsedTimeRef.current < 86400) {
        elapsedTimeRef.current += 1;
        localStorage.setItem("elapsedTime", elapsedTimeRef.current);
        
        if (elapsedTimeRef.current >= 86400) {
          setIsTimerRunning(false);
          setShowCompletion(true);
          const token =Cookies.get("authToken");
          if (token!==null) {
            dispatch(updateTrainingSeconds(86400));
          }
        }
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, currentUserData, dispatch]);

  // Inactivity and visibility handlers
  useEffect(() => {
    const inactivityCheckInterval = setInterval(() => {
      const inactivityTime = Date.now() - lastActivityTime;
      setInactiveTime(inactivityTime);
      if (inactivityTime >= 2 * 60 * 1000 && inactivityTime < 15 * 60 * 1000) {
        setIsTimerRunning(false);
      }
      if (inactivityTime >= 15 * 60 * 1000 && !apiTriggered) {
        setIsTimerRunning(false);
        const savedElapsedTime = localStorage.getItem("elapsedTime");
        const activeElapsedTime = Math.abs(
          savedElapsedTime - training?.training_seconds
        );
        const token=Cookies.get("authToken");
        if (token!==null) {
          dispatch(updateTrainingSeconds( activeElapsedTime)).then(
            () => {
              localStorage.removeItem("elapsedTime");
              dispatch(logout());
              setApiTriggered(true);
              window.location.reload();
            }
          );
        }
      }
    }, 1000);
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTime, apiTriggered, dispatch, currentUserData, training]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsTimerRunning(false);
      } else {
        setIsTimerRunning(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
      setIsTimerRunning(true);
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
    };
  }, []);

  const formatTime = (time) => {
    if (time >= 86400) return "24:00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleLogout = () => {
    const token = Cookies.get("authToken");
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    const activeElapsedTime = Math.abs(
      savedElapsedTime - training?.training_seconds
    );
  
    if (token !== null) {
      dispatch(updateTrainingSeconds( activeElapsedTime)).then(() => {
        localStorage.removeItem("elapsedTime");
        dispatch(logout());
        navigate("/login");
      });
    } else {
      dispatch(logout());
      navigate("/login");
    }
  };

  const handleNextStep = () => {
    navigate("/exam-instruction");
  };

  const [open, setOpen] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const chapters = [
    { title: "Chapter-01 Commercial Insurance", section: "CHAPTER-01" },
    { title: "Chapter-02 Liability Insurance", section: "CHAPTER-02" },
    { title: "Chapter-03 Property Insurance", section: "CHAPTER-03" },
    { title: "Chapter-04 Marine Insurance", section: "CHAPTER-04" },
    { title: "Chapter-05 Motor Insurance", section: "CHAPTER-05" },
    { title: "Chapter-06 Health Insurance", section: "CHAPTER-06" },
    { title: "Chapter-07 Life Insurance", section: "CHAPTER-07" },
    { title: "Chapter-08 Reinsurance", section: "CHAPTER-08" },
    { title: "Chapter-09 Microinsurance", section: "CHAPTER-09" },
    { title: "Chapter-10 RiskManagement", section: "CHAPTER-10" },
    { title: "Chapter-11 RegulatoryFramework", section: "CHAPTER-11" },
  ];

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 py-6 lg:px-8">
        <div className="flex lg:ml-[18rem] px-5 lg:w-[calc(100vw-20rem)] w-full justify-between top-0 h-16 items-center bg-gray-50 z-50 fixed">
          <div className="timer-container flex items-center gap-4">
            {showCompletion ? (
              <div className="flex items-center gap-4">
                <Typography variant="h5" color="green" className="text-lg">
                  TRAINING COMPLETED
                </Typography>
                <Button
                  size="xl"
                  color="blue"
                  onClick={handleNextStep}
                  className="rounded-lg px-5"
                >
                  GO FOR EXAM
                </Button>
              </div>
            ) : (
              <>
                <Typography variant="h5" color="blue-gray" className="text-lg">
                  Timer: {formatTime(elapsedTimeRef.current)}
                </Typography>
                {!isTimerRunning && elapsedTimeRef.current < 86400 && (
                  <Typography variant="body1" color="red">
                    Timer paused due to inactivity.
                  </Typography>
                )}
              </>
            )}
          </div>
          <Button
            size="sm"
            color="red"
            onClick={handleLogout}
            className="rounded-lg"
          >
            Logout
          </Button>
        </div>

        <div className="lg:ml-[19rem] mt-16">
          {!isMobile ? (
            <MainContent activeSection={activeSection} />
          ) : (
            <div className="p-4 ">
              {chapters.map((chapter, index) => (
                <Accordion
                  key={index}
                  open={open === index + 1}
                  icon={<Icon id={index + 1} open={open} />}
                >
                  <AccordionHeader className="text-base" onClick={() => handleOpen(index + 1)}>
                    {chapter.title}
                  </AccordionHeader>
                  <AccordionBody>
                    <MainContent activeSection={chapter.section} />
                  </AccordionBody>
                </Accordion>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Training;