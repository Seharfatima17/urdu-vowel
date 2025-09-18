import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

export default function LetterScreen({ route, navigation }) {
  const { vowel } = route.params;
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Data for each vowel
  const vowelData = {
    "ا": {
      sound: "الف",
      examples: ["ادب", "اثر", "اتحاد", "ادا", "انصاف", "انسان", "انار"],
      practiceWords: ["اب", "ادب", "امل", "اخبار", "ادرک"],
    },
    "و": {
      sound: "واو",
      examples: ["واپس", "وضو", "وقت", "ولد", "وجہ", "وزن", "واحد"],
      practiceWords: ["ود", "ورثہ", "وسیم", "وصول", "وقف"],
    },
    "ء": {
      sound: "ہمزہ",
      examples: ["اِک", "اِن", "اُمید", "اَمر", "اَثر"],
      practiceWords: ["اَثر", "اِشارہ", "اِنکار", "اُستاد", "اُمید"],
    },
    "ی": {
      sound: "یا",
      examples: ["یاد", "یقین", "یہ", "یار", "یوں", "یکتا", "یخ"],
      practiceWords: ["ید", "یاس", "یقین", "یخ", "یکجائی"],
    },
  };

  // ✅ Quiz data for each vowel
  const quizBank = {
    "ا": [
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: [ "کتاب","انار", "گھر"], answer: "انار" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: [ "وقت", "درخت","ادب"], answer: "ادب" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["اتحاد", "پہاڑ", "بندر"], answer: "اتحاد" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["دوست","انسان", "پانی"], answer: "انسان" },
      { question: "الف سے کون سا لفظ شروع ہوتا ہے؟", options: ["ادا", "گھر", "چڑیا"], answer: "ادا" },
    ],
    "و": [
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["وقت", "سیب", "کتاب"], answer: "وقت" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["سفر","وضو", "پہاڑ"], answer: "وضو" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["واپس", "درخت", "بندر"], answer: "واپس" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["انار", "یاد","وزن"], answer: "وزن" },
      { question: "واو سے کون سا لفظ شروع ہوتا ہے؟", options: ["گھر","وجہ",  "پانی"], answer: "وجہ" },
    ],
    "ء": [
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اُمید", "وقت", "درخت"], answer: "اُمید" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: [ "کتاب","اَثر", "دوست"], answer: "اَثر" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اِک", "بندر", "یاد"], answer: "اِک" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: [ "پہاڑ", "گھر","اَمر"], answer: "اَمر" },
      { question: "ہمزہ سے کون سا لفظ شروع ہوتا ہے؟", options: ["اِن", "سیب", "پانی"], answer: "اِن" },
    ],
    "ی": [
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یاد", "کتاب", "پہاڑ"], answer: "یاد" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: [ "سیب", "انار","یقین"], answer: "یقین" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: ["یار", "درخت", "سفر"], answer: "یار" },
      { question: "یا سے کون سا لفظ شروع ہوتا ہے؟", options: [ "بندر","یوں", "دوست"], answer: "یوں" },
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
          onPress={() =>
            navigation.navigate("QuizScreen", {
              questions: quizBank[vowel] || [],
            })
          }
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
