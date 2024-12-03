import React, { useEffect, useState } from "react";
import { getWords } from "api/dictionaryApi";

type WordItem = {
  word: string;
  description: string;
};

export default function Word() {
  const [allWords, setAllWords] = useState<WordItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWords(100); // 모든 단어를 가져옴
        setAllWords(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastWord = currentPage * wordsPerPage; // 현재 페이지 마지막 단어의 인덱스
  const indexOfFirstWord = indexOfLastWord - wordsPerPage; // 현재 페이지 첫 번째 단어의 인덱스
  const currentWords = allWords.slice(indexOfFirstWord, indexOfLastWord); // 현재 페이지 단어 목록

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(allWords.length / wordsPerPage);

  return (
    <div className="m-10 xl:m-20">
      {currentWords.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col xl:flex-row bg-white p-6 lg:p-10 my-8 xl:items-center"
        >
          <div className="w-36 xl:w-52 flex items-center mb-5 xl:m-0">
            <img
              src="/assets/images/baseball_icon.svg"
              alt="icon"
              className="size-8 lg:size-10 xl:size-12 mr-3"
            />
            <h1 className="font-bold text-xl lg:text-2xl xl:text-3xl">
              {item.word}
            </h1>
          </div>
          <p className="flex-1 text-lg lg:text-xl xl:text-22 p-0 xl:pr-10">
            {item.description}
          </p>
        </div>
      ))}

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center mt-10">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 xl:mx-1.5 sm:text-lg xl:text-xl ${
              index + 1 === currentPage
                ? "bg-emerald-500 text-white"
                : "bg-gray-200 text-black"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
