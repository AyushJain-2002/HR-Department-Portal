import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
const TrainingInstruction = () => {
  const navigate = useNavigate();

  const handleStartTraining = () => {
    navigate("/posp-training"); // Navigate to the training module
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div>
        <Card shadow={true} className="p-6 bg-white rounded-xl shadow-xl">
          <CardBody>
            <div className="mb-6">
              <img
                src="/assets/images/logo.webp"
                alt="Company Logo"
                className="h-32"
              />
            </div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-center font-bold"
            >
              POSP Training Instructions
            </Typography>
            <Typography variant="paragraph" className="text-gray-700 mt-4">
              Welcome to the POSP (Point of Sales Person) training module.
              Before you begin, please read the following instructions
              carefully:
            </Typography>
            <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
              <li>
                The training consists of multiple modules covering essential
                POSP concepts.
              </li>
              <li>Each module has interactive lessons and quizzes.</li>
              <li>Ensure a stable internet connection to avoid disruptions.</li>
              <li>You can track progress and resume where you left off.</li>
              <li>
                At the end of the training, an assessment will determine your
                certification.
              </li>
            </ul>
            <div className="mt-6 flex justify-center">
              <div>
                <Button
                  color="blue"
                  size="lg"
                  ripple={true}
                  onClick={handleStartTraining}
                >
                  Start Training
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TrainingInstruction;
