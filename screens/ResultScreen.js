import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ResultScreen({ onBack, onRestart, params }) {
  const { correct = false, totalQuestions = 5, answeredCorrectly = 0 } = params || {};

  return (
    <View style={correct ? styles.correctContainer : styles.wrongContainer}>
      
      {/* Background decorative elements */}
      <View style={styles.backgroundDecor}>
        <View style={[styles.decorCircle, styles.circle1]} />
        <View style={[styles.decorCircle, styles.circle2]} />
        <View style={[styles.decorCircle, styles.circle3]} />
      </View>

      <View style={styles.contentBox}>
        
        {/* Result Icon */}
        <View style={[styles.iconContainer, correct ? styles.correctIcon : styles.wrongIcon]}>
          <Ionicons 
            name={correct ? "checkmark-circle" : "alert-circle"} 
            size={80} 
            color={correct ? "#4CAF50" : "#F44336"} 
          />
        </View>

        <Text style={styles.heading}>
          {correct ? "مبارک ہو! 🎉" : "اگلی بار اور کوشش کریں! ✨"}
        </Text>

        <View style={styles.resultBox}>
          {correct ? (
            <Text style={styles.correctText}>
       آپ نے تمام سوالوں کے جواب بالکل صحیح دیے! 
              آپکی محنت رنگ لا رہی ہے۔
            </Text>
          ) : (
            <Text style={styles.wrongText}>
              آپ نے {answeredCorrectly} سوالوں کے جواب صحیح دیے۔ 
              ہمت نہ ہاریں! تھوڑی اور محنت سے آپ ضرور کامیاب ہوں گے۔
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => onRestart({ screen: "VowelSelection" })}
          >
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.buttonText}>دوبارہ کوشش کریں</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => onBack({ screen: "VowelSelection"})}
          >
            <Ionicons name="refresh" size={24} color="#fff" />
            <Text style={styles.buttonText}>ہوم مینو</Text>
          </TouchableOpacity>
        </View>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  correctContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F8E9",
    padding: 20,
  },
  wrongContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEBEE",
    padding: 20,
  },
  backgroundDecor: {
    position: "absolute",
    width: width,
    height: height,
  },
  decorCircle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
    backgroundColor: "#4CAF50",
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -50,
    backgroundColor: "#FF9800",
  },
  circle3: {
    width: 100,
    height: 100,
    top: 200,
    right: 100,
    backgroundColor: "#2196F3",
  },
  contentBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  correctIcon: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  wrongIcon: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  resultBox: {
    backgroundColor: "rgba(245, 245, 245, 0.8)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  correctText: {
    fontSize: 18,
    color: "#2E7D32",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "500",
  },
  wrongText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    width: "100%",
    maxWidth: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
  },
  secondaryButton: {
    backgroundColor: "#607D8B",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  quote: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 15,
  },
});