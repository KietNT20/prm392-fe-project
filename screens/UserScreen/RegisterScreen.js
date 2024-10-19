import React, { useState } from 'react';
import { View, Text, ImageBackground, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { useRegister } from 'hooks/useAuth';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerUser, isLoading } = useRegister();

  const handleRegister = () => {
    // Validate inputs
    if (
      !username ||
      !phoneNumber ||
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

    // Prepare payload and trigger registration
    const payload = { username, email, password, address, phoneNumber };
    registerUser(payload); // Call the mutation from the hook
  };

  return (
    <ImageBackground
      source={require('../../assets/pngegg.png')}
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <View className="bg-black/50 px-5 py-10 justify-center items-center">
        <Text className="text-2xl font-bold text-center mb-2 text-white">
          Join PawFund!
        </Text>
        <Text className="text-base text-center mb-5 text-gray-300">
          Create an account to adopt and support pets in need
        </Text>

        <Input
          placeholder="Username"
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
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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
          loading={isLoading}
          buttonStyle={{
            backgroundColor: '#6c63ff',
            borderRadius: 8,
            width: '100%',
            paddingVertical: 15,
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
          containerStyle={{ width: '100%', marginBottom: 2 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-center text-indigo-500 mt-5 text-sm">
            Already have an account? Log in here
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
