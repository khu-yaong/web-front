import React, { useEffect, useState } from "react";
import { getWords } from "api/dictionaryApi";

type WordItem = {
  word: string;
  description: string;
};

export default function Word() {
  const [words, setWords] = useState<WordItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWords(100);
        setWords(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="m-10 xl:m-20">
      {words.map((item, index) => (
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
    </div>
  );
}
