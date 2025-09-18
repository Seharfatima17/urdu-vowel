// screens/WordsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

export default function WordsScreen({ route }) {
  // Agar LetterScreen se koi letter bhejna ho
  const { letter } = route.params || { letter: "الف" };

  // Example words (baad me aap aur add kar sakti ho)
  const words = {
    "الف": ["انار", "ام", "اردو"],
    "واؤ": ["وقت", "وجہ", "وزیر"],
    "ہمزہ": ["اِک", "اِن", "اُمید"],
    "یا": ["یار", "یقین", "یاد"]
  };

  const speakWord = (word) => {
    Speech.speak(word, { language: "ur-PK" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{letter} ke lafz</Text>

      {words[letter]?.map((word, index) => (
        <TouchableOpacity
          key={index}
          style={styles.wordButton}
          onPress={() => speakWord(word)}
        >
          <Text style={styles.wordText}>{word}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  wordButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  wordText: {
    fontSize: 22,
  },
});
