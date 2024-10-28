import React, { useState } from 'react';
import { Text, ImageBackground, ScrollView, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import your custom hook
import { useRegister } from '@/hooks/useAuth';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { registerUser, isLoading } = useRegister(); // Destructure from your hook

  const handleRegister = () => {
    if (
      !username ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !address
    ) {
      return Alert.alert('Error', 'All fields are required.');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match.');
    }

    const payload = {
      username,
      email,
      password,
      address: '123 Main St', // You may want to add an input field for the address
      phoneNumber: phone, // Use phoneNumber instead of phone
    };

    registerUser(payload); // Send the corrected payload
  };

  return (
    <ImageBackground
      source={require('../../assets/pngegg.png')}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-black/50 px-5 py-10 justify-center items-center">
          <Text className="text-2xl font-bold text-center mb-2 text-white">
            Join PawFund!
          </Text>
          <Text className="text-base text-center mb-5 text-gray-300">
            Create an account to adopt and support pets in need
          </Text>

          <Input
            placeholder="User name"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="person-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 2 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="mail-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 2 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />
          <Input
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="location-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 2 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="call-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 2 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 2 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#ddd"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 10 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />

          <Button
            title="Register"
            onPress={handleRegister}
            buttonStyle={{
              backgroundColor: '#6c63ff',
              borderRadius: 8,
              width: '100%',
              paddingVertical: 15,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
            containerStyle={{ width: '100%', marginBottom: 2 }}
            loading={isLoading} // Show loading indicator when registering
          />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-center text-indigo-500 mt-5 text-sm">
              Already have an account? Log in here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterScreen;
