import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1> {props.text} </h1>
    </div>
  );
};
const Statistics = (props) => {
  return (
    <div>
      <Statistic text="good" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
      <Statistic text="bad" value={props.bad} />
      <Statistic text="All" value={props.all} />
      <Statistic text="average" value={props.average} />
      <Statistic text="positive" value={props.positive + props.pourcentage} />
    </div>
  );
};

const Statistic = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + neutral + bad}
        average={(good - bad) / (good + neutral + bad)}
        positive={(good * 100) / (good + bad + neutral)}
        pourcentage="%"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
