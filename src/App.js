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
  const [userAnswer, setUserAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    const newAnswer = {
      question: quizData[currentQuestion].question,
      answer: answer,
      correct: answer === quizData[currentQuestion].correct,
    };

    // 正解していた場合
    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("○");
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
          <h1 className="question_text"> スコア </h1>
          <h2 className="question_text">
            {score}/{quizData.length}
          </h2>

          {allCorrect ? (
            <div>
              <h1> さすが！！全問正解！！ </h1>
              <h2> みんなで一緒に！！ </h2>
              <h2>「真実はいつもひさじゅ！！！」 </h2>
              <button className="shareButton">
                <a
                  href="http://x.com/intent/tweet?url=https://mini-quizapp.onrender.com/&hashtags=真実はいつもひさじゅ&text=全問正解！！みんなで一緒に！！「真実はいつもひさじゅ！！！」"
                  target="_blank"
                  hashtags="真実はいつもひさじゅ"
                  className="shareLink"
                >
                  Xで共有する
                </a>
              </button>
            </div>
          ) : (
            <div>
              <h1> 不正解...? </h1>
              <h2> まさか..RUNTEQの方ではない？？...</h2>
              <h2> 偽物だぁぁぁ！！！ </h2>
              <button className="shareButton">
                <a
                  href="http://x.com/intent/tweet?url=https://mini-quizapp.onrender.com/&hashtags=真実はいつもひさじゅ&text=不正解...? RUNTEQの方ではない？？...偽物だぁぁぁ！！！"
                  target="_blank"
                  hashtags="真実はいつもひさじゅ"
                  className="shareLink"
                >
                  Xで共有する
                </a>
              </button>
            </div>
          )}
          <button className="reloadButton">
            <a href="https://mini-quizapp.onrender.com/" className="reloadLink">
              もう一度遊ぶ
            </a>
          </button>
        </div>
      ) : (
        <div className="question-section">
          <h2> RUNTEQの人ならわかるよね？？</h2>
          <h2> 真実はいつも「ひさじゅ！！」 </h2>
          <div>
            <h2 className="question_text">
              問題 {currentQuestion + 1} / {quizData.length}{" "}
            </h2>
            <h2 className="question_text">
              {quizData[currentQuestion].question}
            </h2>
          </div>

          {next ? (
            // feedbackに値があれば表示する
            <div className="feedback-section">
              <h2 className="large-feedback"> {feedback} </h2>
              <p> あなたの回答 </p>
              <p> {userAnswer} </p>
              <button onClick={goToNextQuestion}> 次へ </button>
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
      "言ってないけど多分、らんてくん",
      "言ってないけど多分、孫悟空",
      "言ってないけど多分、服部平次",
      "言ってないけど多分、ロボらんてくん",
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
