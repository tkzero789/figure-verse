"use client";

import React from "react";
import questionsData from "@/questions.json";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleCheck, CircleX, Divide } from "lucide-react";
import Results from "./Results";

type Choice = {
  text: string;
  correct: boolean;
};

type QuestionType = {
  id: number;
  question: string;
  choices: Choice[];
};

export default function Question() {
  // Question
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  // Answers
  const [selectedAnswer, setSelectedAnswer] = React.useState<
    string | undefined
  >(undefined);
  const [userChoice, setUserChoice] = React.useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = React.useState<
    { text: string; correct: boolean }[]
  >([]);

  // Show icon
  const [isCorrect, setIsCorrect] = React.useState(true);
  const [showIcon, setShowIcon] = React.useState(false);

  // Result
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    const shuffledQuestions = questionsData.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 3);
    setQuestions(selectedQuestions);
  }, []);

  // On change
  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);

    setShowIcon(false);
  };

  // Check answer
  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctChoice = currentQuestion.choices.find(
      (choice) => choice.correct,
    );
    setShowIcon(true);
    if (correctChoice && selectedAnswer === correctChoice.text) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    if (selectedAnswer !== undefined) {
      setUserChoice((prevChoice) => [...prevChoice, selectedAnswer]);
    }

    setCorrectAnswers((prevChoices) => [
      ...prevChoices,
      correctChoice || { text: "", correct: false },
    ]);
  };

  // Next quesiton
  const handleNextQuestion = () => {
    setShowIcon(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(undefined);
  };

  // Show result
  const handleShowResult = () => {
    setShowResults(true);
  };

  console.log("select:", userChoice);
  console.log("correct:", correctAnswers);

  return (
    <div>
      {questions.length > 0 && !showResults && (
        <RadioGroup
          key={questions[currentQuestionIndex].id}
          defaultValue="option-one"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-neutral-950">
              {questions[currentQuestionIndex].question}
            </span>
            <div className="mt-4">
              {questions[currentQuestionIndex].choices.map((choice, index) => (
                <RadioGroup
                  key={index}
                  value={selectedAnswer}
                  onValueChange={handleAnswerChange}
                  className="my-2 flex items-center gap-2"
                  disabled={showIcon}
                >
                  <RadioGroupItem value={choice.text} id={`option-${index}`} />
                  <Label
                    className="text-base font-medium text-neutral-700"
                    htmlFor={`option-${index}`}
                  >
                    {choice.text}
                  </Label>
                  <span>
                    {showIcon &&
                      selectedAnswer === choice.text &&
                      (isCorrect ? (
                        <CircleCheck color="#03bd00" />
                      ) : (
                        <CircleX color="#db0000" />
                      ))}
                  </span>
                </RadioGroup>
              ))}
            </div>
            {showIcon ? (
              <Button
                className="mt-4"
                onClick={
                  correctAnswers.length < questions.length
                    ? handleNextQuestion
                    : handleShowResult
                }
                disabled={!showIcon}
              >
                Next
              </Button>
            ) : (
              <Button
                variant={!selectedAnswer ? "secondary" : undefined}
                className="mt-4"
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
              >
                Submit
              </Button>
            )}
          </div>
        </RadioGroup>
      )}
      {showResults && (
        <Results userChoice={userChoice} correctAnswers={correctAnswers} />
      )}
    </div>
  );
}
