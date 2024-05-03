import { useState } from "react";
import "./App.css";

// App 関数のreturnの中身が画面に表示される
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const handleAnswer = (answer) => {
    const newAnswer = {
      question: quizData[currentQuestion].question,
      answer: answer,
      correct: answer === quizData[currentQuestion].correct,
    };
    console.log(newAnswer);

    // 正解していた場合
    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("⚪︎");
    } else {
      //不正解の場合
      setFeedback("⚪︎");
    }

    setAnswers([...answers, newAnswer]);
    // 初期の空の配列にnewAnswerの配列が代入される → [{},{},{}]
    setNext(true);
  };
  return (
    <div className="quiz-container">
      <div className="question-section">
        <h1>
          問題 {currentQuestion + 1} / {quizData.length}{" "}
        </h1>
        <h2> {quizData[currentQuestion].question} </h2>

        <div className="answer-section">
          {quizData[currentQuestion].options.map((item, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(item)}
              className={`quiz-option-button option-${index}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const quizData = [
  {
    question: "太陽系で最も大きな惑星は？",
    options: ["地球", "火星", "木製", "土星"],
    correct: "木製",
  },
  {
    question: "江戸川コナンの正体は？",
    options: ["工藤新一", "服部平次", "怪盗キッド", "ひさじゅ"],
    correct: "工藤新一",
  },
  {
    question: "モナリザを書いたのは誰ですか？",
    options: ["レオナルド", "火星", "木製", "土星"],
    correct: "木製",
  },
  {
    question: "太陽系で最も大きな惑星は？",
    options: ["地球", "火星", "木製", "土星"],
    correct: "木製",
  },
];

export default App;
