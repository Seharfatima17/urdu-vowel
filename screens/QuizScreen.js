import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

export default function QuizScreen({ onBack, onNext, params }) {
  const { questions = [] } = params || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(new Set()); // Track correctly answered questions

  // agar koi questions hi nahi mile
  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>اس حرف کے لیے کوئز دستیاب نہیں ہے</Text>
      </View>
    );
  }

  const currentQuiz = questions[currentIndex];

  const handleAnswer = (option) => {
    // Allow changing answer until it's correct
    if (selected === option && isCorrect !== true) {
      setSelected(null);
      setIsCorrect(null);
      return;
    }
    
    setSelected(option);
    const correct = option === currentQuiz.answer;
    setIsCorrect(correct);

    Speech.speak(option, { language: "ur-PK" });

    if (correct) {
      // Add to correct answers set if not already there
      const newCorrectAnswers = new Set(correctAnswers);
      newCorrectAnswers.add(currentIndex);
      setCorrectAnswers(newCorrectAnswers);
      setAnsweredQuestions(newCorrectAnswers.size);
      
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          // next question
          setCurrentIndex(currentIndex + 1);
          setSelected(null);
          setIsCorrect(null);
        } else {
          // quiz complete
          onNext({ 
            screen: "Result", 
            correct: true, 
            totalQuestions: questions.length,
            answeredCorrectly: newCorrectAnswers.size
          });
        }
      }, 1200);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button to return to previous screen */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={24} color="#2a52be" />
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={goToPreviousQuestion}
          >
            <Ionicons name="arrow-back" size={20} color="#4a90e2" />
            <Text style={styles.navButtonText}>پچھلا سوال</Text>
          </TouchableOpacity>
        )}
        
        {/* {currentIndex < questions.length - 1 && (
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={goToNextQuestion}
          >
            <Text style={styles.navButtonText}>اگلا سوال</Text>
            <Ionicons name="arrow-forward" size={20} color="#4a90e2" />
          </TouchableOpacity>
        )} */}
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>سوال {currentIndex + 1}</Text>
        
        <Text style={styles.question}>{currentQuiz.question}</Text>

        {currentQuiz.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selected === option && isCorrect === true && { backgroundColor: "#8cd78fff" },
              selected === option && isCorrect === false && { backgroundColor: "#f9695eff" },
              selected === option && isCorrect === null && { backgroundColor: "#9DB9E2" },
            ]}
            onPress={() => handleAnswer(option)}
          >
            <Text style={[
              styles.optionText,
              selected === option && { color: "#fff" }
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((correctAnswers.size) / questions.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{correctAnswers.size} / {questions.length} سوالوں کے جواب دیے</Text>
        </View>

        {/* Answer Status */}
        {selected && (
          <View style={[
            styles.answerStatus,
            isCorrect ? styles.correctStatus : styles.incorrectStatus
          ]}>
            <Text style={styles.answerStatusText}>
              {isCorrect ? "✓ صحیح جواب!" : "غلط جواب - دوبارہ کوشش کریں"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 80,
  },
  navigationContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 2,
    padding: 8,
    backgroundColor: "#e9f5ff",
    borderRadius: 40,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9f5ff",
    padding: 10,
    borderRadius: 20,
  },
  navButtonText: {
    color: "#4a90e2",
    marginHorizontal: 5,
    fontSize: 14,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2a52be",
  },
  question: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
    lineHeight: 32,
  },
  option: {
    backgroundColor: "#e9f5ff",
    paddingVertical: 16,
    paddingHorizontal: 30,
    marginVertical: 8,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  optionText: {
    fontSize: 18,
    color: "#2a52be",
    fontWeight: "500",
  },
  progressContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  progressBar: {
    width: 200,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  answerStatus: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  correctStatus: {
    backgroundColor: "#e8f5e9",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  incorrectStatus: {
    backgroundColor: "#ffebee",
    borderColor: "#F44336",
    borderWidth: 1,
  },
  answerStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});