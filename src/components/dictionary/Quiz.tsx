import React, { useEffect, useState } from "react";
import axios from "axios";

type QuizData = {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
};

export default function Quiz() {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://34.237.154.47:8080/quiz/", {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("응답", response);
        if (response.data?.status === 200 && response.data?.data) {
          setQuizData(response.data.data);
        } else {
          throw new Error("Failed to fetch quiz data");
        }
      } catch (err) {
        setError("오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const currentQuiz = quizData[currentIndex];

  useEffect(() => {
    if (currentQuiz) {
      const answers = [
        ...(currentQuiz?.wrongAnswers || []),
        currentQuiz?.correctAnswer,
      ].sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [currentQuiz]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      showToast("정답입니다 😀", "success");
    } else {
      setWrongCount(wrongCount + 1);
      showToast("틀렸습니다 😅", "error");
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
  };

  return (
    <div className="flex-1">
      <div className="w-full relative py-4 lg:py-6 flex justify-around items-center bg-white">
        <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
          오늘의 야구 퀴즈
        </h1>
        <div className="w-3/6 flex flex-col items-center m-1">
          <div className="w-full flex mr-2 lg:mr-0">
            <div className="w-full flex justify-between text-base sm:text-lg lg:text-xl">
              <div className="flex">
                <p className="text-dark1 font-bold">LV01. </p>
                <p className="text-dark3 ml-1">야린이2 까지</p>
              </div>
              <div className="text-dark1 font-bold">72%</div>
            </div>
          </div>
          <div className="w-full h-3 sm:h-4 xl:h-6 relative bg-light3 rounded-3xl mt-2 mr-2 lg:mr-0">
            <div className="w-9/12 h-full bg-dark3 rounded-3xl" />
          </div>
        </div>
      </div>
      {/* 토스트 메시지 */}
      {toast && (
        <div
          className={`fixed top-56 left-1/2 ml-32 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
      {currentIndex < quizData.length ? (
        <div className="w-[350px] sm:w-4/6 sm:h-4/6 flex flex-col bg-white mx-auto my-20 p-8 lg:p-16 items-center justify-center">
          <h1 className="font-bold text-lg sm:text-2xl xl:text-27px">
            Q{currentIndex + 1}. {currentQuiz.question}
          </h1>
          <div className="w-full sm:w-4/5 xl:w-3/5 flex flex-col gap-5 text-center font-semibold text-base sm:text-22px my-12">
            {shuffledAnswers.map((answer, i) => (
              <div
                key={i}
                onClick={() =>
                  handleAnswerClick(answer === currentQuiz.correctAnswer)
                }
                className="rounded-md border p-4 xl:p-6 hover:bg-main2 hover:text-white cursor-pointer transition-all"
              >
                {answer}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[350px] sm:w-4/6 sm:h-4/6 flex flex-col bg-white mx-auto my-20 p-8 lg:p-16 items-center justify-center">
          <h2 className="text-27px font-bold mb-6">🎉 퀴즈 종료 🎉</h2>
          <p className="text-xl font-bold mb-4">정답: {correctCount}개</p>
          <p className="text-xl font-bold mb-8">오답: {wrongCount}개</p>
          <button
            onClick={handleRestart}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            다시 하기
          </button>
        </div>
      )}
    </div>
  );
}
