import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleValue = new Animated.Value(0.8);

  useEffect(() => {
    // Title animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Subtitle animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Button animation (pulsing effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern}>
        {/* Decorative elements */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
        <View style={[styles.decorativeCircle, styles.circle3]} />
        
        {/* Urdu script decorative elements */}
        <Text style={styles.urduText1}>ا</Text>
        <Text style={styles.urduText2}>و</Text>
        <Text style={styles.urduText3}>ی</Text>
        <Text style={styles.urduText4}>ں</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Urdu Vowels Activity</Text>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.subtitle}>Learn Urdu vowels with interactive exercises</Text>
        </Animated.View>
        
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("VowelSelection")}
          >
            <Text style={styles.buttonText}>Start Learning</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      <Text style={styles.footerText}>Designed for Urdu Language Learners</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF" // White base
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  backgroundPattern: {
    position: "absolute",
    width: width,
    height: height,
    opacity: 0.1,
    backgroundColor: "#F2F4F6", // Light Gray background
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.15,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
    backgroundColor: "#9DB9E2", // Sky Blue
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -50,
    backgroundColor: "#ECA5B3", // Soft Pink
  },
  circle3: {
    width: 100,
    height: 100,
    top: 200,
    right: 100,
    backgroundColor: "#C7E9D0", // Mint Green
  },
  urduText1: {
    position: "absolute",
    top: 100,
    left: 50,
    fontSize: 70,
    color: "#9DB9E2", // Sky Blue
    opacity: 0.15,
    transform: [{ rotate: "15deg" }],
  },
  urduText2: {
    position: "absolute",
    bottom: 150,
    right: 70,
    fontSize: 70,
    color: "#ECA5B3", // Soft Pink
    opacity: 0.15,
    transform: [{ rotate: "-10deg" }],
  },
  urduText3: {
    position: "absolute",
    top: 300,
    left: width / 2 - 30,
    fontSize: 70,
    color: "#C7E9D0", // Mint Green
    opacity: 0.15,
    transform: [{ rotate: "5deg" }],
  },
  urduText4: {
    position: "absolute",
    bottom: 250,
    left: 100,
    fontSize: 70,
    color: "#B7AEDC", // Lavender
    opacity: 0.15,
    transform: [{ rotate: "-5deg" }],
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
    marginBottom: 60,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: { 
    backgroundColor: "#4867B3", // Deep Blue
    padding: 18, 
    borderRadius: 30,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: { 
    color: "#FFFFFF", // White
    fontSize: 20, 
    fontWeight: "600" 
  },
  footerText: {
    position: "absolute",
    bottom: 30,
    color: "#333333", // Charcoal Gray
    fontSize: 14,
  },
});