import { ChangeEvent, FC, useState } from "react";
import IPokerInterface from "../types/HandInterface";

const HandDealing: FC = () => {
  var pokerHand: any;

  const initialHandState = {
    analysis: "",
    hand: "",
  };

  const [hand, setHand] = useState<IPokerInterface>(initialHandState);
  const [isDealingVisible, setIsDealingVisible] = useState<Boolean>(false);

  const [handToAnalyze, sethandToAnalyze] = useState<string>();
  const [analysisResult, setAnalysisResult] = useState<string>();

  const [isAnalysisVisible, setIsAnalysisVisible] = useState<Boolean>(false);


  const handleChange = (event:any)  => {
    sethandToAnalyze(event.target.value);
  };

  function callGetHand() {
    fetch("http://localhost:8080/deal", { method: "GET" })
    .then(response => response.json())
    .then(response => setHand(response))
    setIsDealingVisible(true);
  }

  function analyzeHand() {

      fetch("http://localhost:8080/analyze/?hand="+handToAnalyze, { method: "GET" })
      .then(response => response.json())
      .then(response => setAnalysisResult(response.analysis))
      setIsAnalysisVisible(true);

      console.log(handToAnalyze)

  }

  const displayPokerHand = () => {
    return (<p>The hand dealt is:{hand.hand}, analysis of the hand is: {hand.analysis}</p>);
  }

  const displayAnalysisResult = () => {
    console.log("Returned is: " + analysisResult);
    return (<p>The hand provided was:{handToAnalyze}, analysis of the hand is: {analysisResult}</p>);
  }
  

  return (
    <>
      <h1>Welcome to the poker game!</h1>
      <button onClick={callGetHand}>Deal a hand and analyse it</button>
      {isDealingVisible ? displayPokerHand() : <p>The dealt hand will show up here</p>}

      <h3>Analyse a hand:</h3>
      <input id="handToAnalyze" onChange={handleChange} value={handToAnalyze} placeholder="Write in a hand seperated with commas"></input>
      <button onClick={analyzeHand}>Analyze my hand</button>
      <p>Analysis:</p>
      {isAnalysisVisible ? displayAnalysisResult() : <></>}

    </>
  );
};

export default HandDealing;
