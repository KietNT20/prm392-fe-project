import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0

  useEffect(() => {
    // Start the animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to opacity 1
      duration: 2000, // Animation duration
      useNativeDriver: true,
    }).start(() => {
      // Navigate to the next screen once animation completes
      setTimeout(() => {
        navigation.replace("Login"); // Replace 'Login' with your target screen
      }, 1000); // Delay to hold the splash screen
    });
  }, [fadeAnim, navigation]);

  const AnimatedView = styled(Animated.View);
  const StyledView = styled(View);
  const StyledText = styled(Text);

  return (
    <StyledView className="flex-1 justify-center items-center bg-indigo-500">
      <AnimatedView
        style={{ opacity: fadeAnim }}
        className="justify-center items-center"
      >
        <Ionicons name="paw-outline" size={80} color="white" />
        <StyledText className="text-4xl font-bold text-white mt-4">
          PawFund
        </StyledText>
      </AnimatedView>
    </StyledView>
  );
};

export default SplashScreen;
