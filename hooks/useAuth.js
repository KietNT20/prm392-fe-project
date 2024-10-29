import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { authServices } from "services/authServices";
import storageMethod from "utils/storageMethod";

export const useRegister = () => {
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationFn: (data) => authServices.registerUser(data),
    onSuccess: async (response) => {
      console.log("Registration success:", response);

      // Simulate delay before storing token and navigating
      setTimeout(async () => {
        // Save the token to AsyncStorage
        await storageMethod.set({ token: response.token });
        // Navigate to Home screen or show success message
        Alert.alert("Registration Successful!", "Welcome to PawFund!", [
          { text: "OK", onPress: () => navigation.navigate("Lo") },
        ]);
      }, 500); // Delay for 500ms to ensure backend completes registration
    },
    onError: (error) => {
      console.log("Registration error", error);
      Alert.alert("Registration Failed", error.message || "Please try again.");
    },
  });

  return {
    registerUser: mutation.mutate, // Call this in the Register screen
    isLoading: mutation.isLoading, // For loading states
    ...mutation, // Spread any other properties you might need
  };
};

export const useLogin = () => {
  const navigation = useNavigation();
  const { mutate, ...rest } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ identifier, password }) =>
      authServices.loginUser({ identifier, password }),
    onSuccess: async (response) => {
      try {
        console.log("Login success", response);
        if (response) {
          await storageMethod.set({ token: response.token });
          // Navigate trực tiếp đến DrawerScreens
          navigation.navigate("Drawer");
        }
      } catch (error) {
        console.error("Error handling login:", error);
        Alert.alert(
          "Login Error",
          "There was an error while logging in. Please try again.",
        );
      }
    },
    onError: (error) => {
      console.log("Login error", error);
      Alert.alert(
        "Login Failed",
        error?.message || "Invalid credentials. Please try again.",
      );
    },
  });

  return { mutate, ...rest };
};

export const useLogout = () => {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await storageMethod.remove();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(
        "Logout Error",
        "There was an error while logging out. Please try again.",
      );
    }
  };

  return { logout };
};
