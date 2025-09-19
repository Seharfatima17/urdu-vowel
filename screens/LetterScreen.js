import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

export default function LetterScreen({ onBack, onNext, params }) {
  const { vowel } = params;
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Data for each vowel with easy words and correct sounds
  const vowelData = {
    "ا": {
      sound: "اا", // Alif ki basic sound
      examples: ["ابا", "اماں", "اردو", "استاد", "اچھا", "انڈا", "اونٹ"],
      practiceWords: ["ابا", "اماں", "اردو", "استاد", "اچھا"],
    },
    "و": {
      sound: "وا", // Waw ki sound "wa"
      examples: ["واں", "وہ", "وان", "وضو", "وقت", "ولد", "وجہ"],
      practiceWords: ["واں", "وہ", "وان", "وضو", "وقت"],
    },
    "ء": {
      sound: "اا", // Hamza ki sound "hamza"
      examples: ["اَبر", "اِدھر", "اُدھر", "اَمر", "اِشارہ", "اُفتاب", "اَنجیر"],
      practiceWords: ["اَبر", "اِدھر", "اُدھر", "اَمر", "اِشارہ"],
    },
    "ی": {
      sound: "یا", // Ya ki sound "ya"
      examples: ["یاد", "یہ", "یار", "یوں", "یکتا", "یخ", "یاس"],
      practiceWords: ["یاد", "یہ", "یار", "یوں", "یخ"],
    },
  };

  // ✅ Quiz data for each vowel with easy words
  const quizBank = {
    "ا": [
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["ابا", "کتاب", "گھر"], answer: "ابا" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["اماں", "درخت", "سیب"], answer: "اماں" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["اردو", "پہاڑ", "بندر"], answer: "اردو" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["استاد", "دوست", "پانی"], answer: "استاد" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["اچھا", "گھر", "چڑیا"], answer: "اچھا" },
    ],
    "و": [
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["واں", "سیب", "کتاب"], answer: "واں" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["وہ", "سفر", "پہاڑ"], answer: "وہ" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["وان", "درخت", "بندر"], answer: "وان" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["وضو", "انار", "یاد"], answer: "وضو" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["وقت", "گھر", "پانی"], answer: "وقت" },
    ],
    "ء": [
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اَبر", "وقت", "درخت"], answer: "اَبر" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اِدھر", "کتاب", "دوست"], answer: "اِدھر" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اُدھر", "بندر", "یاد"], answer: "اُدھر" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اَمر", "پہاڑ", "گھر"], answer: "اَمر" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اِشارہ", "سیب", "پانی"], answer: "اِشارہ" },
    ],
    "ی": [
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یاد", "کتاب", "پہاڑ"], answer: "یاد" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یہ", "سیب", "انار"], answer: "یہ" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یار", "درخت", "سفر"], answer: "یار" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یوں", "بندر", "دوست"], answer: "یوں" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یخ", "پانی", "گھر"], answer: "یخ" },
    ],
  };

  const currentVowel = vowelData[vowel] || vowelData["ا"];

  const speak = async (text) => {
    if (isSpeaking) await Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      language: "ur",
      rate: 0.9,
      pitch: 1.0,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  const playVowelSound = () => {
    speak(currentVowel.sound);
  };

  const handleQuizNavigate = () => {
    onNext({ 
      screen: "QuizScreen", 
      questions: quizBank[vowel] || [] 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#2a52be" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Vowel Display */}
        <View style={styles.section}>
          <Text style={styles.vowelDisplay}>{vowel}</Text>
        </View>

        {/* Sound Button */}
        <TouchableOpacity
          style={styles.soundButton}
          onPress={playVowelSound}
          disabled={isSpeaking}
        >
          <Text style={styles.buttonText}>
            {isSpeaking ? "چل رہا ہے..." : "آواز سنیں"}
          </Text>
        </TouchableOpacity>

        {/* Example Words */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>مثالی الفاظ:</Text>
          <View style={styles.wordGrid}>
            {currentVowel.examples.map((word, index) => (
              <TouchableOpacity
                key={index}
                style={styles.wordCard}
                onPress={() => speak(word)}
                disabled={isSpeaking}
              >
                <Text style={styles.wordText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Practice Words */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>مشق کے الفاظ:</Text>
          <View style={styles.wordGrid}>
            {currentVowel.practiceWords.map((word, index) => (
              <View key={index} style={styles.practiceWordCard}>
                <Text style={styles.practiceWordText}>{word}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 👇 Quiz Button */}
        <TouchableOpacity
          style={styles.quizButton}
          onPress={handleQuizNavigate}
        >
          <Text style={styles.buttonText}>مشقی سوالات پر جائیں</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 20, paddingTop: 40, justifyContent: "flex-start" },
  backButton: {
    position: "absolute", top: 40, left: 20, zIndex: 1, padding: 8,
    backgroundColor: "#e9f5ff", borderRadius: 40,
  },
  section: { marginBottom: 1, alignItems: "center" },
  vowelDisplay: { fontSize: 100, fontWeight: "bold", color: "#2a52be", textAlign: "center" },
  soundButton: {
    backgroundColor: "#4a90e2", padding: 15, borderRadius: 10,
    alignItems: "center", marginVertical: -15, marginHorizontal: 30,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  subtitle: {
    fontSize: 20, fontWeight: "600", marginBottom: 10, marginTop: 35,
    color: "#4a90e2", textAlign: "center",
  },
  wordGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  wordCard: {
    backgroundColor: "#e9f5ff", padding: 12, borderRadius: 10,
    margin: 5, minWidth: 80, alignItems: "center",
  },
  wordText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  practiceWordCard: {
    backgroundColor: "#f0f8ff", padding: 12, borderRadius: 10,
    margin: 5, minWidth: 80, alignItems: "center",
  },
  practiceWordText: { fontSize: 18, color: "#000" },
  quizButton: {
    backgroundColor: "#2a52be", padding: 15, borderRadius: 12,
    alignItems: "center", marginTop: 20,
  },
});