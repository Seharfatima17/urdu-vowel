// screens/ResultScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { letter, correct } = route.params || { letter: "الف", correct: false };

  return (
    <View style={correct ? styles.correctContainer : styles.wrongContainer}>
      <View style={styles.contentBox}>
        <Text style={styles.heading}>
          {correct ? "Congratulations! 🎉" : "Agli Bar Aur Koshish Karein! ✨"}
        </Text>

        <View style={styles.resultBox}>
          <Text style={styles.letterDisplay}>{letter}</Text>
          
          {correct ? (
            <Text style={styles.correctText}>
              Wah! Aapne jawab bilkul sahi diya! 
              Aapki mehnat rang la rahi hai.
            </Text>
          ) : (
            <Text style={styles.wrongText}>
              Is bar {letter} ka jawab sahi nahi tha, 
              lekin himmat na haaren! Koshish jaari rakhein.
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate("VowelSelection")}
          >
            <Text style={styles.buttonText}>↶ Dobara Koshish Karein</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("VowelSelection")}
          >
            <Text style={styles.buttonText}>Menu</Text>
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.quote}>
          {correct 
            ? '"Seekhne ka safar khoobsurat hota hai"'
            : '"Galtiyan seekhne ka behtareen zariya hain"'}
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  correctContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    padding: 30,
  },
  wrongContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEBEE",
    padding: 20,
  },
  contentBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  resultBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  letterDisplay: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  correctText: {
    fontSize: 20,
    color: "#2E7D32",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "500",
  },
  wrongText: {
    fontSize: 20,
    color: "#D32F2F",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 15,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#3F51B5",
  },
  secondaryButton: {
    backgroundColor: "#757575",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quote: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 20,
  },
});