// screens/ResultScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { letter, correct } = route.params || { letter: "الف", correct: false };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>نتائج</Text>

      {correct ? (
        <Text style={styles.correctText}>
          🎉 Shabash! Aapne {letter} ka jawab sahi diya!
        </Text>
      ) : (
        <Text style={styles.wrongText}>
          ❌ Afsoos! Aapne {letter} ka jawab ghalat diya.
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.buttonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  correctText: {
    fontSize: 22,
    color: "green",
    textAlign: "center",
    marginBottom: 30,
  },
  wrongText: {
    fontSize: 22,
    color: "red",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
