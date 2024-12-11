import AuthButton from "components/auth/AuthButton";
import InputField from "components/auth/InputField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clubs } from "data/clubs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "store/slices/authSlice";

type Props = {
  authType: string;
};

export default function AuthPage({ authType }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuthAction = async () => {
    if (authType === "signIn") {
      try {
        const response = await axios.post(
          "http://34.237.154.47:8080/api/auth/login",
          {
            username: username,
            password: password,
          }
        );

        if (response.status === 200) {
          setErrorMessage("");
          const { accesstoken } = response.data.data;
          dispatch(setAccessToken(accesstoken));
          alert("로그인에 성공했습니다.");
          navigate("/home?category=talk", { replace: true });
          window.location.reload();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.message ||
              "로그인에 실패했습니다. 다시 시도해주세요."
          );
        } else {
          setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    } else {
      try {
        const response = await axios.post(
          "http://34.237.154.47:8080/api/auth/register",
          {
            username: username,
            password: password,
            email: email,
            role: "USER",
            team: team,
            profileImage: "",
          }
        );

        if (response.status === 200) {
          alert("회원가입이 완료됐습니다.");
          navigate("/signin");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.message ||
              "회원가입에 실패했습니다. 다시 시도해주세요."
          );
        } else {
          setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-lightGreen ">
      <div className="flex flex-col gap-6 w-2/3 max-w-[900px] h-5/6 bg-white space-y-6 px-8 py-10 lg:px-14 lg:py-16 xl:px-32 xl:py-24">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 lg:mb-12 text-left">
          {authType === "signUp" ? "Sign Up" : "Sign In"}
        </h1>
        <InputField
          label="User Name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></InputField>
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></InputField>

        {authType === "signUp" && (
          <div className="flex flex-col">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></InputField>
            <div className="flex flex-col my-5">
              <label className="text-dark1 text-lg lg:text-2xl mb-2 lg:mb-3">
                Team
              </label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="border border-gray-300 p-3 rounded-md text-lg lg:text-2xl"
              >
                <option value="" disabled>
                  Select a team
                </option>
                {clubs.map((club) => (
                  <option key={club.title} value={club.title}>
                    {club.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <AuthButton
          text={authType === "signUp" ? "Sign Up" : "Sign In"}
          onClick={handleAuthAction}
        />
      </div>
    </div>
  );
}
