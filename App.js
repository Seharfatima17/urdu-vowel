import React, { useState } from "react";

// Import all your screens
import WelcomeScreen from "./screens/WelcomeScreen";
import VowelSelectionScreen from "./screens/VowelSelectionScreen";
import LetterScreen from "./screens/LetterScreen";
import WordsScreen from "./screens/WordsScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";

export default function App() {
  const [screen, setScreen] = useState("Welcome");
  const [params, setParams] = useState({});

  // Helper function to navigate
  const navigate = (nextScreen, nextParams = {}) => {
    setScreen(nextScreen);
    setParams(nextParams);
  };

  // Render screens based on current screen state
  if (screen === "Welcome") {
    return <WelcomeScreen onNext={(p) => navigate(p.screen, p)} />;
  }

  if (screen === "VowelSelection") {
    return <VowelSelectionScreen 
             onBack={() => navigate("Welcome")} 
             onNext={(p) => navigate(p.screen, p)}
           />;
  }

  if (screen === "Letter") {
    return <LetterScreen 
             onBack={() => navigate("VowelSelection")} 
             onNext={(p) => navigate(p.screen, p)}
             params={params}
           />;
  }

  // if (screen === "Words") {
  //   return <WordsScreen 
  //            onBack={() => navigate("Letter", params)} 
  //            onNext={(p) => navigate(p.screen, p)}
  //            params={params}
  //          />;
  // }

  if (screen === "QuizScreen") {
    return <QuizScreen 
             onBack={() => navigate("VowelSelection")} 
             onNext={(p) => navigate(p.screen, p)}
             params={params}
           />;
  }

  if (screen === "Result") {
    return <ResultScreen 
             onBack={() => navigate("Welcome")} 
             onRestart={() => navigate("VowelSelection")}
             params={params}
           />;
  }

  return null;
}