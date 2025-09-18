// screens/QuizScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

export default function QuizScreen({ route, navigation }) {
  const { letter } = route.params || { letter: "الف" };

  // Example quiz questions per letter
  const quizData = {
    "الف": {
      question: "یہ لفظ کس سے شروع ہوتا ہے؟",
      correct: "انار",
      options: ["انار", "وقت", "یار"],
    },
    "واؤ": {
      question: "یہ لفظ کس سے شروع ہوتا ہے؟",
      correct: "وقت",
      options: ["وقت", "انار", "یقین"],
    },
    "ہمزہ": {
      question: "یہ لفظ کس سے شروع ہوتا ہے؟",
      correct: "اُمید",
      options: ["اُمید", "یار", "وزیر"],
    },
    "یا": {
      question: "یہ لفظ کس سے شروع ہوتا ہے؟",
      correct: "یقین",
      options: ["یقین", "اردو", "وقت"],
    },
  };

  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuiz = quizData[letter];

  const handleAnswer = (option) => {
    setSelected(option);
    const correct = option === currentQuiz.correct;
    setIsCorrect(correct);

    Speech.speak(option, { language: "ur-PK" });

    if (correct) {
      setTimeout(() => {
        navigation.navigate("Result", { letter, correct: true });
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{letter} Quiz</Text>
      <Text style={styles.question}>{currentQuiz.question}</Text>

      {currentQuiz.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === option && isCorrect === true && { backgroundColor: "#c8e6c9" },
            selected === option && isCorrect === false && { backgroundColor: "#ffcdd2" },
          ]}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  question: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
  },
  option: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
  },
});
