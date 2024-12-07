import React, { useEffect, useState } from "react";
import BaseballCalendar from "./Calendar";
import DiaryDetails from "./DiaryDetails";
import WriteDiary from "./WriteDiary";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { fetchDiaries } from "api/diaryApi";

export default function Diary() {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [matchDates, setMatchDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const data = await fetchDiaries();
        setDiaries(data);

        const dates = data.map((diary: Diary) => diary.matchDate);
        setMatchDates(dates);
      } catch (error) {
        console.error("일지 목록을 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryData();
  }, []);

  const filteredDiary = diaries.find(
    (diary) => diary.matchDate === selectedDate
  );

  console.log("응답 데이터:", filteredDiary);
  if (loading) {
    return <div className="m-16">Loading...</div>; // 로딩 중 메시지 표시
  }

  console.log(matchDates);
  return (
    <div className="flex flex-col lg:flex-row">
      <BaseballCalendar matchDates={matchDates} />
      {filteredDiary ? (
        <DiaryDetails key={filteredDiary.id} diary={filteredDiary} />
      ) : (
        <WriteDiary />
      )}
    </div>
  );
}
