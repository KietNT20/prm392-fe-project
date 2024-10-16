import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Input, Button} from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Handle registration logic here
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
          Join PawFund!
        </StyledText>
        <StyledText className="text-base text-center mb-5 text-gray-300">
          Create an account to adopt and support pets in need
        </StyledText>

        <Input
          placeholder="User name"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="mail-outline" size={24} color="#ddd" style={{marginLeft: 10}} />}
          containerStyle={{ marginBottom: 2 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="mail-outline" size={24} color="#ddd" style={{marginLeft: 10}} />}
          containerStyle={{ marginBottom: 2 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="mail-outline" size={24} color="#ddd" style={{marginLeft: 10}} />}
          containerStyle={{ marginBottom: 2 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="lock-closed-outline" size={24} color="#ddd" style={{marginLeft: 10}} />}
          containerStyle={{ marginBottom: 2 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#ddd"
          inputStyle={{ color: "#fff" }}
          leftIcon={<Ionicons name="lock-closed-outline" size={24} color="#ddd" />}
          containerStyle={{ marginBottom: 10 }}
          inputContainerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 8 }}
        />

        <StyledButton
          title="Register"
          onPress={handleRegister}
          buttonStyle={{ backgroundColor: "#6c63ff", borderRadius: 8, width: "100%", paddingVertical: 15 }}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          containerStyle={{ width: "100%", marginBottom: 2 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <StyledText className="text-center text-indigo-500 mt-5 text-sm">
            Already have an account? Log in here
          </StyledText>
        </TouchableOpacity>
      </StyledView>
    </BackgroundImage>
  );
};

export default RegisterScreen;

