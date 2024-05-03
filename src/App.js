import { useState } from "react";
import "./App.css";

// App 関数のreturnの中身が画面に表示される
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [useQuizData, setUseQuizData] = useState(true);
  const [next, setNext] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [allCorrect, setAllCollect] = useState(true);

  const handleAnswer = (answer) => {
    const newAnswer = {
      question: quizData[currentQuestion].question,
      answer: answer,
      correct: answer === quizData[currentQuestion].correct,
    };

    // 正解していた場合
    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("⚪︎");
    } else {
      //不正解の場合
      setFeedback("×");
      setAllCollect(false);
    }
    setAnswers([...answers, newAnswer]);
    // 初期の空の配列にnewAnswerの配列が代入される → [{},{},{}]
    setNext(true);
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    // 次の問題がある場合
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      //次の問題がない場合
      setShowScore(true);
    }
    setNext(false);
  };

  return (
    <div className="quiz-container">
      {/* 最終スコア表示 */}
      {showScore ? (
        <div className="score-section">
          <h1> スコア </h1>
          <h2>
            {score}/{quizData.length}
          </h2>

          <table className="answer-table">
            <thead>
              <tr>
                <td> 問題 </td>
                <td> 解答 </td>
                <td> 結果 </td>
              </tr>
            </thead>
            <tbody>
              {answers.map((item) => (
                <tr className={item.correct ? "correct" : "wrong"}>
                  <td> {item.question} </td>
                  <td> {item.answer} </td>
                  <td> {item.correct ? "⚪︎" : "×"} </td>
                </tr>
              ))}
            </tbody>
          </table>
          {allCorrect ? (
            <button className="shareButton">
              <a
                href="http://twitter.com/share?url=https://mini-quizapp.onrender.com/&text=全問正解！！みんなで一緒に！！「真実はいつもひさじゅ！！！」"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="shareLink"
              >
                Xで共有する
              </a>
            </button>
          ) : (
            <button className="shareButton">
              <a
                href="http://twitter.com/share?url=https://mini-quizapp.onrender.com/&text=不正解...? RUNTEQの方ではない？？...偽物だぁぁぁ！！！"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="shareLink"
              >
                Xで共有する
              </a>
            </button>
          )}
          <button className="reloadButton">
            <a href="https://mini-quizapp.onrender.com/" className="reloadLink">
              もう一度遊ぶ
            </a>
          </button>
        </div>
      ) : (
        <div className="question-section">
          <h3> あなたにわかるか？？</h3>
          <h3> 真実はいつも「ひさじゅ！！」 </h3>
          <h2>
            問題 {currentQuestion + 1} / {quizData.length}{" "}
          </h2>
          <h2> {quizData[currentQuestion].question} </h2>

          {next ? (
            // feedbackに値があれば表示する
            <div className="feedback-section">
              <h2 className="large-feedback"> {feedback} </h2>
              <p> 回答 </p>
              <p> {quizData[currentQuestion].correct} </p>
              <button onClick={goToNextQuestion}> 次の問題へ </button>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

const quizData = [
  {
    question: "RUNTEQの公式キャラクターといえば？",
    options: ["らんてくん", "ひさじゅ校長", "らんてっく君", "コナン君"],
    correct: "らんてくん",
  },
  {
    question: "「Vimやで工藤」と発言したのはだれ？ ",
    options: [
      "らんてくん",
      "ひさじゅ校長",
      "言ってないけど多分、服部平次",
      "ロボらんてくん",
    ],
    correct: "言ってないけど多分、服部平次",
  },
  {
    question:
      "大魔王「ひさじゅ」の極大魔法「ヴィムハラ〜」が発動すると使えなくなるものは？",
    options: ["かめはめ波", "悪魔の実の能力", "この世の全ての通貨", "VScode"],
    correct: "VScode",
  },
  {
    question: "らんてくんの生まれはどこ？",
    options: [
      "渋谷区のとあるRUNTEQ教室",
      "森の中のとある実験室",
      "海の中のとある海底遺跡",
      "山の中のとある研究所",
    ],
    correct: "山の中のとある研究所",
  },
  {
    question: "らんてくんの趣味は？",
    options: [
      "FINAL FANTASY",
      "マインクラフト",
      "ドラゴンクエスト",
      "ウイニングイレブン",
    ],
    correct: "FINAL FANTASY",
  },
  {
    question: "らんてくんの好きなお酒は？",
    options: ["ハイボール", "黒霧島", "カルアミルク", "ファジーネーブル"],
    correct: "黒霧島",
  },
  {
    question: "RUNTEQ校長、菊本さんの本名の読みは？",
    options: ["ひさじゅ", "ひさす", "ひさとし", "くじゅ"],
    correct: "ひさとし",
  },
];

export default App;
