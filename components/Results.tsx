import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  userChoice: string[];
  correctAnswers: {
    text: string;

    correct: boolean;
  }[];
};

export default function Results({ userChoice, correctAnswers }: Props) {
  const isAllCorrect = userChoice.every(
    (choice, index) => choice === correctAnswers[index].text,
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText("FIGUREVERSE20");
    toast.success("Discount code copied to clipboard!");
  };
  return (
    <>
      <div className="mt-2">
        <span className="text-base font-bold text-black">Your answers: </span>
        {userChoice.map((u, index) => (
          <div key={index} className="text-neutral-700">
            {u}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <span className="text-base font-bold text-black">
          Correct answers:{" "}
        </span>
        {correctAnswers.map((a, index) => (
          <div key={index} className="text-neutral-700">
            {a.text}
          </div>
        ))}
      </div>
      <div className="mt-2">
        {isAllCorrect ? (
          <div className="text-lg font-semibold text-green-700">
            <div className="text-center">
              You&apos;re a Marvel Mastermind! Enjoy your 20% discount!
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-black">
                FIGUREVERSE20
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-2 rounded border bg-gray-100 p-2 text-white"
              >
                <Copy color="#545454" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-red-500">
            Better luck next time, hero!
          </div>
        )}
      </div>
    </>
  );
}
