interface Feature {
  imagePath: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    imagePath: "/assets/images/number1.svg",
    title: "경기 및 선수 정보 제공",
    description:
      "야옹은 KBO 리그의 실시간 경기 일정과 결과를 제공하며 위키 형식으로 선수 정보를 공유하고 있습니다.",
  },
  {
    imagePath: "/assets/images/number2.svg",
    title: "초심자를 위한 야구 사전 제공",
    description:
      "아직 야구 규칙이 어려운 초심자분들을 위해 야구 용어 사전과 각종 퀴즈들을 준비해 두었습니다.",
  },
  {
    imagePath: "/assets/images/number3.svg",
    title: "커뮤니티 기능 제공",
    description:
      "KBO 팬들의 자유로운 소통을 위한 피드 기능을 제공합니다. 전체 게시판과 구단 게시판을 활용해 다른 팬들과 교류해 보세요.",
  },
  {
    imagePath: "/assets/images/number4.svg",
    title: "추천 클립 제공",
    description:
      "사용자의 시청 데이터를 분석해 추천 영상을 제공합니다. 응원하는 구단의 하이라이트와 명장면을 확인해 보세요.",
  },
];
