import React, { useState } from "react";
import { View, Text, ImageBackground, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from '../utils/axiosInstance'; // Axios instance setup
import { API } from '../api/apiUrl'; // API URL constants
import { styled } from "nativewind";
import storageMethod from '../utils/storageMethod'; // Local storage management

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(API.LOGIN, {
        identifier: email,
        password: password,
      });

      const { token, data } = response;

      // Save the token and user data in local memory
      storageMethod.set({ access_token: token, refresh_token: token });

      // Navigate to the home screen or any other screen
      navigation.navigate("Home");

    } catch (error) {
      setLoading(false);

      if (error.response?.status === 400) {
        Alert.alert("Login Failed", "Invalid username/email or password");
      } else {
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    }
  };

  const BackgroundImage = styled(ImageBackground);
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledButton = styled(Button);

  return (
    <BackgroundImage
      source={require("../assets/pngegg.png")}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <StyledView className="bg-black/50 px-5 py-10 justify-center items-center">
        <StyledText className="text-2xl font-bold text-center mb-2 text-white">
          Welcome Back to PawFund!
        </StyledText>
        <StyledText className="text-base text-center mb-5 text-gray-300">
          Log in to continue helping pets in need
        </StyledText>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="mail-outline" size={24} color="#ddd" />}
          containerStyle={{ marginBottom: 15 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="lock-closed-outline" size={24} color="#ddd" />}
          containerStyle={{ marginBottom: 15 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />

        <StyledButton
          title={loading ? "Logging in..." : "Log In"}
          onPress={handleLogin}
          disabled={loading}
          buttonStyle={{ backgroundColor: "#6c63ff", borderRadius: 8, width: "100%", paddingVertical: 15 }}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          containerStyle={{ width: "100%", marginBottom: 10 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <StyledText className="text-center text-indigo-500 mt-5 text-sm">
            Don't have an account? Register here
          </StyledText>
        </TouchableOpacity>
      </StyledView>
    </BackgroundImage>
  );
};

export default LoginScreen;
