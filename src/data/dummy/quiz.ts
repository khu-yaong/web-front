type QuizData = {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
};

export const quizData: QuizData[] = [
  {
    question: "야구에서 투수가 던지는 공의 속도를 측정하는 기구는 무엇인가?",
    correctAnswer: "레이더건",
    wrongAnswers: ["스피도미터", "타코미터", "속도계"],
  },
  {
    question:
      "야구 경기에서 한 이닝에 3아웃을 기록하면 무슨 상황이 발생하는가?",
    correctAnswer: "이닝 종료",
    wrongAnswers: ["경기 종료", "게임 재개", "투수 교체"],
  },
  {
    question:
      "야구에서 홈런을 칠 때, 타자는 몇 개의 베이스를 모두 밟아야 하는가?",
    correctAnswer: "4개",
    wrongAnswers: ["3개", "2개", "1개"],
  },
  {
    question: "야구 경기에서 심판이 사용하는 신호 도구는 무엇인가?",
    correctAnswer: "손짓과 깃발",
    wrongAnswers: ["호각", "휘슬", "경적"],
  },
  {
    question: "야구에서 타자가 스트라이크 세 개를 당하면 어떻게 되는가?",
    correctAnswer: "삼진 아웃",
    wrongAnswers: ["볼넷", "파울", "안타"],
  },
  {
    question: "야구 경기에서 타석에 들어서는 선수는 어떤 역할을 하는가?",
    correctAnswer: "타자",
    wrongAnswers: ["투수", "포수", "주자"],
  },
  {
    question: "야구에서 1루수의 위치는 어디인가?",
    correctAnswer: "1루 베이스 옆",
    wrongAnswers: ["2루 베이스 옆", "3루 베이스 옆", "홈 베이스 옆"],
  },
  {
    question: "야구에서 한 경기의 이닝 수는 일반적으로 몇 이닝인가?",
    correctAnswer: "9이닝",
    wrongAnswers: ["7이닝", "5이닝", "10이닝"],
  },
  {
    question:
      "야구에서 투수가 던지는 공이 타자의 방망이에 맞지 않고 포수의 미트에 들어가는 것을 무엇이라고 하는가?",
    correctAnswer: "헛스윙",
    wrongAnswers: ["파울", "볼", "안타"],
  },
  {
    question:
      "야구에서 타자가 타구를 친 후 1루까지 안전하게 도달하는 것을 무엇이라고 하는가?",
    correctAnswer: "1루타",
    wrongAnswers: ["2루타", "3루타", "홈런"],
  },
];
