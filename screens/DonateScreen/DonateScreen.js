import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const DonationScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    Alert.alert('Thank you!', `You have donated $${amount} to help the pets!`);
    setAmount(''); // Clear the input after donation
  };

  return (
    <ImageBackground
      source={require('../../assets/pngegg.png')} // Background image path
      className="flex-1 justify-center"
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back arrow button */}
        <TouchableOpacity
          style={{ position: 'absolute', top: 50, left: 20, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <View className="bg-black/50 px-5 py-10 justify-center items-center">
          <Text className="text-2xl font-bold text-center mb-4 text-white">
            Donate to Help PawFund
          </Text>
          <Text className="text-base text-center mb-6 text-gray-300">
            Every donation makes a difference!
          </Text>

          <Input
            placeholder="Enter donation amount"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#ddd"
            keyboardType="numeric"
            inputStyle={{ color: '#fff' }}
            leftIcon={
              <Ionicons
                name="cash-outline"
                size={24}
                color="#ddd"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            }
            containerStyle={{ marginBottom: 15 }}
            inputContainerStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
            }}
          />

          <Button
            title="Donate"
            onPress={handleDonate}
            buttonStyle={{
              backgroundColor: '#6c63ff',
              borderRadius: 8,
              width: '100%',
              paddingVertical: 15,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
            containerStyle={{ width: '100%', marginBottom: 10 }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DonationScreen;
