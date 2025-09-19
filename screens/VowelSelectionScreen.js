import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function VowelSelectionScreen({ onBack, onNext }) {
  const vowels = [
    { letter: "ا", name: "الف" },
    { letter: "و", name: "واو" },
    { letter: "ء", name: "ہمزہ" },
    { letter: "ی", name: "یا" }
  ];
  
  const handleVowelSelect = (vowel) => {
    onNext({ screen: "Letter", vowel: vowel.letter });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button in Top Left */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={24} color="#4867B3" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>مصوتہ منتخب کریں</Text>
        <Text style={styles.subtitle}>مشق کے لیے ایک مصوتہ منتخب کریں</Text>
        
        <View style={styles.vowelGrid}>
          {vowels.map((vowel, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.vowelButton, styles.vowelButtonShadow]}
              onPress={() => handleVowelSelect(vowel)}
            >
              <Text style={styles.vowelText}>{vowel.letter}</Text>
              <Text style={styles.vowelLabel}>{vowel.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F2F4F6", // Light Gray background
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#333333", // Charcoal Gray
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4867B3", // Deep Blue
    marginBottom: 50,
    textAlign: "center",
  },
  vowelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
    maxWidth: 400,
  },
  vowelButton: { 
    backgroundColor: "#FFFFFF", // White
    padding: 25,
    borderRadius: 20,
    margin: 15,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#9DB9E2", // Sky Blue border
  },
  vowelButtonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  vowelText: { 
    color: "#4867B3", // Deep Blue
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 5,
  },
  vowelLabel: {
    color: "#333333", // Charcoal Gray
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
});