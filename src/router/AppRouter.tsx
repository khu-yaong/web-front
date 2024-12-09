import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "components/layout/Header";
import LandingPage from "pages/LandingPage";
import AuthPage from "pages/AuthPage";
import SignUp from "components/auth/SignUp";
import HomePage from "pages/HomePage";
import Mypage from "pages/Mypage";
import Profile from "components/myPage/Profile";
import Diary from "components/myPage/Diary/Diary";
import Dictionarypage from "pages/DictionaryPage";
import Dictionary from "components/dictionary/Dictionary";
import Quiz from "components/dictionary/Quiz";
import Song from "components/dictionary/Song";
import Player from "components/dictionary/Player";
import Video from "components/myPage/Video";
import RecommendVideo from "components/myPage/RecommendVideo";
import TeamVideo from "components/myPage/TeamVideo";
import VideoPage from "pages/VideoPage";
import DashboardPage from "pages/DashboardPage";
import Dashboard from "components/dashboard/Dashboard";
import Score from "components/dashboard/Score";
import PrivateRoute from "./PrivateRoute";
import FielderDetail from "components/dictionary/FielderDetail";
import PitcherDetail from "components/dictionary/PitcherDetail";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<AuthPage authType="signIn" />} />

        <Route path="/home" element={<PrivateRoute element={<HomePage />} />}>
          <Route path="view" element={<HomePage />} />
          <Route path="review" element={<HomePage />} />
          <Route path="discussion" element={<HomePage />} />
          <Route path="talk" element={<HomePage />} />
          <Route path="tip" element={<HomePage />} />
          <Route path="etc" element={<HomePage />} />
        </Route>
        <Route path="/mypage" element={<PrivateRoute element={<Mypage />} />}>
          <Route path="profile" index element={<Profile />} />
          <Route path="diary" element={<Diary />} />
          <Route path="video" element={<VideoPage />}>
            <Route index element={<Video />} />
            <Route path="recommend" element={<RecommendVideo />} />
            <Route path="team" element={<TeamVideo />} />
          </Route>
        </Route>
        <Route
          path="/dictionary"
          element={<PrivateRoute element={<Dictionarypage />} />}
        >
          <Route path="words" index element={<Dictionary />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="songs" element={<Song />} />
          <Route path="players" element={<Player />} />
          <Route path="players/fielder/:playerId" element={<FielderDetail />} />
          <Route path="players/pitcher/:playerId" element={<PitcherDetail />} />
        </Route>
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        >
          <Route path="match" index element={<Dashboard />} />
          <Route path="record" element={<Score />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
